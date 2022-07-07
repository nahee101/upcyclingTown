//모달창
import React from 'react';
import './madalGradeInfo.css';

const ModalGradeInfo = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;
    console.log(props)
    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modalimg' : 'modalimg'}>
        {open ? (
            <section>
            <header>
                {header}
                <button className="close" onClick={close}>
                &times;
                </button>
            </header>
            <main>
                <div>
                    <h1>:UPTOWN의 회원등급은 다음 조건을 충족시 자동으로 등업됩니다.</h1>
                </div>
            </main>
            <footer>
                <button className="close" onClick={close}>
                close
                </button>
            </footer>
            </section>
        ) : null}
        </div>
    );
};

export default ModalGradeInfo;