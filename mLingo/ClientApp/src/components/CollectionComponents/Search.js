import React from "react";
import CardComponent from '../UserPanelComponents/CardComponent'
import SearchInput from '../FormComponents/SearchInput'

import { authenticationService } from "../../services/authentication";

class UserHead extends React.Component {
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

    logout = () => {
        authenticationService.logout();
        //it works because localStorage is empty imidiately
        window.location.reload();
    };

    componentDidMount() {
        this.findcollection();
    }

    render() {
        return (
            <div>
                <div className="mainpanel">
                    <div className="mainpanel__userbase">
                        <h3>You have searched for : {localStorage.getItem("request")} </h3>
                        <SearchInput />
                        <button onClick={this.findcollection}>Find</button>
                        <button onClick={this.logout}>Logout</button>

                    </div>
                </div>
                {
                    this.state.exist ? this.state.fields.map(element => (
                        <CardComponent set={element} />
                    )) : this.state.exist ? <div className="text-center"><h2> No collection found </h2></div> : <div className="text-center"><h2> No collection found </h2></div>
                }
            </div>
        );
    }
}

export default UserHead;