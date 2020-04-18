import React from 'react';

const MainpageOpinion = ( {set, index}) => {


    return(
        <div className="Opinion offset-md-3  col-md-8" key={index}>
            <img src={set.photo} />
            <p className="col-md-7">{set.opinion}</p>
        </div>
    )
}

export default MainpageOpinion;