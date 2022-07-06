import { useEffect, useContext, useState } from 'react';

//nav 바의 home
import Nav from '../components/Nav/Nav';
import SubMainBannerHome from '../components/banner/SubMainBannerHome';
import CarouselReview from '../components/banner/CarouselReview';
import CarouselDealList from '../components/banner/CarouselDealList';
import CarouselVideoList from '../components/banner/Video/CarouselVideoList';

import AuthContext from '../components/context/AuthContext';

import { useDispatch, useSelector } from "react-redux";

import { firestore } from '../firebase';
import { collection, onSnapshot, query, where, orderBy, collectionGroup } from "firebase/firestore";

//🍎Home화면에서 회원등급을 redux로 받아오고 저장함

const Home = ( {reviewRepository}) => {
//🍎reudx
const dispatch = useDispatch();

const { user } = useContext(AuthContext);
//🍎user정보
const userId = user.uid;

//🍎review /like
const [myReviews, setMyReviews] = useState([])
const [myComments, setMyComments] = useState([])

//🍎정렬까지 완료된 리뷰들
const [onMyReviews,setOnMyReviews] = useState([])
const [onMyComments, setOnMyComments] = useState([])

const [myDeals, setMyDeals] = useState([]);
const [myDComments, setMyDComments] = useState([]);

// 🍎📃firebase에 저장된 myReview받아오기(내가 작성한 리뷰)
useEffect(()=> {
    const stopSync =  reviewRepository.syncMyReviewsById(reviews => {
        setMyReviews(reviews);
    }, userId)
    return () => stopSync()
},[userId, reviewRepository])

// //🍎받아온 reviews를 value값만 가져오기 - 최신순 정렬
useEffect(()=> {
    let reviewArray = Object.values(myReviews)
    let orderedReview =  reviewArray.slice().sort((a,b) => b.reviewDate.localeCompare(a.reviewDate))
    setOnMyReviews(orderedReview)
},[myReviews,reviewRepository])


//🍎✏️firebase에 저장된 myComments받아오기(내가 작성한 리뷰들)
useEffect(()=> {
    const stopSync =  reviewRepository.syncMyCommentsById(comments => {
        setMyComments(comments);
    },userId)
    return () => stopSync()
},[userId, reviewRepository])

//🍎받아온 Comments를 value값만 가져오기 - 최신순 정렬
useEffect(()=> {
    let reviewArray = Object.values(myComments)
    let orderedReview =  reviewArray.slice().sort((a,b) => b.date.localeCompare(a.date))
    setOnMyComments(orderedReview)
},[myComments])


//🥑 deals /내가 쓴 거
useEffect(() => {
    const mydq = query(
        collection(firestore, "dbDeals"),
        where("creatorId", "==", user.uid),
        orderBy("createdAt", "desc")
    );

    onSnapshot(mydq, (snapshot) => {
        const myDealArray = snapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
        setMyDeals(myDealArray);
    });
}, [user.uid]);

useEffect(() => {
    const mydc = query(
        collectionGroup(firestore, "dComments"),
        where("creatorId", "==", user.uid),
        orderBy("createdAt", "desc")
    );

    onSnapshot(mydc, (snapshot) => {
        const myDealCommentArray = snapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
        setMyDComments(myDealCommentArray);
    });
}, [user.uid]);


//🍎redux로 데이터보내기
useEffect(()=>{
    if(onMyReviews && onMyComments && myDeals && myDComments) {
        const postingAmount = onMyReviews.length + myDeals.length;
        const commentsAmount = onMyComments.length + myDComments.length;
        console.log(postingAmount)
        console.log(commentsAmount)
    }
},[onMyReviews,onMyComments,myDeals,myDComments])

    /* 🥑 07-06 유튜브 api */
    // 나중에 .env로 가릴 거예요
    // 쿠키 문제 수정해야 됨
    const apiKey = 'AIzaSyC-Gui_RdYDt6AkWFJH0gOssXAm6V8iXoo';
    const [videos, setVideos] = useState([]);

    const setCookies = () => {
        document.cookie='crossCookie=bar; SameSite=None; Secure'
    };

    setCookies();

    useEffect(() => {
        console.log('useEffect');

        const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        };

        fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=5&key=${apiKey}`,
        requestOptions,
        )
        .then((response) => response.json()) //반응을 json으로 변환
        .then((result) => {
            setVideos(result.items);
            console.log(result.items);
        })
        .catch((error) => console.log('error', error));
    }, []);

    return (
        <div>
            <Nav/>
            <SubMainBannerHome/>
            <CarouselVideoList videos={videos} />
            <CarouselReview reviewRepository={reviewRepository}/>
            <CarouselDealList />
        </div>
    )
};





export default Home;