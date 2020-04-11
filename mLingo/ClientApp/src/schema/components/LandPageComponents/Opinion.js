import React from 'react';

const Opinion = ( {set, index}) => {


    return(
        <div className="Opinion offset-3 col-8" key={index}>
            <img src={set.photo} />
            <p className="col-7">{set.opinion}</p>
        </div>
    )
}

export default Opinion;