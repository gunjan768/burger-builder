import * as actionTypes from './actionsTypes';
import axios from 'axios';

// This action creator is used to set a loading state and show a spinner 
export const authStart = () => 
{
    return {
        type: actionTypes.AUTH_START
    }
}

// This action creator is used to return an auth data
export const authSuccess = (token, userId) => 
{
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId
    }
}

export const authFail = (error) => 
{
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => 
{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return (
    {
        type: actionTypes.AUTH_LOGOUT
    })
}

export const checkAuthTimeout = (expirationTime) => 
{
    return dispatch => 
    {
        setTimeout(() => 
        {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => 
{
    return dispatch => 
    {
        dispatch(authStart());

        const authData = 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUSIWQNoqf7zCkrXIydJ6qJGSwgL4lVgM';
        
        if(!isSignup) 
        {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUSIWQNoqf7zCkrXIydJ6qJGSwgL4lVgM';
        }

        axios.post(url, authData)
        .then(response => 
        {
            console.log("Auth",response);

            let expirationDate = new Date().getTime() + response.data.expiresIn * 1000;
            expirationDate = new Date(expirationDate);
            
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);

            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => 
        {
            console.log("Error in Auth",error);

            dispatch(authFail(error.response.data.error));
        })
    }
}

export const setAuthRedirectPath = ( path ) => 
{
    return (
    {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    })
}

export const authCheckState = () => 
{
    return dispatch => 
    {
        const token = localStorage.getItem('token');
        
        if(!token) 
        {
            dispatch(logout());
        } 
        else 
        {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            
            if(expirationDate <= new Date()) 
            {   
                dispatch(logout());
            } 
            else 
            {
                const userId = localStorage.getItem('userId');
                
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    }
}