import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxs/Auxs'

const sideDrawer = (props) =>
{
    let attachedClasses = [classes.SideDrawer];

    if(props.open)
    attachedClasses.push(classes.Open);
    else
    attachedClasses.push(classes.Close);

    return (
        <Aux>
            <Backdrop show = { props.open } clicked = { props.closed } />
            
            <div className = { attachedClasses.join(' ') } onClick = {props.closed }>
                
                <div className = { classes.Logo }>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems isAuth = { props.isAuth }/>
                </nav>

            </div>
        </Aux>  
    )
}

export default sideDrawer;