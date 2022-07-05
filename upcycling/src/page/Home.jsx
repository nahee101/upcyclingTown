//nav 바의 home
import Nav from '../components/Nav/Nav';
import SubMainBannerHome from '../components/banner/SubMainBannerHome';
import CarouselReview from '../components/banner/CarouselReview';
import CarouselDealList from '../components/banner/CarouselDealList';
import { useEffect } from 'react';

//🍎Home화면에서 

const Home = ( {reviewRepository}) => {


    //     //🍎review /like
    //     const [myReviews, setMyReviews] = useState([])
    //     const [myComments, setMyComments] = useState([])
    
    //     //🍎정렬까지 완료된 리뷰들
    //     const [onMyReviews,setOnMyReviews] = useState([])
    //     const [onMyComments, setOnMyComments] = useState([])

    // // 🍎📃firebase에 저장된 myReview받아오기(내가 작성한 리뷰)
    // useEffect(()=> {
    //     const stopSync =  reviewRepository.syncMyReviewsById(reviews => {
    //         setMyReviews(reviews);
    //     }, userId)
    //     return () => stopSync()
    // },[userId, reviewRepository])

    // // //🍎받아온 reviews를 value값만 가져오기 - 최신순 정렬
    // useEffect(()=> {
    //     let reviewArray = Object.values(myReviews)
    //     let orderedReview =  reviewArray.slice().sort((a,b) => b.reviewDate.localeCompare(a.reviewDate))
    //     setOnMyReviews(orderedReview)
    // },[myReviews,reviewRepository])


    //     //🍎✏️firebase에 저장된 myComments받아오기(내가 작성한 리뷰들)
    //     useEffect(()=> {
    //         const stopSync =  reviewRepository.syncMyCommentsById(comments => {
    //             setMyComments(comments);
    //         },userId)
    //         return () => stopSync()
    //     },[userId, reviewRepository])
    
    //     //🍎받아온 Comments를 value값만 가져오기 - 최신순 정렬
    //     useEffect(()=> {
    //         let reviewArray = Object.values(myComments)
    //         let orderedReview =  reviewArray.slice().sort((a,b) => b.date.localeCompare(a.date))
    //         setOnMyComments(orderedReview)
    //     },[myComments])

    return (
        <div>
            <Nav/>
            <SubMainBannerHome/>
            <CarouselReview reviewRepository={reviewRepository}/>
            <CarouselDealList />
        </div>
    )
};

export default Home;