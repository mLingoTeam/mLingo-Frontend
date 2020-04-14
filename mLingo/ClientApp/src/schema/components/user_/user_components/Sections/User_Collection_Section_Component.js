import React from "react";
import { Link } from 'react-router-dom';

import UserSection from '../UserSection';
import CollectionCardComponent from '../../collection_components/CollectionCardComponent';
import Animation_Loading from '../../../animation_/Animation_Loading'

import { authentication_service } from "../../../../../services/authentication";

import { FaPlus } from 'react-icons/fa'

class User_Collection_Section_Component extends React.Component {

    constructor(props) {
        super(props);

        this.state = { fields: [], exist: null, loading: true, type: 'username', request: localStorage.getItem("currentUser") }

        this.findcollection = this.findcollection.bind(this);
    }

    async findcollection() {
        const collectiondata = await authentication_service.collection.find({type: this.state.type, name: this.state.request});

        if (collectiondata.successful === true) {
            this.setState({ "fields": collectiondata.response, "exist": true, "loading": false });
        }
        else {
            this.setState({ "fields": [], "exist": false, "loading": false });
        }
    }

    componentDidMount() {
        this.findcollection();
    }

    render() {
        return (
            <UserSection title="collections" description=" Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY. Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY.">
                {
                    this.state.loading ? <div className="position-relative"><Animation_Loading/></div>  : <div>
                        <div className="yourcollections">
                            {
                                this.state.exist ? this.state.fields.map(element => (
                                    <CollectionCardComponent set={element} />
                                )) : <div className="text-center col-12"><h2> You have no collection! &nbsp; </h2></div>
                            }
                            {
                                this.state.exist ? <button class="green-button">Load more</button> : null
                            }
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to="/create" className="plus-button"><FaPlus /></Link>
                        </div>
                    </div>
                }
            </UserSection>
        );
    }
}

export default User_Collection_Section_Component;