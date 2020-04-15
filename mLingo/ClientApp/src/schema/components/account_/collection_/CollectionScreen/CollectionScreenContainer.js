import React from 'react'
import { Link } from 'react-router-dom';

import { authentication_service } from '../../../../../services/authentication';
import  requests  from './requests';
import Collection_Flashcard_Component from '../CollectionFlashcard/CollectionFlashcard';


class Collection extends React.Component {

    constructor() {
        super();

        this.state = [{ "loaded": false }];

        this.mountCollection = requests.mountCollection.bind(this);
        this.removeCollection = this.removeCollection.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.modifyCollection = this.modifyCollection.bind(this);
    }



    async removeCard(set) {
        //only looking for the first card
        const searchedValue = this.state.collection.find(element => ((element.term == set.term) && (element.definition == set.definition)));
        const new_collection = this.state.collection.filter(element => element !== searchedValue);
        this.setState(() => {
            return {
                ...this.state,
                collection: new_collection
            }
        })
    }

    componentWillUnmount() {
        localStorage.removeItem("collectionid")
    }

    componentDidMount() {
        this.mountCollection();
    }

    modifyCollection() {
        authentication_service.collection.update({ id: localStorage.getItem("collectionid"), token: localStorage.getItem("Token"), cards: this.state.collection })
    }

    removeCollection() {
        authentication_service.collection.remove(localStorage.getItem("collectionid"), localStorage.getItem("Token"));
        localStorage.removeItem("collectionid");
        this.setState({ ...this.state, "collection": false });
    }

    editCollection(){
        localStorage.setItem("editCollection", localStorage.getItem("collectionid"))
    }

    render() {
        return (
            <div className="col-9">
                Collection
                {
                    this.state.loaded ? this.state.collection ? this.state.collection.map((element, index) => (
                        <Collection_Flashcard_Component set={element} remove={this.removeCard} index={index}/>
                    )) : <h1>Collection removed!</h1> : <h1>loading</h1>
                }
                <Link to='/head' className="green-button">go back</Link>
                {
                    this.state.collection ? <div>
                        <button className="green-button" onClick={this.removeCollection}>Remove Collection</button>
                        <button className="green-button" onClick={this.modifyCollection}>Remove Cards</button>
                        <Link className="green-button" onClick={this.editCollection} to="/create" >Edit Collection</Link>
                    </div> : null
                }
            </div>

        )
    }
};

export default Collection;