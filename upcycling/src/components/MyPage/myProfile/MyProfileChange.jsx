//마이페이지에 프로필 표시 및 설정 컴포넌트
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { firestore ,SignOut } from "../../../firebase";
import { collection, onSnapshot, query, where, orderBy, collectionGroup} from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import "./MyProfileChange.css";
import { useState } from "react";
import { useEffect } from "react";
import Modalimg from '../../modal/modalimg';
import MadalGradeInfo from '../../modal/madalGradeInfo'
import TestProfile from '../../login/TestProfile';

import { useDispatch, useSelector } from "react-redux";
import { getAmounts } from "../../grade/gradeSlice";

const MyProfileChange = ({reviewRepository}) => {
    const { user } = useContext(AuthContext);
    const userId = user.uid
    const [userid, setUserId] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalGradeOpen, setModaGradelOpen] = useState(false);

    const [myGrade, setMyGrade] = useState('')

    const postingAmount = useSelector((state)=>state.grade.postingAmount);
    const commentsAmount = useSelector((state)=>state.grade.commentsAmount);


    const dispatch = useDispatch();

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

    //🍎redux로 데이터보내기
    useEffect(()=>{
        if(onMyReviews && onMyComments && myDeals && myDComments) {
            const postingAmount = onMyReviews.length + myDeals.length;
            const commentsAmount = onMyComments.length + myDComments.length;
            dispatch(getAmounts({userId,postingAmount,commentsAmount}))
        }
    },[onMyReviews,onMyComments,myDeals,myDComments,dispatch,userId])

     //🍎회원등급 
    const userGrade = () => {
        if(postingAmount>=30 && commentsAmount >=30) {
            return '🌳(우수멤버)'
        }else if (postingAmount>=10 && commentsAmount >=10) {
            return '🍎(성실멤버)'
        }else if (postingAmount>=1 && commentsAmount >=1) {
            return '🌻(일반멤버)'
        }else {
            return '🌱(새싹멤버)'
        }
    }

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

    useEffect(()=> {
        setMyGrade(userGrade())
    },[postingAmount,commentsAmount])
    
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const openGradeModal = () => {
        setModaGradelOpen(true);
    };
    const closeGradeModal = () => {
        setModaGradelOpen(false);
    };

    // 🥑 렌더링 시 콜백 함수 실행
    useEffect(() => {
        const q = query(
        collection(firestore, "users"),
        );
        onSnapshot(q, (snapshot) => {
        const userArray = snapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
            setUserId(userArray);
        })
    }, []);
    const navigate = useNavigate();
    const handleLogout = async () => {
        await SignOut();
        alert("로그아웃");
        navigate("/");
    };
    
    return(
        <section className='myPage_container'>
            <div className="profileChange_box">
                <h3 className='mypage_title'>기본정보/수정</h3>
                <div className='mypage_info_container'>
                    <p className="userProfile_photo">{user.photoURL ? <img src={user.photoURL} alt="userphoto"/>  : <img src="../../../images/profile-picture.png" alt="userphoto2"/>}</p>
                    <div className='mypage_info_box'>
                        <p className="userProfile_name"><span>이&nbsp;&nbsp;&nbsp;&nbsp;름 : &nbsp;</span>{user.displayName ? user.displayName : user.reloadUserInfo.screenName ? user.reloadUserInfo.screenName : `${userid.length}번째 손`}님</p> 
                        <p className="userProfile_email"><span>이메일 : &nbsp;</span>{user.email ? user.email : '이메일이 없습니다'}</p>
                    </div>
                </div>
                <div className='mypage_info_buttons'>
                    <div className="userProfile_change" onClick={openModal}>
                        <i className="fa-solid fa-gear" ></i>
                    </div>
                    <button className="userProfile_logout" onClick={handleLogout}>Logout</button>
                </div>
                <Modalimg open={modalOpen} close={closeModal} header="프로필설정">
                    <TestProfile/>
                </Modalimg>
            </div>

            <div className="profileChange_box">
                <h3 className='mypage_title'>멤버등급안내</h3>
                <div className='mypage_grade_container'>
                    <div className='mypage_grade_box'>
                        <p className="userGrade_name"><span>'{user.displayName? user.displayName:'회원'}'</span>님의 업타운 멤버등급은&nbsp;</p> 
                        <p className="userGrade_vlaue"><span>{myGrade}</span>입니다.</p>
                        <div>
                            <p>총 게시글<span>&nbsp;{postingAmount}</span>개 &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;   
                            총 댓글 수 <span>&nbsp;{commentsAmount}</span>개 &nbsp;(삭제된 게시물 포함)</p>
                        </div>
                    </div>
                </div>
                <div className='mypage_grade_buttons'>
                    <div className="userGrade_info" onClick={openGradeModal}>
                        <i className="fa-solid fa-circle-info"></i>
                    </div>
                </div>
                <MadalGradeInfo open={modalGradeOpen} close={closeGradeModal} header="UPTOWN 멤버등급안내">
                    <TestProfile/>
                </MadalGradeInfo>
            </div>
        
        </section>        
    )
}
export default MyProfileChange;