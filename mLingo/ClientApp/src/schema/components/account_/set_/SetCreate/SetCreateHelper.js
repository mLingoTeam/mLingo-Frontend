import { authentication_service } from "../../../../../services/authentication/authentication";

const helper = {

    async getSet() {
        const collid = localStorage.getItem("editCollection");
        const collectioni = await authentication_service.set.find({ type: "id", name: collid });
        return collectioni;
    },

    modifySet({ cards, name, description, id }) {
        authentication_service.set.update({ id, token: localStorage.getItem("Token"), cards: cards, name: name, description: description })
    },

    createSet({ collectionIds , name, description }) {
        authentication_service.set.create({name, description, collectionIds, Token: localStorage.getItem("Token")});
    }
}

export default helper;