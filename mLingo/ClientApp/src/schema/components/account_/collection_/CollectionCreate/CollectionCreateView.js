import React from "react";

import CollectionCreateDetails from './CollectionView/CollectionCreateDetails'
import CollectionCreateFlashcards from './CollectionView/CollectionCreateFlashcards';

const CollectionCreateView = ( { state, functions } ) => {

    return (
        <div className="create__container create--collection">
            <CollectionCreateDetails state={state} functions={functions}/>
            <CollectionCreateFlashcards state={state} functions={functions}/>
        </div >
    )
}

export default CollectionCreateView;