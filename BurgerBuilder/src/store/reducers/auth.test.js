import * as actionTypes from '../actions/actionsTypes';
import reducer from './auth';

describe("Testing auth reducer", () => {

    it('should return the initial state', () => {
        // We are passing the value of state as undefined so it will take the initial state.
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        });
    });

    it('should store token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'any-token',
            userId: 'any-userd-id'
        })).toEqual({
            token: 'any-token',
            userId: 'any-userd-id',
            error: null,
            loading: false,
            authRedirectPath: "/"
        })
    });
});