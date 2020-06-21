import React from 'react';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends React.Component
{
    componentDidMount()
    {
        this.props.onLogout();
    }

    render()
    {
        return <Redirect to="/" />
    }
}

// mapDispatchToProps stores a function which excepts a function as an argument. This function is a dispatch function. When you call
// any one of the functions defined inside mapDispatchToProps , dispatch() will be executed and then it will search each and every
// reducers for the 'type' so every reducers defined will run
const mapDispatchToProps = dispatch => 
{
    return (
    {
        onLogout: () => dispatch(actions.logout())
    })
}

export default connect(null,mapDispatchToProps)(Logout);