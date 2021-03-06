import { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CarouselReview.css";
// import required modules
import { Pagination, Navigation } from "swiper";
import { useNavigate } from "react-router-dom";

import { firestore } from "../../firebase";
import { query, collection, orderBy, onSnapshot, limit } from "firebase/firestore";

const CarouselDeal = ( ) => {
    const [setSwiperRef] = useState(null);
    const navigate = useNavigate()

  /* ๐ฅ ํ์ด์ด์คํ ์ด์ ์ ์ฅ๋ผ ์๋ deals ๊ฒ์๊ธ ์ ๋ณด */
    const [deals, setDeals] = useState([]);
    // ๐ฅ ๋ ๋๋ง ์ ์ฝ๋ฐฑ ํจ์ ์คํ
    useEffect(() => {
        // dbDeals ์ฝ๋ ์ ๋ ํผ๋ฐ์ค ๊ฐ์ ธ์ด
        // ์์ฑ ์ผ์ ๋ด๋ฆผ์ฐจ์(์ต๊ทผ ์์)์ผ๋ก ์ ๋ ฌ
        const dq = query(
        collection(firestore, "dbDeals"),
        orderBy("createdAt", "desc"), limit(6)
        );
        // ์์ , ์ญ์  ์ค์๊ฐ ๋ฐ์
        // snapshot -> ๊ฐ๊ฐ์ docs์ ์ ๊ทผํ๊ธฐ ์ํด์ ์ฌ์ฉ
        onSnapshot(dq, (snapshot) => {
        const dealArray = snapshot.docs.map(doc => ({
        // ๊ฐ๊ฐ์ ๊ฐ์ฒด์ ๊ณ ์  id๋ฅผ ๋ง๋ค์ด ํ ๋น
            id: doc.id, ...doc.data()
        }));
        // ๊ฑฐ๋๊ธ ๊ฐ์ฒด ๋ฆฌ์คํธ๋ฅผ setDeals์ ํ ๋น
            setDeals(dealArray);
        })
    }, []);

    return (
        <section>
            <div className="contents_swiper">
                <h2 className="Carousel_text">์ ๊ท ๋ง์ผ</h2>
                <div className="contents_swiper">
                <Swiper
                    onSwiper={setSwiperRef}
                    centeredSlides={false}
                    pagination={{
                    type: "fraction",
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        1000: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1500: {
                            slidesPerView: 5,
                            spaceBetween: 40,
                        },
                    }}
                    navigation={true}
                    modules={[ Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        deals.map(deal => {
                            return <SwiperSlide key={deal.id}>
                                <section className='home_review_container'>
                                    <img className='home_review_reviewImg' src={deal.attachmentUrl} alt="review"
                                        onClick={()=>{
                                            navigate(`/deals/${deal.createdAt}`, {state : {deal}})
                                        }}
                                    />
                                    <h3 className='home_review_title'>{deal.title}</h3>
                                    <p className='home_review_name'>{deal.creatorName}</p>
                                    <div className='home_review_likeBox'>
                                        <div className='home_review_icon'>
                                            <i className="fa-solid fa-heart"></i>
                                        </div>
                                        <p className='home_review_amount'>{deal.likeCount}</p>
                                    </div>
                                </section>
                            </SwiperSlide>
                        })
                    }
                </Swiper>
                </div>

                
        </div>

        </section>
    );
}

export default CarouselDeal;
