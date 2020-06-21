import React from 'react';
import Aux from '../../../hoc/Auxs/Auxs';
import Button from '../../UI/Button/Button';

const orderSummary = (props) =>
{
    const ourSummary = Object.keys(props.ingredients);

    // Two curly braces in style. One is for dynamic purpose and other is to represent 'style' attribute
    // as an object .
    const ingredientSummary = ourSummary.map(igKey => 
    {
        return (
            <li key = { igKey }>
                <span style = { { textTransform: 'capitalize' } }>{ igKey }</span>
                : { props.ingredients[igKey] }
            </li>
        )
    })
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>

            <ul>
                { ingredientSummary }
            </ul>

            <p><strong>Total Price : Rs { props.price }</strong></p>

            <p>
                Continue to Checkout ? &nbsp;

                <Button btnType = "Danger" clicked = { props.purchaseContinued } >Continue</Button>
                <Button btnType = "Success" clicked = { props.purchaseCanceled } >Cancel</Button>
            </p>
        </Aux>
    )
}

export default orderSummary;