import styles from './SubMainBannerMypage.module.css';

const SubMainBannerMypage = () => {
    return (
        <div className={styles.container}>
        <div>
            <div className={styles.text}>
                <h3> <span className={styles.span}>:UpTowner </span>Mypage</h3>
                <p> : 업타운에서<br/>
                여러분의 이야기를 들려주세요!</p>
            </div>
        </div>
        <div className={styles.img}>
        </div>
    </div>
    )
};

export default SubMainBannerMypage;