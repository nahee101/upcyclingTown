/* π₯ κ±°λ μλ£ */

import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { firestore } from "../../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// css
import styles from "./CSS/dealCompButton.module.css"

const DealComplete = ({dealState, isCompleted}) => {

    /* μ¬μ©μ μ λ³΄ */
    const { user } = useContext(AuthContext);

    // κ±°λ μλ£ λ²νΌμ΄ λλ Έλμ§ μ λλ Έλμ§
    const [completeAction, setCompleteAction] = useState(isCompleted);

    const navigate = useNavigate();

    /* μ¬μ© ν¨μ */
    async function toggleComplete(e) {
        e.preventDefault();
        const dCompRef = doc(firestore, "dbDeals", dealState.id);

        if (completeAction === false) {
            await updateDoc(dCompRef, {
                completed: arrayUnion(user.uid)
            });
            setCompleteAction(true);
            window.alert('κ±°λκ° μλ£ μ²λ¦¬λμμ΅λλ€')
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
            κ±°λμλ£
        </button>
    );
};

export default DealComplete;