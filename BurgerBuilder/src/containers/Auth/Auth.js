import React from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidation } from '../../shared/utility';

class Auth extends React.Component
{
    state =
    {
        controls:
        {
            email:
            {
                elementType: 'input',
                elementConfig:
                {
                    type: 'email',
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
            password:
            {
                elementType: 'input',
                elementConfig:
                {
                    type: 'password',
                    placeholder: 'Your password',
                    title: "Password must be atleast 6 characters long"
                },
                value: "",
                validation:
                {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount() 
    {
        if( !this.props.buildingBurger && this.props.authRedirectPath !== '/' ) 
        {
            this.props.onSetAuthRedirectPath();
        }
    }

    
    inputChangedHandler = (event, controlName) => 
    {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidation( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            })
        })

        this.setState(
        {
            controls: updatedControls
        })
    }

    submitHandler = ( event ) => 
    {
        event.preventDefault();
        
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }

    switchAuthModeHandler = () => 
    {
        this.setState(prevState => 
        {
            return (
            {
                isSignup: !prevState.isSignup
            })
        })
    }

    render()
    {
        const formArray = [];

        for(let key in this.state.controls)
        {
            formArray.push(
            {
                id: key,
                config: this.state.controls[key]
            })
        }

        let form =  formArray.map(formElement =>
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

        if( this.props.loading )
        form = <Spinner />;

        let errorMessage = null;

        if( this.props.error )
        {
            // error is an object which has been received back as an error from the firebase and it has message property
            errorMessage = <p>{ this.props.error.message }</p>;
        }

        let authRedirect = null;

        if( this.props.isAuthenticated )
        authRedirect = <Redirect to = { this.props.authRedirectPath }/>

        return (
            <div className = { classes.Auth }>
                
                { authRedirect }
                { errorMessage }

                <form onSubmit = { this.submitHandler }>
                    { form }
                    <Button btnType="Success">Submit</Button>
                </form>
                
                <Button 
                    clicked = { this.switchAuthModeHandler }
                    btnType="Danger">SWITCH TO { this.state.isSignup ? 'SIGNIN' : 'SIGNUP' }
                </Button>

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
    console.log("Auth", state);

    return (
    {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    })
}

// mapDispatchToProps stores a function which excepts a function as an argument. This function is a dispatch function. When you call
// any one of the functions defined inside mapDispatchToProps , dispatch() will be executed and then it will search each and every
// reducers for the 'type' so every reducers defined will run.
const mapDispatchToProps = dispatch => 
{
    return (
    {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);