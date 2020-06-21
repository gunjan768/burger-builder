import React from 'react';
import classes from './Button.module.css';

const button = (props) => 
{
    const btnClass = [];

    btnClass.push(classes.Button);
    btnClass.push(classes[props.btnType]);

    // console.log(classes[props.btnType]);
    
    return (
        <button
            disabled = { props.disabled }
            className = { btnClass.join(' ') }
            onClick = { props.clicked }> { props.children }
        </button>
    )
}

export default button;