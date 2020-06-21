import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axiosOrder'; 
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidation } from '../../../shared/utility';

class ContactData extends React.Component
{
    state =
    {
        orderForm:
        { 
            name: 
            {
                elementType: 'input',
                elementConfig:
                {
                    type: 'text',
                    placeholder: 'Your Name',
                    title: "Enter your Full Name"
                },
                value: "",
                validation:
                {
                    required: true
                },
                valid: false,
                touched: false
            },
            street:
            {
                elementType: 'input',
                elementConfig:
                {
                    type: 'text',
                    placeholder: 'Street',
                    title: "Street with landmark if any"
                },
                value: "",
                validation:
                {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode:
            {
                elementType: 'input',
                elementConfig:
                {
                    type: 'number',
                    placeholder: 'ZIP Code',
                    title: "Zip Code must be 6 characters long"
                },
                value: "",
                validation:
                {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country:
            {
                elementType: 'input',
                elementConfig:
                {
                    type: 'text',
                    placeholder: 'Country',
                    title: "Enter the Country where you are currently in"
                },
                value: "",
                validation:
                {
                    required: true
                },
                valid: false,
                touched: false
            },
            email:
            {
                elementType: 'input',
                elementConfig:
                {
                    type: 'emai',
                    placeholder: 'Your E-Mail',
                    title: "Email must contain '@' sign"
                },
                value: "",
                validation:
                {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:
            {
                elementType: 'select',
                elementConfig:
                {
                    options:
                    [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                    title: "Choose the delivery option which suits you the most"
                },
                value: "fastest",
                validation: {},
                valid: true 
            }
        },
        formIsValid: false,
    }

    orderHandler = (event) =>
    {
        event.preventDefault();

        const formData = {};

        for(let formKey in this.state.orderForm)
        {
            formData[formKey] = this.state.orderForm[formKey];
        }

        const order = 
        {
            ingredients: this.props.ings,
            price: this.props.price,
            order: formData,
            userId: this.props.userId
        }
        
        this.props.onOrderBurger(order, this.props.token);
    }

    checkValidation = ( value, rules ) =>
    {
        let isValid = true;

        if( rules.required )
        {
            isValid = value.trim() !== '' && isValid;
        }

        if( rules.minLength )
        {
            isValid = value.length >= rules.minLength && isValid;
        }

        if( rules.maxLength )
        {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) 
        {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputKey) =>
    {
        const updatedFormElement = updateObject(this.state.orderForm[inputKey], {
            value: event.target.value,
            valid: checkValidation(event.target.value, this.state.orderForm[inputKey].validation),
            touched: true
        })

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputKey]: updatedFormElement
        })

        let formIsValid = true;

        for(let key in updatedOrderForm)
        formIsValid = updatedOrderForm[key].valid && formIsValid;

        this.setState(
        {
            orderForm: updatedOrderForm,
            formIsValid
        })
    }

    render()
    {
        const formArray = [];

        for(let key in this.state.orderForm)
        {
            formArray.push(
            {
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit = { this.orderHandler }>
                
                { 
                    formArray.map(formElement =>
                    {
                        return (
                            <Input 
                                key = { formElement.id }
                                elementType = { formElement.config.elementType }
                                elementConfig = { formElement.config.elementConfig }
                                value = { formElement.config.value }
                                inValid = { !formElement.config.valid }
                                shouldValidate = { formElement.config.validation }
                                touched = { formElement.config.touched }
                                changed = { (event) => this.inputChangedHandler(event, formElement.id) }
                            />
                        )
                    })
                }

                <Button 
                    btnType="Success"
                    disabled = { !this.state.formIsValid } >Order
                </Button>

            </form>
        )

        if( this.props.loading )
        form = <Spinner />

        return (
            <div className = { classes.ContactData }>
                
                <h4>Enter your contact data</h4>
                { form }

            </div>
        )
    }
}

// mapStateToProps actually stores a function which expects the state stored in redux as the input and returns a JS object which is a 
// map of props names and slices of the state stored in redux. Here only which part of state stored in redux we want to send or inject
// in the container (means in class) as a props. It will be called each time automatically whenever there is a change in the redux state
const mapStateToProps = state => 
{
    console.log("ContactData",state);

    return (
    {
       ings: state.burgerBuilder.ingredients,
       price: state.burgerBuilder.totalPrice,
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
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger( orderData, token ))
    })
}

// Here we have nothing to dispatch so we omitted the second argument i.e 'mapDispatchToProps'
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));