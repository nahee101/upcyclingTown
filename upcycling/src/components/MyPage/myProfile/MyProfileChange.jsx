//마이페이지에 프로필 표시 및 설정 컴포넌트
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { firestore ,SignOut } from "../../../firebase";
import { collection, onSnapshot, query} from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import "./MyProfileChange.css";
import { useState } from "react";
import { useEffect } from "react";
import Modalimg from '../../modal/modalimg';
import MadalGradeInfo from '../../modal/madalGradeInfo'
import TestProfile from '../../login/TestProfile';

import { useSelector } from "react-redux";


const MyProfileChange = () => {
    const { user } = useContext(AuthContext);
    const [userid, setUserId] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalGradeOpen, setModaGradelOpen] = useState(false);

    const [myGrade, setMyGrade] = useState('')

    const postingAmount = useSelector((state)=>state.grade.postingAmount);
    const commentsAmount = useSelector((state)=>state.grade.commentsAmount);

     //🍎회원등급 
     const userGrade = () => {
        if(postingAmount>=30 && commentsAmount >=30) {
            return '🌳(Level.4)'
        }else if (postingAmount>=10 && commentsAmount >=10) {
            return '🍎(Level.3)'
        }else if (postingAmount>=1 && commentsAmount >=1) {
            return '🌻(Level.2)'
        }else {
            return '🌱(Level.1)'
        }
    }

    useEffect(()=> {
        setMyGrade(userGrade())
    })
    
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
                <h3 className='mypage_title'>회원등급안내</h3>
                <div className='mypage_grade_container'>
                    <div className='mypage_grade_box'>
                        <p className="userGrade_name"><span>'{user.displayName&& user.displayName}'</span>님의 업타운 회원등급은&nbsp;</p> 
                        <p className="userGrade_vlaue"><span>{myGrade}</span>입니다.</p>
                        <div>
                            <p>총 게시글<span>&nbsp;0</span>개 &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;   댓글 수 <span>&nbsp;0</span>개</p>
                        </div>
                    </div>
                </div>
                <div className='mypage_grade_buttons'>
                    <div className="userGrade_info" onClick={openGradeModal}>
                        <i className="fa-solid fa-circle-info"></i>
                    </div>
                </div>
                <MadalGradeInfo open={modalGradeOpen} close={closeGradeModal} header="UPTOWN등급안내">
                    <TestProfile/>
                </MadalGradeInfo>
            </div>
        
        </section>        
    )
}
export default MyProfileChange;