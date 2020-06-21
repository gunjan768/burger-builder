import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxs/Auxs';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.PureComponent
{
    // shouldComponentUpdate( nextProps, nextState )
    // {
    //     return nextProps.show !== this.props.show;
    // }
    
    render()
    {
        return (
            <Aux>
                {
                    // Backdrop is used to blur the whole page when Modal ( order summary div ) slides down 
                }

                <Backdrop show = { this.props.show } clicked = { this.props.modalClosed }/>
                
                <div 
                    className = { classes.Modal }
                    style = 
                    {{ 
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)' ,
                        opacity: this.props.show ? '1' : '0'
                    }}>

                    { this.props.children }
                </div>
            </Aux>
        )
    }
}

export default Modal;