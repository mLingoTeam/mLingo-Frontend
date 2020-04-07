import React from 'react';

const Step = ( {props}) => {


    return(
        <div className="Step" key={props.title}>
            <img src={props.img} className="img-fluid"/>
            <h2>{props.title}</h2>
            <p>{props.desc}</p>
        </div>
    )
}

export default Step;