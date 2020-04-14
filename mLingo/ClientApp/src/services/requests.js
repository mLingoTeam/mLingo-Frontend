import { authentication_service } from './authentication';

 const requests = {
    async mountCollection() {
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
    },

    async mountEditCollection() {
             const collid = localStorage.getItem("editCollection");

                const collectioni = await authenticationService.requestCollection("id", collid);

               return collectioni;
        }

}

export default requests;