import React from "react";
import Layout from '../layouts/Layout'
import Collection_Search_Component from '../components/user_/collection_/collection_components/Collection_Search_Component'

class Collection_Search extends React.Component {


    render() {
        return (
            <Layout>
                <Collection_Search_Component />
            </Layout>
        )
    }
}

export default Collection_Search;