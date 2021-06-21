import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl
} from 'reactstrap';




export default function Slider({flashcards}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [definition, activateDefinition] = useState(false);

    const showText = (e) => {

    }

    const slides = flashcards.map((item) => {
        return (
          <CarouselItem className="learn__slide"
            onExiting={() => { setAnimating(true); activateDefinition(false); }}
            onExited={() => { setAnimating(false);}}
            key={item.id}
            onClick={()=> activateDefinition(!definition)}
          >
             <div className="learnslide__caption"
            onClick={()=> activateDefinition(!definition)}> <p
            onClick={()=> activateDefinition(!definition)}>{definition ? item.definition : item.term}</p></div>
          </CarouselItem>
        );
      });

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === flashcards.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? flashcards.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
    return (
        <Carousel
            className="learn__carousel"
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            onClick={()=> activateDefinition(!definition)}
            >
            {slides}
            <CarouselControl className="control--left" direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl className="control--right" direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
        );
}
