import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import VideoSlickModal1 from "../Video/VideoSlickModal1";
import VideoSlickModal2 from "../Video/VideoSlickModal2";
import VideoSlickModal3 from "../Video/VideoSlickModal3";
import VideoSlickModal4 from "../Video/VideoSlickModal4";
import Image from "next/image";

type Props = {};

export default function SlickCarousel({}: Props) {
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          borderRadius: "50%",
          color: "#fff",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-4">
      <div className="container padding-0">
        <Slider {...settings}>
          <div className="css-video">
            <div className="modal-1 col-lg-12">
              <VideoSlickModal1 />
              <div className="text-block">
                <div
                  className="d-flex align-items-center"
                  style={{ paddingBottom: 16 }}
                >
                  <h5>Kay Kim, Co-Founder</h5>
                  <span className="testimonial-logo">
                    <Image
                      className="img-rooted"
                      alt="Company logo"
                      src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/rooted-logo-x2.321d79d.png"
                      width={120}
                      height={50}
                      loading="lazy"
                    />
                  </span>
                </div>
                <div className="quote-modal">
                  <i>
                    "It's extremely exciting that Fiverr has freelancers from
                    all over the world — it broadens the talent pool. One of the
                    best things about Fiverr is that while we're sleeping,
                    someone's working."
                  </i>
                </div>
              </div>
            </div>
          </div>
          {/* Repeat for other modals */}
          <div className="css-video">
            <div className="modal-1 col-lg-12">
              <VideoSlickModal2 />
              <div className="text-block">
                <div
                  className="d-flex align-items-center"
                  style={{ paddingBottom: 16 }}
                >
                  <h5>Caitlin Tormey, Chief Commercial Officer</h5>
                  <span className="testimonial-logo">
                    <Image
                      className="img-rooted"
                      alt="Company logo"
                      src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/naadam-logo-x2.0a3b198.png"
                      width={120}
                      height={50}
                      loading="lazy"
                    />
                  </span>
                </div>
                <div className="quote-modal">
                  <i>
                    "We've used Fiverr for Shopify web development, graphic
                    design, and backend web development. Working with Fiverr
                    makes my job a little easier every day."
                  </i>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
