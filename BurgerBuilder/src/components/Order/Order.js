import React from 'react';
import classes from './Order.module.css';

const order = (props) => 
{
    const ingredients = [];

    for(let key in props.ingredients)
    {
        ingredients.push(
        {
            name: key ,
            amount: props.ingredients[key]
        })
    }

    const ingredientOutput = ingredients.map(igKey =>
    {
        return (
            <span
                key = { igKey.name }    
                style = 
                    {{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }} > { igKey.name }: { igKey.amount }
            </span>
        )
    })

    return (
        <div className = { classes.Order }>
            <p> { ingredientOutput } </p>
            <p>Price: <strong>Rs { props.price } </strong></p>
        </div>
    )
}
    
export default order;