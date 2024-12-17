import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import ImageOne from "../../assets/img/1.png";
type Props = {};

function Slider({}: Props) {
  return (
    <Carousel slide={false} controls={false} indicators={false}>
      <Carousel.Item interval={5000}>
        <Image
          className="d-block w-100 object-fit"
          src={ImageOne}
          alt="First slide"
          width={1920}
          height={1080}
        />
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <Image
          className="d-block w-100 object-fit"
          src={ImageOne}
          alt="Second slide"
          width={1920}
          height={1080}
        />
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <Image
          className="d-block w-100 object-fit"
          src={ImageOne}
          alt="Third slide"
          width={1920}
          height={1080}
        />
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <Image
          className="d-block w-100 object-fit"
          src={ImageOne}
          alt="Fourth slide"
          width={1920}
          height={1080}
        />
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <Image
          className="d-block w-100 object-fit"
          src={ImageOne}
          alt="Fifth slide"
          width={1920}
          height={1080}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
