import React from 'react';

const Step = ( {props}) => {


    return(
        <div className="Step" key={props.title}>
            <img src={props.img} className="img-fluid" data-aos="flip-left"/>
            <div>
                <h2>{props.title}</h2>
                <p>{props.desc}</p>
            </div>
        </div>
    )
}

export default Step;