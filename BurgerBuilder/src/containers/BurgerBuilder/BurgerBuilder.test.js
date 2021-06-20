import React from 'react';
import { configure, shallow } from "enzyme";

import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


// abc.test.js is important as React will automatically pick the file for test and "jest" library is used by default
// Enzyme allows us to just render any component standalone independent fo the other react application i.e. we don't need to
// render the complete react application.
configure({adapter: new ReactSixteenAdapter()})

describe('BurgerBuilder test', () => {

    let wrapper;

    beforeEach(() => {
        // TypeError: this.props.onInitingredients is not a function .... is the error you will get if you were not added
        // "onInitingredients" prop. 
        wrapper = shallow(<BurgerBuilder onInitingredients = {() => {}}/>);
    });

    it('should render <BuildControls /> when receiving inggredients (ing) props', () => {
        wrapper.setProps({ings: {salad: 0}});

        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});