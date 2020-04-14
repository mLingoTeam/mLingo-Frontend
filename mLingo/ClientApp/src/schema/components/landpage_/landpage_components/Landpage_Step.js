import React from 'react';

const Landpage_Step = ( {props}) => {


    return(
        <div className="Step col-lg-7 col-xl-3 my-5" key={props.title}>
            <img src={props.img} className="img-fluid" data-aos="flip-left"  data-aos-delay="200" data-aos-duration="1000"/>
            <div className="col-sm-12 col-md-10">
                <h2>{props.title}</h2>
                <p>{props.desc}</p>
            </div>
        </div>
    )
}

export default Landpage_Step;