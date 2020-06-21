import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = 
[
    { label: 'Salad', type: 'salad' },
    { label: 'Paneer', type: 'paneer' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
]

const buildControls = (props) =>
(
    <div className = { classes.BuildControls }>

        <p><strong>Current Price : Rs { props.price }</strong></p>

        {
            controls.map(ctrl =>
            {
                return(
                    <BuildControl 
                        key = { ctrl.label } 
                        label = { ctrl.label }
                        added = { () => props.ingredientAdded(ctrl.type) }
                        removed = { () => props.ingredientRemoved(ctrl.type) } 
                        disabled = { props.disabled[ctrl.type] }
                    />
                );
            })
        }

        <button 
            className = { classes.OrderButton }
            disabled = { !props.purchasable } 
            onClick = { props.ordered } > { props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER' }
        </button>

    </div>
)

export default buildControls;