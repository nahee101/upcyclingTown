import React, { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CSS/reviewWrite.module.css'

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import { format } from "date-fns";
import Nav from '../Nav/Nav';
import SubMainBannerReviews from '../banner/SubMainBannerReviews';

//ð Reviewë¥¼ ìì±íë íì´ì§

const ReviewWrite = ({createAndUpdateReview , imageUploader}) => {
    const formRef = useRef();
    const reviewTitleRef = useRef();
    const reviewDescriptionRef = useRef();
    const reviewIMGRef = useRef();

    const reviewHashtagsRef1 = useRef();
    const reviewHashtagsRef2 = useRef();
    const reviewHashtagsRef3 = useRef();
    
    const { user } = useContext(AuthContext);
    const userId = user.uid
    const userName = user.displayName;
    const userEmail = user.email;
    const userPhoto = user.photoURL

    const navigate = useNavigate();

    const [uploadedIMG, setUploadedIMG] = useState()
    const [inputButton, setInputButton] = useState(false)

    const [name , setName] = useState('')

   


    let date = new Date();

    const onSubmit = event => {
        event.preventDefault();

        const review = {
            id  : 'R' + Date.now(),
            nickname : user.displayName? userName: 'None',
            email : userEmail,
            profileIMG : userPhoto? userPhoto : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png',
            userId : userId,
            reviewIMG : uploadedIMG,
            reviewTitle : reviewTitleRef.current.value,
            reviewDescription : reviewDescriptionRef.current.value,
            reviewHashtags : [reviewHashtagsRef1.current.value,reviewHashtagsRef2.current.value,reviewHashtagsRef3.current.value,],
            reviewDate :  format(date, "yyyy.MM.dd HH:mm"),
            /* ð¥ N ìì´ì½ ì© */
            createdAt: Date.now()
        }; 
        formRef.current.reset();
        createAndUpdateReview(review, userId)
        navigate('/reviews');
    }

    const onChange = async (event) => {
        event.preventDefault();
        // console.log(event.target.files[0]);
        setInputButton(true)
        const uploaded = await imageUploader.upload(event.target.files[0]);
        setUploadedIMG(uploaded.url)
        setName(uploaded.original_filename)
        setInputButton(false)
    }

    //ðë²í¼ì í´ë¦­íë©´ íì¼ì¸íì´ í´ë¦­ëê² ì²ë¼ ë³´ì´ê¸°
    const onButtonClick = (event) =>{
        event.preventDefault();
        reviewIMGRef.current.click();
    };

    //ð
    const goReviewPage = () => {
        navigate('/reviews')
    }

    //â­ê¸ì°ê¸° í­ëª©ì´ ë¤ ìì ëë§ ë²í¼ì´ íì±í ë  ììëë¡
    const canSave = Boolean(reviewTitleRef)  && Boolean(reviewDescriptionRef) && Boolean(uploadedIMG)
    return (
        <>
        <Nav/>
        <SubMainBannerReviews/>
        
            <div className={styles.reviewWrite}>
            <div className={styles.titleBox}>
                <h2>ë¦¬ë·° ê¸ì°ê¸°</h2>
            </div>
                <form className={styles.form} ref={formRef}>
                    <input className={styles.input_title} ref={reviewTitleRef} id='reviewTitle' name='reviewTitle' type="text" placeholder='ì ëª©ì ìë ¥í´ ì£¼ì¸ì' />
                
                {/* íë©´ììì ìë³´ì */}
                    <input 
                        className={styles.fileInput}
                        ref={reviewIMGRef}
                        type="file"
                        accept='image/*'
                        name='reviewIMG'
                        onChange={onChange}
                    />
                <textarea 
                    className={styles.textarea}
                    ref={reviewDescriptionRef} 
                    placeholder='ë´ì©ì ìë ¥íì¸ì.'
                    >
                </textarea>

                    { inputButton &&
                        (<div className={styles.modal_container}>
                            <div className={styles.dialog__inner}>
                                <div className={styles.dialog__content}>
                                <h2>ì´ë¯¸ì§ë¥¼ ìë¡ë© ì¤ ìëë¤.</h2>
                                <p>ì ìë§ ê¸°ë¤ë ¤ì£¼ì¸ì.</p>
                                <p>ìëì¼ë¡ ë«íëë¤</p>
                                <div className={styles.loading}></div>
                                </div>  
                            </div>
                        </div>)
                    }
                    

                    <div className={styles.last_container}>
                        <div className={styles.inner}>
                            <div className={styles.input_container}>
                                {uploadedIMG? (<img src={uploadedIMG} alt='ì´ë¯¸ì§' className={styles.fileInput_img} />) : (
                                    <div className={styles.before_uploadedImg}>
                                        <p>ì´ë¯¸ì§ë¥¼ <br/>ì²¨ë¶í´ì£¼ì¸ì</p>
                                    </div>
                                )}
                                <button 
                                    className={styles.input_button}
                                    onClick={onButtonClick}
                                >
                                {name || <div><i className="fa-solid fa-image"></i> <span>ì´ë¯¸ì§ ì²¨ë¶</span></div>}
                                </button>
                            </div>

                            <div className={styles.hash_container}>
                                <p>#íê·¸ë¥¼ ìë ¥í´ì£¼ì¸ì (ìµë 3ê°)</p>
                                <div className={styles.hashtags_box}>
                                    <input className={styles.hashtags} ref={reviewHashtagsRef1} name='reviewHashtags' type="text" placeholder='í´ìíê·¸ 1' />
                                    <input className={styles.hashtags} ref={reviewHashtagsRef2} name='reviewHashtags' type="text" placeholder='í´ìíê·¸ 2' />
                                    <input className={styles.hashtags} ref={reviewHashtagsRef3} name='reviewHashtags' type="text" placeholder='í´ìíê·¸ 3' />
                                </div>
                            </div>

                        </div>
                        <div className={styles.submit_buttons}>
                            <button 
                                onClick={()=>goReviewPage()}
                                className={styles.button}
                            >ì·¨ì
                            </button>
                            <button 
                                className={styles.button_ok}
                                onClick={onSubmit}
                                disabled={!canSave}
                            >ìë£
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ReviewWrite;