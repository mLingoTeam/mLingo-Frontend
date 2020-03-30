import React from 'react'
import { Link } from 'react-router-dom';

import { authenticationService } from '../../../services/authentication';
import Flashcard from './Flashcard';
import { createImportSpecifier } from 'typescript';


class Collection extends React.Component {

    constructor() {
        super();

        this.state = [{ "loaded": false }];

        this.mount = this.mount.bind(this);
        this.removeCollection = this.removeCollection.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.modifyCollection = this.modifyCollection.bind(this);
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

    removeCard(set) {
        console.log(set);
        //only looking for the first card
        const searchedValue = this.state.collection.find(element => ((element.term == set.term) && (element.definition == set.definition)));
        this.setState(() => {
            return {
                ...this.state,
                collection: this.state.collection.filter(element => element !== searchedValue)
            }
        })
    }

    componentWillUnmount() {
        localStorage.removeItem("collectionid")
    }

    componentDidMount() {
        this.mount()
    }

    modifyCollection() {

        authenticationService.updateCollection({ id: localStorage.getItem("collectionid"), token: localStorage.getItem("Token"), cards: this.state.collection })
    }

    removeCollection() {
        authenticationService.removeCollection(localStorage.getItem("collectionid"), localStorage.getItem("Token"));
        localStorage.removeItem("collectionid");
        this.setState({ ...this.state, "collection": false });
    }

    render() {
        return (
            <div>
                Collection
                {
                    this.state.loaded ? this.state.collection ? this.state.collection.map(element => (
                        <Flashcard set={element} remove={this.removeCard} />
                    )) : <h1>Collection removed!</h1> : <h1>loading</h1>
                }
                <Link to='/head' className="green-button">go back</Link>
                {
                    this.state.collection ? <div>
                        <button className="green-button" onClick={this.removeCollection}>Remove Collection</button>
                        <button className="green-button" onClick={this.modifyCollection}>Update Collection</button>
                    </div> : null
                }
            </div>

        )
    }
};

export default Collection;