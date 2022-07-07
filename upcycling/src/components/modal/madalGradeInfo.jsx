//모달창
import React from 'react';
import './madalGradeInfo.css';

const ModalGradeInfo = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;
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
                <div className='gradeInfo_container'>
                    <h1>:UPTOWN의 멤버등급은 조건을 만족하면 신청없이 등업이 됩니다.</h1>
                    <div className="greadeInfo_innerContainer">
                        <div className='gradeInfo_title'>
                                :UPTOWN의 멤버등급을 확인하세요!
                        </div>
                        <div className='gradeInfo_contents_container'>
                            <div className="gradeInfo_contents_box">
                                <span className="gradeInfo_contents_box_title">🌱(새싹멤버)</span>
                                <span className="gradeInfo_contents_box_details">가입 후 막 활동을 시작하는 멤버</span>
                            </div>
                            <div className="gradeInfo_contents_box">
                                <span className="gradeInfo_contents_box_title">🌻(일반멤버)</span>
                                <span className="gradeInfo_contents_box_details">게시글 수 1개, 댓글 수 1개 만족 시 자동등업</span>
                            </div>
                            <div className="gradeInfo_contents_box">
                                <span className="gradeInfo_contents_box_title">🍎(성실멤버)</span>
                                <span>게시글 수 10개, 댓글 수 10개 만족 시 자동등업</span>
                            </div>
                            <div className="gradeInfo_contents_box">
                                <span className="gradeInfo_contents_box_title">🌳(우수멤버)</span>
                                <span>게시글 수 30개, 댓글 수 30개 만족 시 자동등업</span>
                            </div>
                            <div className='gradeInfo_footer'>
                                업타운 멤버만의 다양한 혜택을 누려보세요!(추후 업데이트 예정)
                            </div>
                        </div>
                    </div>
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