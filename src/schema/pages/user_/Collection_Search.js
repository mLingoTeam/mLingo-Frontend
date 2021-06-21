import React from "react";
import LayoutLandpage from '../../layouts/LayoutLandpage'
import CollectionSearchContainer from '../../components/account_/collection_/CollectionSearch/CollectionSearchContainer'

class Collection_Search extends React.Component {


    render() {
        return (
            <LayoutLandpage>
                <CollectionSearchContainer />
            </LayoutLandpage>
        )
    }
}

export default Collection_Search;