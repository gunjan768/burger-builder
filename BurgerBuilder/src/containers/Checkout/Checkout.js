import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ConatctData/ConatctData';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions/index';

class Checkout extends React.Component
{
    checkoutContinued = () =>
    {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCanceled = () =>
    {
        this.props.history.goBack();
    }

    render()
    {   
        let summary = <Redirect to="/"/>
        let purchaseRedirect = null;

        // state.order.purchased becomes true when the form will get submitted successfully. When it becomes true then you will be 
        // redirected to the home page
        
        if(this.props.ings)
        purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;

        if(this.props.ings)
        {
            summary = (
                <div>
                    { purchaseRedirect }

                    <CheckoutSummary 
                        ingredients = { this.props.ings }
                        checkoutContinued = { this.checkoutContinued }
                        checkoutCanceled = { this.checkoutCanceled }
                    />
                    
                    {
                        // This Route is for form filling and will be displayed in the same page and not on next page 
                    }

                    <Route 
                        path = { this.props.match.path + '/contact-data' } 
                        component = { ContactData }
                    />
                </div>
            )
        }

        return summary;
    }
}

// mapStateToProps actually stores a function which expects the state stored in redux as the input and returns a JS object which is a 
// map of props names and slices of the state stored in redux. Here only which part of state stored in redux we want to send or inject
// in the container (means in class) as a props. It will be called each time automatically whenever there is a change in the redux state
const mapStateToProps = state => 
{
    console.log("Checkout",state);
    return (
    {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    })
}

// Here we have nothing to dispatch so we omitted the second argument i.e 'mapDispatchToProps'
export default connect(mapStateToProps)(Checkout);