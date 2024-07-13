import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const CarouselHome = () => {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      dynamicHeight={true}
      showThumbs={false}
    >
      <div className="h-[400px] flex items-center justify-center">
        <img
          src="https://i.ibb.co/qWFkvjV/CSEDU.jpg"
          alt="CSEDU"
          className="max-h-full"
        />
      </div>
      <div className="h-[400px] flex items-center justify-center">
        <img
          src="/Img/curzon.jpeg"
          alt="Keyboard"
          className="max-h-full"
        />
      </div>
      <div className="h-[400px] flex items-center justify-center">
        <img
          src="https://ssl.du.ac.bd/fontView/images/slider/1710156332ProVC.jpg"
          alt="Cat"
          className="max-h-full"
        />
      </div>
    </Carousel>
  );
};

export default CarouselHome;
