"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import CarouselOne from "@/assets/img/crs1.png";
import CarouselTwo from "@/assets/img/crs2.png";
import CarouselThree from "@/assets/img/crs3.png";
export default function ReactCarousel() {
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
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
      <Slider {...settings}>
        <Image
          className="w-full"
          src={CarouselOne}
          alt={`Slide Carosel`}
          width={500}
          height={300}
        />
        <Image
          className="w-full"
          src={CarouselOne}
          alt={`Slide Carosel`}
          width={500}
          height={300}
        />
        <Image
          className="w-full"
          src={CarouselTwo}
          alt={`Slide Carosel`}
          width={500}
          height={300}
        />
        <Image
          className="w-full"
          src={CarouselThree}
          alt={`Slide Carosel`}
          width={500}
          height={300}
        />
      </Slider>
    </div>
  );
}
