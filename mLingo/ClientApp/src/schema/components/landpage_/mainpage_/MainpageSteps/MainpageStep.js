import React from 'react';

const MainpageStep = ( {props}) => {


    return(
        <div className="step__element" key={props.title}>
            <img className="step__img" src={props.img}  data-aos="flip-left"  data-aos-delay="200" data-aos-duration="1000"/>
            <div className="step__details">
                <div className="step__title">{props.title}</div>
                <div className="step__description">{props.desc}</div>
            </div>
        </div>
    )
}

export default MainpageStep;