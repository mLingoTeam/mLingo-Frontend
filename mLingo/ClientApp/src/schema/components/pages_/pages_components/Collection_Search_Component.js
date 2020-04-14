import React from "react";
import StudySetCardComponent from '../collection_components/StudySetCardComponent'
import Search_Input from '../../layout_/search_components/Search_Input'

import { authenticationService } from "../../../../services/authentication";

class Collection_Search_Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = { fields: [], exist: null, type: 'name', request: localStorage.getItem("request") }

        this.findcollection = this.findcollection.bind(this);
        this.changeRequest = this.changeRequest.bind(this);
        this.changeRequestType = this.changeRequestType.bind(this);

    }

    changeRequest(event) {
        this.setState({ "request": event.target.value });
    }
    changeRequestType(event) {
        this.setState({ "type": event.target.value });
    }


    async findcollection() {
        const collectiondata = await authenticationService.requestCollection(this.state.type, this.state.request);

        if (collectiondata.successful === true) {
            this.setState({ "fields": collectiondata.response, "exist": true });
        }
        else {
            console.log("false")
            this.setState({ "fields": [], "exist": false });
        }
    }

    componentDidMount() {
        this.findcollection();
    }

    render() {
        return (
            <div>
                <div>
                    <h3>You have searched for : {localStorage.getItem("request")} </h3>
                    <Search_Input />
                    <button onClick={this.findcollection}>Find</button>
                </div>
                {
                    this.state.exist ? this.state.fields.map(element => (
                        <StudySetCardComponent set={element} />
                    )) : this.state.exist ? <div className="text-center"><h2> No collection found </h2></div> : <div className="text-center"><h2> No collection found </h2></div>
                }
            </div>
        );
    }
}

export default Collection_Search_Component;