/* 🥑 거래 완료 */

import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { firestore } from "../../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// css
import styles from "./CSS/dealCompButton.module.css"

const DealComplete = ({dealState, isCompleted}) => {

    /* 사용자 정보 */
    const { user } = useContext(AuthContext);

    // 거래 완료 버튼이 눌렸는지 안 눌렸는지
    const [completeAction, setCompleteAction] = useState(isCompleted);

    const navigate = useNavigate();

    /* 사용 함수 */
    async function toggleComplete(e) {
        e.preventDefault();
        const dCompRef = doc(firestore, "dbDeals", dealState.id);

        if (completeAction === false) {
            await updateDoc(dCompRef, {
                completed: arrayUnion(user.uid)
            });
            setCompleteAction(true);
            window.alert('거래가 완료 처리되었습니다')
        } else {
            await updateDoc(dCompRef, {
                completed: arrayRemove(user.uid)
            });
            setCompleteAction(false);
        };

        navigate('/deals')
    };

    return(
        <button 
        onClick={toggleComplete}
        className={completeAction ? styles.icon_container_button_ok : styles.icon_container_button}>
            거래완료
        </button>
    );
};

export default DealComplete;