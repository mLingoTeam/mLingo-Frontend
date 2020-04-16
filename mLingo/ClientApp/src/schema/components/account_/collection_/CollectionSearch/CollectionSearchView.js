import React from "react";
import CollectionCardComponent from '../CollectionCard/CollectionCard';
import SearchInputContainer from '../../../layout_/SearchInput/SearchInputContainer';

const CollectionSearchView =  ( { that }) => {

    return (
        <div>
            <div>
                <h3>You have searched for : {localStorage.getItem("request")} </h3>
                <SearchInputContainer />
                <button onClick={that.findcollection}>Find</button>
            </div>
            {
                that.state.exist ? that.state.fields.map(element => (
                    <CollectionCardComponent set={element} />
                )) : that.state.exist ? <div className="text-center"><h2> No collection found </h2></div> : <div className="text-center"><h2> No collection found </h2></div>
            }
        </div>
    );
}

export default CollectionSearchView;