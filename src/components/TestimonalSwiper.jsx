import { useRef } from "react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/css/navigation";

const TestimonialSwiper = ({ testimonials }) => {
  const swiperRef = useRef(null);

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  const getFeaturedImage = (testimonial) => {
    return (
      testimonial?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "https://via.placeholder.com/150"
    );
  };

  return (
    <div
      className="testimonial-swiper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Swiper Navigation Buttons */}
      <button className="secondary-button swiper-button-prev"></button>
      <button className="secondary-button swiper-button-next"></button>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
      >
        {/* Conditional Rendering of Slides */}
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
  <div className="testimonial-slide">
    <img
      src={getFeaturedImage(testimonial)}
      alt={testimonial.title.rendered}
      className="testimonial-image"
    />
    <h4 className="testimonial-author">
      {testimonial.title.rendered}
    </h4>
    <p
      dangerouslySetInnerHTML={{
        __html: testimonial.content.rendered,
      }}
      className="testimonial-content"
    />
  </div>
</SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="testimonial-slide">
              <p>No testimonials available.</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default TestimonialSwiper;
