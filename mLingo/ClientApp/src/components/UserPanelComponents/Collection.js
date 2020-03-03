import React from 'react'
import { authenticationService } from '../../services/authentication';
import Flashcard from './Flashcard';



class Collection extends React.Component {

    constructor() {
        super();

        this.state = [{ "loaded": false }];

    }

    async mount() {
        const collid = localStorage.getItem("collectionid");
        console.log(collid)
        const collectioni = await authenticationService.requestCollection("id", collid);

        this.setState({ ...this.state, "collection": collectioni.response.cards });
        this.setState({ ...this.state, "loaded": true });

    }

    componentWillUnmount() {
        localStorage.removeItem("collectionid")
    }

    componentDidMount() {
        this.mount()
    }

    render() {
        return (
            <div>
                Collection
                {
                    this.state.loaded ? this.state.collection.map(element => (
                        <Flashcard set={element} />
                    )) : <h1>loading</h1>
                }
            </div>
        )
    }
};

export default Collection;