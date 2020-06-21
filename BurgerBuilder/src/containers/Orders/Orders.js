import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axiosOrder';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component
{
    componentDidMount()
    {
        // This is action creator
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render()
    {
        let orders = <Spinner />
        
        // this.props.loading will become true once onFetchOrders() will be executed as it will further executes fetchOrdersStart(). When you
        // will successfully fetch data from the firebase then fetchOrdersSuccess(fetchedOrders) will run which will set loading again to false
        // and orders (state.order.orders) to fetchedOrders . If fails then fetchOrdersFail(error) will run and it will only put loading to false
        // but will not touch orders (state.order.orders) so it will remain empty ( it is an array , see order.js under reducer folder )
        if( !this.props.loading )
        {
            orders = (
                // See console.log() part to see that what is coming as response.All these properties are coming from firebase server. Properties
                // like ingredients, id, price which we access through order ( like order.id, order.price, order.ingredients ) .
                this.props.orders.map(order =>
                {
                    return ( 
                        <Order 
                            ingredients = { order.ingredients }
                            key = { order.id }
                            price = { order.price }
                        />
                    )
                })
            )
        }

        return (
            <div> 
                { orders }
            </div>
        )
    }
}


// mapStateToProps actually stores a function which expects the state stored in redux as the input and returns a JS object which is a 
// map of props names and slices of the state stored in redux. Here only which part of state stored in redux we want to send or inject
// in the container (means in class) as a props. It will be called each time automatically whenever there is a change in the redux state
const mapStateToProps = state => 
{
    console.log("Orders", state);

    return (
    {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    })
}

// mapDispatchToProps stores a function which excepts a function as an argument. This function is a dispatch function. When you call
// any one of the functions defined inside mapDispatchToProps , dispatch() will be executed and then it will search each and every
// reducers for the 'type' so every reducers defined will run
const mapDispatchToProps = dispatch => 
{
    return (
    {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    })
}

// connect() is a function which in turn returns another function which is a HOC. It can accepts two arguments : which slice of 
// redux state you want to  get in this container and which actions do you want to dispatch. 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)); 