import React from "react";
import { Link } from 'react-router-dom';

import UserSection from '../UserSection';
import CardComponent from '../../CardComponents/CardComponent';

import { authenticationService } from "../../../../services/authentication";

class StudySetsSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = { fields: [], exist: null, loading: true, type: 'username', request: localStorage.getItem("currentUser") }

        this.findcollection = this.findcollection.bind(this);
    }

    async findcollection() {
        const collectiondata = await authenticationService.requestCollection(this.state.type, this.state.request);

        if (collectiondata.successful === true) {
            this.setState({ "fields": collectiondata.response, "exist": true, "loading": false });
        }
        else {
            console.log("false")
            this.setState({ "fields": [], "exist": false, "loading": true });
        }
    }

    componentDidMount() {
        this.findcollection();
    }

    render() {
        return (
            <UserSection title="study sets" description=" Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY. Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY.">
                {
                    this.state.loading ? <p>Loading</p> : <div>
                        <div className="yourcollections">
                            {
                                this.state.exist ? this.state.fields.map(element => (
                                    <CardComponent set={element} />
                                )) : <div className="text-center"><h2> You have no collection! &nbsp; </h2></div>
                            }
                            <button class="green-button">Load more</button>
                        </div>
                        <div>
                            <Link to="/create" className="green-button">Create more collections</Link>
                        </div>
                    </div>
                }
            </UserSection>
        );
    }
}

export default StudySetsSection;