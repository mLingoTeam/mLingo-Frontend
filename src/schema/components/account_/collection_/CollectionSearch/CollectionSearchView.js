import React from "react";
import CollectionCardComponent from '../CollectionCard/CollectionCard';

const CollectionSearchView =  ( { state, functions }) => {
    return (
        <div className="search__container">
                <div className="search__title">You have searched for : {localStorage.getItem("request")} </div>
            {
                state.exist ? state.fields.map(element => (
                    <CollectionCardComponent set={element} />
                )) :  <div className="search__nofound"><h2> No collection found </h2></div>
            }
        </div>
    );
}

export default CollectionSearchView;