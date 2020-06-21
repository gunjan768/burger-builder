import React from 'react';
import Aux from '../Auxs/Auxs';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends React.Component
{
    state = 
    {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () =>
    {
        this.setState(
        {
            showSideDrawer: false
        })
    }

    // Whenever we want to use the previous state in our setState() , we will take the use of an anonymous
    // function and will take the previous state as an argument. 
    sideDrawerToggleHandler = () =>
    {
        this.setState((prevState) =>
        {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    render()
    {
        return (
            <Aux>
                
                {
                    // Toolbar is for whole header part. SideDrawer is for side menu and it will be showed in 
                    // mobile view i.e when width < 500px. <main> is for the body part below header.
                }

                <Toolbar 
                    isAuth = { this.props.isAuthenticated }
                    drawerToggleClicked = { this.sideDrawerToggleHandler }
                />
                
                <SideDrawer 
                    isAuth = { this.props.isAuthenticated }
                    open = { this.state.showSideDrawer } 
                    closed = { this.sideDrawerClosedHandler } 
                />

                <main className = { classes.Content }> { this.props.children } </main>
        
            </Aux>
        )
    }
}

// mapStateToProps actually stores a function which expects the state stored in redux as the input and returns a JS object which is a 
// map of props names and slices of the state stored in redux. Here only which part of state stored in redux we want to send or inject
// in the container (means in class) as a props. It will be called each time automatically whenever there is a change in the redux state
// and will update the state
const mapStateToProps = state => 
{
    console.log("BurgerBuilder", state);

    return (
    {
        isAuthenticated: state.auth.token != null
    })
}

export default connect(mapStateToProps)(Layout);