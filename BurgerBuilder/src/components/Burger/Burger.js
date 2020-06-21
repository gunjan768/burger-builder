import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>
{
    const ourIngredients = Object.keys(props.ingredients);
    
    let transformedIngredients = ourIngredients.map(igKey =>
    {
        return [...Array(props.ingredients[igKey])].map((it,ind) =>
        {
            return <BurgerIngredient key = { igKey+ind } type = { igKey } />
        })
    })

    // console.log(transformedIngredients);

    // In reduce() function, initial value given to 'arr' is an empty array [] .
    transformedIngredients = transformedIngredients.reduce((arr,currentElement) =>
    {
        // console.log(currentElement);

        // concat() is a built-in funtion used to join two or more arrays 
        return arr.concat(currentElement);
    },[]);

    // console.log(ourIngredients);
    // console.log(transformedIngredients);

    if( transformedIngredients.length === 0)
    transformedIngredients = <p>Please start adding the ingredients !!</p>
    
    return(
        <div className = { classes.Burger }>
            
            <BurgerIngredient type = "bread-top" />
            
            { transformedIngredients }

            <BurgerIngredient type = "bread-bottom" />

        </div>
    );
}

export default burger;