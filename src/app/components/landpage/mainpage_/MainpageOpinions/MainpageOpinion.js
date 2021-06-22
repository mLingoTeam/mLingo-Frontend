import React from 'react';

const MainpageOpinion = ( {set, index}) => {


    return(
        <div className="opinion__container" key={index}>
            <img className="opinion__img" src={set.photo} />
            <div className="opinion__description">{set.opinion}</div>
        </div>
    )
}

export default MainpageOpinion;