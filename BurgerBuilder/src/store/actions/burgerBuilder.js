import * as actionTypes from './actionsTypes';
import axios from '../../axiosOrder'; 


// Here all functions defined are used to return the actions to their respective dispatch() function and from there goes to the respective
// reducer function ( as there might be many reducers so in that case it will search all the reducers )


export const addIngredient = (name) =>
{
    return (
    {
        type: actionTypes.ADD_INGREDIENT ,
        ingredientName: name
    })
}

export const removeIngredient = (name) =>
{
    return (
    {
        type: actionTypes.REMOVE_INGREDIENT ,
        ingredientName: name
    })
}

export const setIngredients = (ingredients) =>
{
    return (
    {
        type: actionTypes.SET_INGREDIENTS ,
        ingredients
    })
}

export const fetchIngredientsFailed = () =>
{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () =>
{
    // This is the action reducer which is used to run asynchronous code using third party package 'react-thunk'.
    return dispatch =>
    {
        axios.get('https://react-my-burger-c2eeb.firebaseio.com/ingredients.json')
        .then(response =>
        {
            // console.log(response);

            dispatch(setIngredients(response.data));
        })
        .catch(error =>
        {
            dispatch(fetchIngredientsFailed());
        })
    }
}