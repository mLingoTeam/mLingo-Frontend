import { authentication_service } from "../../../../../services/authentication/authentication";

const helper = {

    async getSet() {
        const collid = localStorage.getItem("editCollection");
        const collectioni = await authentication_service.collection.find({ type: "id", name: collid });
        return collectioni;
    },

    modifySet({ cards, name, description, id }) {
        authentication_service.collection.update({ id, token: localStorage.getItem("Token"), cards: cards, name: name, description: description })
    },

    createSet({ collectionIds , name, description }) {
        authentication_service.collection.create({name, description, collectionIds, Token: localStorage.getItem("Token")});
    }
}

export default helper;