import React from 'react';
import Aux from '../../hoc/Auxs/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axiosOrder';

class BurgerBuilder extends React.Component
{
    state = 
    {
        purchasing: false,
    }
    
    componentDidMount()
    {
        this.props.onInitingredients();
    }

    updatePurchaseState = (updatedIngredients) =>
    {
        const ingredients = 
        {
            ...updatedIngredients
        }

        const ourIngredients = Object.keys(ingredients);

        const transformedIngredients = ourIngredients.map(it =>
        {
            return ingredients[it];
        })

        const sum = transformedIngredients.reduce((total,currentElement) =>
        {
            return total+currentElement;
        },0);

        return sum>0
    }

    purchaseHandler = () =>
    {
        if( this.props.isAuthenticated )
        {
            this.setState(
            {
                purchasing: true
            })
        }
        else
        {
            this.props.onSetAuthRedirectPath();
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () =>
    {
        this.setState(
        {
            purchasing: false
        })
    }

    purchaseContinueHandler = () =>
    {
        this.props.onInitPurchase();
        
        this.props.history.push('/checkout')
     }

    render()
    {
        // disabledInfo is used to disable the ingredients 'Less' buttons if their number become zero. So initially if you start the app
        // you will find all 'Less' buttons disabled as number of each ingredient is zero. 
        const disabledInfo = 
        {
            ...this.props.ings
        } 

        for(let key in disabledInfo)
        {
            let val = disabledInfo[key];
            
            disabledInfo[key] = val<=0 ;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients failed to load</p> : <Spinner />;

        if( this.props.ings )
        {
            orderSummary = (
                <OrderSummary 
                    ingredients = { this.props.ings }
                    price = { this.props.price }
                    purchaseCanceled = { this.purchaseCancelHandler }
                    purchaseContinued = { this.purchaseContinueHandler }
                />
            )

            burger = (
                <Aux>
                    <Burger ingredients = { this.props.ings } />
                    
                    <BuildControls 
                        ingredientAdded = { this.props.onIngredientAdded }
                        ingredientRemoved = { this.props.onIngredientRemoved }
                        disabled = { disabledInfo }    
                        purchasable = { this.updatePurchaseState( this.props.ings ) }
                        ordered = { this.purchaseHandler }
                        price = { this.props.price } 
                        isAuth = { this.props.isAuthenticated }
                    />
                </Aux>
            )
        }

        return (
            <Aux>
                <Modal show = { this.state.purchasing } modalClosed = { this.purchaseCancelHandler }>
                    { orderSummary }
                </Modal>

                { burger }
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null
    })
}

// mapDispatchToProps stores a function which excepts a function as an argument. This function is a dispatch function. When you call
// any one of the functions defined inside mapDispatchToProps , dispatch() will be executed and then it will search each and every
// reducers for the 'type' so every reducers defined will run
const mapDispatchToProps = dispatch => 
{
    return (
    {
        onIngredientAdded: ( igName ) => dispatch(actions.addIngredient(igName)),
        onIngredientRemoved: ( igName ) => dispatch(actions.removeIngredient(igName)),
        onInitingredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/checkout'))
    })
}

// connect() is a function which in turn returns another function which is a HOC. It can accepts two arguments : which slice of 
// redux state you want to  get in this container and which actions do you want to dispatch. 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)); 