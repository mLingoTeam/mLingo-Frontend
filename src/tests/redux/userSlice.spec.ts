import userReducer, {
    changeUsername,
    changeToken,
    UserState
} from '../../redux/slices/userSlice';

describe('user reducer', () => {
    const initialState: UserState = {
        username: "King Kong",
        token: '1234567',
    };
    it('should handle initial state', () => {
        expect(userReducer(undefined, { type: 'unknown' })).toEqual({
            username: '',
            token: '',
        });
    });

    it('should handle changing username', () => {
        const actual = userReducer(initialState, changeUsername('King Kong'));
        console.log(actual);
        console.log("--------------------------------");
        expect(actual.username).toEqual('King Kong');
    });

    it('should handle chanching token', () => {
        const actual = userReducer(initialState, changeToken('1234567'));
        expect(actual.token).toEqual('1234567');
    });
});
