import React from 'react';

const MainpageStep = ( {props}) => {


    return(
        <div className="step__element Step" key={props.title}>
            <img className="step__img" src={props.img}  data-aos="flip-left"  data-aos-delay="200" data-aos-duration="1000"/>
            <div className="step__details">
                <div className="step__title">{props.title}</div>
                <p>{props.desc}</p>
            </div>
        </div>
    )
}

export default MainpageStep;