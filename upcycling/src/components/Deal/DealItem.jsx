/* 🥑 market 개별 게시글 */

import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// css
import styles from './CSS/dealItem.module.css';

// 사용 컴포넌트
import NewItem from "./NewItem";

const DealItem = ({deal}) => {
    /* 사용자 정보 */
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // price 천 단위로 표현
    let dealPrice = Number(deal.price).toLocaleString('ko-KR');
    
    /* 사용 함수 */
    // dealDetail로 이동
    const onClick = () => {
        navigate(`/deals/${deal.createdAt}`, {state: {deal}})
    };

    /* 아이콘 */
    const today = Date.now();
    const writeTime = deal.createdAt;
    const elapsed = (today-writeTime)/(100*60);
    console.log(elapsed)

    return (
        <section className={styles.container}>
            {/* 30분 기준으로 새 글 보이기 */}
            {elapsed < 300 ? <NewItem /> : <></> }
            <img
            src={deal.attachmentUrl}
            onClick={onClick}
            className={styles.dealImg} />
            <h3>{deal.title}</h3>
            {
                deal.completed.length == 1 ? (
                    <h3 className={styles.price}>거래완료</h3>
                ) : (
                    deal.price == '' && deal.completed.length == 0 ? (
                        <h3 className={styles.price}>나눔💚</h3>
                        ) : (
                            <h3 className={styles.price}>&#8361; {dealPrice}</h3>
                        )
                )
            }

            <p className={styles.name}>{deal.creatorName}</p>
            <div className={styles.hashtags}>
                <span>#{deal.hashtagArray[0] && deal.hashtagArray[0]}</span>
                <span>#{deal.hashtagArray[1] && deal.hashtagArray[1]}</span>
                <span>#{deal.hashtagArray[2] && deal.hashtagArray[2]}</span>
            </div>
            <div className={styles.likeBox}>
                <div className={styles.icon}>
                    <i className="fa-solid fa-heart"></i>
                </div>
                <p className={styles.amount}>{deal.likeCount}</p>
            </div>
        </section>
    );
};

export default DealItem;