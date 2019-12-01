import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import img1 from "../img/books.png";
import img2 from "../img/speak.png";
import img3 from "../img/edit.png";
import "./Slider.css";

const items = [
  {
    src: img1,
    src2: img2,
    src3: img3,
    altText: "You create us!",
    caption: "Everything in this app is made by community! Thank you!"
  },
  {
    src: img3,
    src2: img1,
    src3: img2,
    altText: "Join mLingo community and help us develop world! ",
    caption: "You create mLingo!"
  },
  {
    src: img2,
    src2: img3,
    src3: img1,
    altText: "Explore new communities!",
    caption: "Join us and create mLingo by your own idea!"
  }
];

const Slider = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} className="col-4" />
        <img src={item.src2} alt={item.altText} className="col-4" />
        <img src={item.src3} alt={item.altText} className="col-4" />
        <CarouselCaption
          captionText={item.altText}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <div className="slider">
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        className="offset-1 col-10 slider-carousel"
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};

export default Slider;
