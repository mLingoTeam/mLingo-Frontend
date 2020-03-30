import React from 'react'
import { Link } from 'react-router-dom';

import { authenticationService } from '../../../services/authentication';
import Flashcard from './Flashcard';


class Collection extends React.Component {

    constructor() {
        super();

        this.state = [{ "loaded": false }];

        this.mount = this.mount.bind(this);
        this.removeCollection = this.removeCollection.bind(this);

    }

    async mount() {
        const collid = localStorage.getItem("collectionid");

        if (collid) {
            const collectioni = await authenticationService.requestCollection("id", collid);

            this.setState({ ...this.state, "collection": collectioni.response.cards });
            this.setState({ ...this.state, "loaded": true });
        }
        else {
            this.setState({ ...this.state, "collection": false });
            this.setState({ ...this.state, "loaded": true });
        }



    }

    componentWillUnmount() {
        localStorage.removeItem("collectionid")
    }

    componentDidMount() {
        this.mount()
    }
    removeCollection() {
        authenticationService.removeCollection(localStorage.getItem("collectionid"), localStorage.getItem("Token"));
        localStorage.removeItem("collectionid");
        this.setState({ ...this.state, "collection": false });
    }

    render() {
        console.log(this.state)
        return (
            <div>
                Collection
                {
                    this.state.loaded ? this.state.collection ? this.state.collection.map(element => (
                        <Flashcard set={element} />
                    )) : <h1>Collection removed!</h1> : <h1>loading</h1>
                }
                <Link to='/head' className="green-button">go back</Link>
                <div>
                    <button className="green-button" onClick={this.removeCollection}>Remove Collection</button>
                </div>
            </div>

        )
    }
};

export default Collection;