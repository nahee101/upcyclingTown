/* ๐ฅ market ๊ฒ์๊ธ ์์ฑ */

import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { firestore, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid"; // ์ฌ์ง ๋๋ค ์์ด๋
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

// css
import styles from "./CSS/dealWrite.module.css";

// ์ฌ์ฉ ์ปดํฌ๋ํธ
import Nav from "../Nav/Nav";
import SubMainBannerDeal from "../banner/SubMainBannerDeal";

const DealWrite = () => {

    /* ์ฌ์ฉ์ ์ ๋ณด */
    const { user } = useContext(AuthContext);

    /* ์์ฑํ ์ ๋ชฉ, ๊ฐ๊ฒฉ, ๋ด์ฉ firestore์ ์ ์ฅ */
    const [dTitle, setDTitle] = useState(''); // ์ ๋ชฉ
    const [dHashtag1, setDHashtag1] = useState(''); // ํด์ํ๊ทธ
    const [dHashtag2, setDHashtag2] = useState(''); // ํด์ํ๊ทธ
    const [dHashtag3, setDHashtag3] = useState(''); // ํด์ํ๊ทธ
    const [dPrice, setDPrice] = useState(''); // ๊ฐ๊ฒฉ
    const [dContent, setDContent] = useState(''); // ๋ด์ฉ
    
    /* ์ฌ์ง์ storage */
    const [attachment, setAttachment] = useState('');
    const [inputButton, setInputButton] = useState(false)
    const [fileName, setFileName] = useState('');
    const navigate = useNavigate();

    /* ์ฌ์ฉ ํจ์ */
    const onChange = (e) => {
        const {target: {name, value}} = e;
        
        if(name === 'title') {
            setDTitle(value);
        } else if(name === 'hashtag1') {
            setDHashtag1(value);
        } else if(name === 'hashtag2') {
            setDHashtag2(value);
        }else if(name === 'hashtag3') {
            setDHashtag3(value);
        }else if(name === 'price') {
            setDPrice(value);
        } else if(name === 'content') {
            setDContent(value);
        };
    };

    const onFileChange = (e) => {
        e.preventDefault();

        setInputButton(true);
        const {target: {files}} = e;
        const theFile = files[0];
        // ํ์ผ ์ด๋ฆ ์ฝ๊ธฐ
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile); // ๋ฐ์ดํฐ ์ธ์ฝ๋ฉ
        setInputButton(false);
        setFileName(theFile.name);
    };

    const onButtonClick = (e) => {
        e.preventDefault();
        let dealIMG = document.getElementById('dealIMG');
        dealIMG.click();
    };

    // submit
    const onSubmit = async (e) => {
        e.preventDefault();
    
        let attachmentUrl = '';
        if (attachment !== '') {
            // ์ฐธ์กฐ ๊ฒฝ๋ก ์์ฑ
            const attachmentRef = ref(storage, `images/${user.uid}/${uuidv4()}`); // ์ฌ์ฉ์ ์์ด๋ ๋ค์ด์ค๋ฉด ์ค๊ฐ์ ๋ฃ์ ๊ฑฐ
            // ์ฐธ์กฐ ๊ฒฝ๋ก๋ก ํ์ผ ์๋ก๋
            // uploadiString ์จ์ผ์ง ๋๋ฐ๋ก ๋ค์ด๊ฐ
            const response = await uploadString(attachmentRef, attachment, "data_url");
            console.log(response);
            attachmentUrl = await getDownloadURL(response.ref);    
        };
    
        let date = new Date();
        // submitํ๋ฉด ์ถ๊ฐํ  ๋ฐ์ดํฐ
        const dealObj = {
            title: dTitle, // ์ ๋ชฉ 
            hashtagArray: [dHashtag1, dHashtag2, dHashtag3],
            price: dPrice, // ๊ฐ๊ฒฉ
            content: dContent, // ๋ด์ฉ
            createdAt: Date.now(), // ์์ฑ๋ ์ง
            date : format(date, "yyyy.MM.dd HH:mm"),
            creatorId: user.uid,
            creatorName: user.displayName,
            creatorPhoto: user.photoURL,
            attachmentUrl: attachmentUrl,
            // 06-21 ์ข์์
            likeCount: 0,
            likeUser: [],
            // 07-04 ๊ฑฐ๋์๋ฃ
            completed: []
        };
    
        await addDoc(collection(firestore, "dbDeals"), dealObj);
    
        // state๋ฅผ ๋น์์ form ๋น์ฐ๊ธฐ
        setDTitle("");
        setDHashtag1("");
        setDHashtag2("");
        setDHashtag3("");
        setDPrice("");
        setDContent("");
    
        // state๋ฅผ ๋น์์ ํ์ผ ๋ฏธ๋ฆฌ๋ณด๊ธฐ img src ๋น์ฐ๊ธฐ
        setAttachment("");
    
        navigate('/deals', {dealObj})
    }; // ํ์ด์ด๋ฒ ์ด์ค ์ ์ฅ ์
    

    const onClick = () => {
        navigate('/deals')
    }

    return (
        <>
            <Nav />
            <SubMainBannerDeal />
            <div className={styles.dealWrite}>
                <div className={styles.titleBox}>
                    <h2>๋ง์ผ ๊ธ์ฐ๊ธฐ</h2>
                </div>
                <form
                onSubmit={onSubmit}
                className={styles.form}>
                    {/* ์ ๋ชฉ ์์ฑ */}
                    <input
                    name="title"
                    onChange={onChange}
                    value={dTitle}
                    type="text" 
                    placeholder="์ ๋ชฉ์ ์๋ ฅํด ์ฃผ์ธ์"
                    className={styles.input_title} /> <br />

                    {/* ๊ฐ๊ฒฉ ์์ฑ */}
                    <input
                    name="price"
                    onChange={onChange}
                    value={dPrice}
                    type="number"
                    placeholder="๊ฐ๊ฒฉ์ ์๋ ฅํด ์ฃผ์ธ์"
                    className={styles.input_price} /> <br />

                    {/* ํ์ผ ์๋ก๋ - ์ ๋ณด์ */}            
                    <input 
                    onChange={onFileChange}
                    id="dealIMG"
                    type="file" 
                    accept="image/*"
                    className={styles.fileInput} />
                    
                    {/* ๊ธ ์์ฑ */}
                    <textarea
                    name="content"
                    onChange={onChange}
                    value={dContent}
                    className={styles.textarea} /> <br />

                    <div className={styles.last_container}>
                        <div className={styles.inner}>
                            <div className={styles.input_container}>
                                {/* ์๋ก๋ํ  ์ฌ์ง ๋ฏธ๋ฆฌ ๋ณด๊ธฐ */}
                                {attachment != '' ? (
                                    <div>
                                        <img 
                                        src={attachment} 
                                        alt="์๋ก๋ํ ์ด๋ฏธ์ง"
                                        className={styles.fileInput_img} />
                                    </div>
                                ) : (
                                    <div className={styles.before_uploadedImg}>
                                        <p>์ด๋ฏธ์ง๋ฅผ <br />์ฒจ๋ถํด ์ฃผ์ธ์</p>
                                    </div>
                                )}

                                <button 
                                    className={styles.input_button}
                                    onClick={onButtonClick}>
                                    {fileName || <div><i className="fa-solid fa-image"></i> <span>์ด๋ฏธ์ง ์ฒจ๋ถ</span></div>}
                                </button>
                            </div>

                            <div className={styles.hash_container}>
                                <p>#ํ๊ทธ๋ฅผ ์๋ ฅํด ์ฃผ์ธ์ (์ต๋ 3๊ฐ)</p>
                                {/* ํด์ํ๊ทธ1 ์์ฑ */}
                                <input
                                name="hashtag1"
                                onChange={onChange}
                                value={dHashtag1}
                                type="text" 
                                placeholder="ํด์ํ๊ทธ 1"
                                className={styles.hashtags} /> <br />
                                
                                {/* ํด์ํ๊ทธ2 ์์ฑ */}
                                <input
                                name="hashtag2"
                                onChange={onChange}
                                value={dHashtag2}
                                type="text" 
                                placeholder="ํด์ํ๊ทธ 2"
                                className={styles.hashtags} /> <br />

                                {/* ํด์ํ๊ทธ3 ์์ฑ */}
                                <input
                                name="hashtag3"
                                onChange={onChange}
                                value={dHashtag3}
                                type="text" 
                                placeholder="ํด์ํ๊ทธ 3"
                                className={styles.hashtags} /> <br />
                            </div>
                        </div>
                    </div>
                    <div className={styles.submit_buttons}>
                        <button
                        onClick={onClick}
                        className={styles.button}>
                            ์ทจ์
                        </button>
                        {/* ๊ฒ์๊ธ ์๋ก๋ */}
                        <input 
                        type="submit" 
                        value="์๋ฃ"
                        className={styles.button_ok} />
                    </div>
                </form>
            </div>
        </>
    );
};

export default DealWrite;