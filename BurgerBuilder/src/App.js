// ***************************************************  class Implementation starts  ****************************************************

import React, { Component as gunjan } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route,Switch, Redirect, withRouter } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => 
{
    return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => 
{
    return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => 
{
    return import('./containers/Auth/Auth');
})

// Class based implementation
class App extends gunjan 
{
    componentDidMount()
    {
        this.props.onTryAutoSignup();
    }

    render()
    {  
        let routes = (
            <Switch>
                <Route path="/auth" component = { asyncAuth } />
                <Route path="/" exact component = { BurgerBuilder } />
                <Redirect to="/" />
            </Switch>
        )
        
        if( this.props.isAuthenticated )
        {
            routes = (
                <Switch>
                    <Route path="/checkout" component = { asyncCheckout } />     
                    <Route path="/orders" component = { asyncOrders } />
                    <Route path="/logout" component = { Logout } />
                    <Route path="/auth" component = { asyncAuth } />
                    <Route path="/" component = { BurgerBuilder } />
                    <Redirect to="/" />
                </Switch>
            )
        }

        return (
            <div>
                
                <Layout>
                    { routes }
                </Layout>

            </div> 
        )
    }
}

// mapStateToProps actually stores a function which expects the state stored in redux as the input and returns a JS object which is a 
// map of props names and slices of the state stored in redux. Here only which part of state stored in redux we want to send or inject
// in the container (means in class) as a props. It will be called each time automatically whenever there is a change in the redux state
// and will update the state.
const mapStateToProps = state => 
{
    return (
    {
        isAuthenticated: state.auth.token !== null
    })
}
  
// mapDispatchToProps stores a function which excepts a function as an argument. This function is a dispatch function. When you call
// any one of the functions defined inside mapDispatchToProps , dispatch() will be executed and then it will search each and every
// reducers for the 'type' so every reducers defined will run.
const mapDispatchToProps = dispatch => 
{
    return (
    {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    })
}

// withRouter is a HOC which is used to wrap the component so that Router will still work as we have used another HOC which is connect
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


// *************************************************  class Implementation ends  *********************************************************  