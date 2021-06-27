import '@testing-library/jest-dom/extend-expect';
import { authentication_service } from '../../services/authentication/authentication';


console.log("DOING COLLECTION TEST")




const collectionService = authentication_service.collection;

test("Collection is created properly", async () => {

    const loggedUser = authentication_service.user.login("mLingoTeam", "Mlingo202!");
    console.log(loggedUser);

    //const createdCollection = collectionService.create("Test Collection", "", [{ term: "Test Term", definition: "Test Definition" }, { term: "Test Term 2", definition: "Test Definition 2" }], "123456")


})
/*
test("Bad Login Request returns an empty objects", () => {
    collectionService.login("K", "K123").then(data => expect(data).toEqual({}))
})

test("Logout works properly", () => {
    authentication_service.user.logout()
    expect(localStorage.getItem(CURRENT_LOGGED_USER)).toBe(null)
    expect(localStorage.getItem(CURRENT_TOKEN)).toBe(null)
})*/