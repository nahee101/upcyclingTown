import {  useNavigate ,Outlet } from "react-router-dom";
import { useState , useEffect} from "react";
import { SignOut } from "../../firebase";
import Hamburger from 'hamburger-react'
import './Nav.css'
import { useSelector } from "react-redux";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Nav = () => {
    const Swal = require('sweetalert2');
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [myGrade, setMyGrade] = useState('')

    const { user } = useContext(AuthContext);
    const postingAmount = useSelector((state)=>state.grade.postingAmount);
    const commentsAmount = useSelector((state)=>state.grade.commentsAmount);

     //πνμλ±κΈ 
     const userGrade = () => {
        if(postingAmount>=30 && commentsAmount >=30) {
            return 'π³(μ°μλ©€λ²)'
        }else if (postingAmount>=10 && commentsAmount >=10) {
            return 'π(μ±μ€λ©€λ²)'
        }else if (postingAmount>=1 && commentsAmount >=1) {
            return 'π»(μΌλ°λ©€λ²)'
        }else {
            return 'π±(μμΉλ©€λ²)'
        }
    }

    useEffect(()=> {
        setMyGrade(userGrade())
    })


    //scroll 30 κΈ°μ€μΌλ‘ trun fasle 
    useEffect(()=>{
        const handleScroll = ()=>{
            if(!scrolled && window.scrollY >30){
                setScrolled(true);
                setOpen(false);
            }else if(scrolled && window.scrollY <=30){
                setScrolled(false);
            }
        };
        window.addEventListener('scroll',handleScroll);
        return()=>{
            window.removeEventListener('scroll', handleScroll);
        };
    },[scrolled]);

    useEffect(()=>{
        const handleScrollham = ()=>{
            if(!scrolled || window.scrollY >30){
                setOpen(false);
            }
        };
        window.addEventListener('scroll',handleScrollham);
        return()=>{
            window.removeEventListener('scroll', handleScrollham);
        };
    },[scrolled]);
// nav hamburger button click
    const clickb = ()=>{
            if(!isOpen){
                setOpen(true);
            }else if(isOpen){
                setOpen(false);
            }
    };
    
    // useNavigateλ₯Ό μ¬μ©νμ¬ μνλ μ£Όμλ‘ μ΄λν μ μλ€.
    const navigate = useNavigate();
    
    //navicateλ₯Ό μ¬μ©νμ¬ mypageλ‘ μ΄λνμΈμ
    const goHome = () => {
        navigate("/home");
    };
    const goContents = () => {
        navigate("/about");
    };
    const goEvent = () => {
        navigate("/event");
    };
    const goReview = () => {
        navigate("/reviews");
    };
    const goDeal = () => {
        navigate("/deals");
    };
    const goMypage = () => {
        navigate("/mypage");
    }
    //λ‘κ·Έμμ ν¨μ ν΄λ¦­μ comfirmμΌλ‘ λ‘κ·Έμμ μ νμ  swalλ‘ alert νμ
    const handleLogout = async () => {
        await SignOut();
        const swalButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        swalButtons.fire({
            icon: 'success',
            title: 'μμ¬μμ..',
            text: 'μ±κ³΅μ μΌλ‘ λ‘κ·Έμμ νμ¨μ΅λλ€',
            footer: '<a href="./signin">LOGIN νλ¬κ°κΈ°</a>'
        })
        navigate("/");
    };
    //λ‘κ·Έμμ ν¨μ ν΄λ¦­μ swalλ‘ comfirm νμ
    const LogoutComfirm = () => {
        const swalButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            swalButtons.fire({
                title: 'λ‘κ·Έμμ νμκ² μ΅λκΉ?',
                text: "λ‘κ·Έμμ νμλ©΄ μ²«νμ΄μ§λ‘ μ΄λ ν©λλ€",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'μ',
                cancelButtonText: 'μλμ',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    handleLogout();
                }
            })
    }
    return (
        <div>
            {/*μ€ν¬λ‘€ css ν΄λμ€λͺ true false λμ */}
            <header className={scrolled ? 'fix-container scrolled' : 'fix-container'}>
                <nav className="navbar">
                    <div className="navbar_logo" onClick={goHome}>
                        <span 
                        className={scrolled ? 'logo_text scrolled' : 'logo_text'}>: UPTOWN</span>
                    </div>
                    {/*hamburger btn ν΄λ¦­μ μ€νλλ λ©λ΄ (ν΄λμ€λͺμΌλ‘)*/}
                    <ul className={isOpen ? 'navbar_menu active' : 'navbar_menu'}>
                        <li onClick={goHome}>Home</li>
                        <li onClick={goContents}>About</li>
                        <li onClick={goEvent}>Event</li>
                        <li onClick={goReview}>Review</li>
                        <li onClick={goDeal}>Market</li>
                    </ul>
                    {/*hamburger btn ν΄λ¦­μ μ€νλλ λ©λ΄ (ν΄λμ€λͺμΌλ‘)*/}
                    <ul className={isOpen ? 'navbar_property active' : 'navbar_property'}>
                        <li  onClick={goMypage}>
                            MyPage
                        </li>
                        <li onClick={LogoutComfirm}>Logout</li>
                    </ul>
                    <div className="Hamburger">{/*λ²νΌ ν΄λ¦­μ navbar on/off*/}
                        <Hamburger toggled={isOpen} toggle={clickb}/>
                    </div>
                    <div className="site_msg_bar">
                        <div className="site_msg"
                        onClick={()=>navigate("/mypage")}>
                        μλνμΈμ! νμ¬ {user.displayName?user.displayName:'νμ'}λμ λ©€λ²λ±κΈμ {myGrade}μλλ€.
                        </div>
                    </div>
                </nav> 
            </header>
            <main>
                <Outlet></Outlet>
            </main>
    </div>
    );
};
export default Nav;