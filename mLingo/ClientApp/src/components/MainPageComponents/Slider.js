import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import img1 from "../../img/slid1.png";
import img2 from "../../img/l_people.jpg";
import SignInModal from "./SignInModal";

const items = [
  {
    src: img2,
    altText: "You create us!",
    caption: "Everything in this app is made by community! Thank you!"
  },
  {
    src: img1,
    altText: "Join mLingo community and help us develop world! ",
    caption: "You create mLingo!"
  },
  {
    src: img2,
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
        key={item.altText}
      >
        <img src={item.src} alt={item.altText} />
        <div className="d-block d-lg-none carousel-sign-in">
          <SignInModal />
        </div>
        <CarouselCaption
          captionText={item.altText}
          captionHeader={item.caption}
          className="d-block"
        />
      </CarouselItem>
    );
  });

  return (
    <div>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        className="col-12 slider-carousel slider"
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
