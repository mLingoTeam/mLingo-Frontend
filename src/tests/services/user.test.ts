import "@testing-library/jest-dom/extend-expect";
import { authentication_service } from '../../services/authentication/authentication';
import { CURRENT_LOGGED_USER, CURRENT_TOKEN } from "../../config/constants/localStorageConstants";


const userService = authentication_service.user;

test("User login service return the right object", async () => {
    const loggedUser = await userService.login("mLingoTeam", "Mlingo202!")
    expect(loggedUser.successful).toBe(true)
})

test("Bad Login Request returns an empty objects", async () => {
    const badLogin = await userService.login("K", "K123");
    expect(badLogin).toBe(false);
})

test("Logout works properly", () => {
    userService.logout();
    expect(localStorage.getItem(CURRENT_LOGGED_USER)).toBe(null);
    expect(localStorage.getItem(CURRENT_TOKEN)).toBe(null);
})