import { authentication_service } from "../../../../../services/authentication/authentication";

const helper = {

    async getCollection() {
        const collid = localStorage.getItem("editCollection");
        const collectioni = await authentication_service.collection.find({ type: "id", name: collid });
        return collectioni;
    },

    modifyCollection(cards, name, description) {
        authentication_service.collection.update({ id: localStorage.getItem("editCollection"), token: localStorage.getItem("Token"), cards, name, description })
    },

    createCollection() {
        authentication_service.collection.create({name: this.state.collectionTitle, description: this.state.collectionDescription,cards: this.state.cards, Token: localStorage.getItem("Token")});
    }
}

export default helper;