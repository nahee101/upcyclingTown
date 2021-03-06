import { useState } from "react";
import { useNavigate } from "react-router-dom";

import VideoItem from "./VideoItem";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";


const CarouselVideoList = ({videos}) => {
    const [setSwiperRef] = useState(null);
    const navigate = useNavigate()

    return (
        <section style={{'marginBottom': '4rem'}}>
        <div className="contents_swiper">
            <h2 className="Carousel_text">지구를 지키는 아이디어</h2>
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
                    },
                    1000: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1500: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                navigation={true}
                modules={[ Navigation]}
                className="mySwiper"
            >
                {
                    videos&& videos.map(video => {
                        return <SwiperSlide key={video.id}>
                            <VideoItem video={video}/>
                        </SwiperSlide>
                    })
                }
            </Swiper>
            </div>

            
    </div>

    </section>

    );
};

export default CarouselVideoList;