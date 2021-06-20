import React from 'react';
import { configure, shallow } from "enzyme";
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';


// abc.test.js is important as React will automatically pick the file for test and "jest" library is used by default
// Enzyme allows us to just render any component standalone independent fo the other react application i.e. we don't need to
// render the complete react application.
configure({adapter: new ReactSixteenAdapter()})

// shallow render the component but it's isn't deeply rendered. For example <NavigationItem /> will be rendered but it's content
// isn't rendered. So shallow helps us to render a component without rendering the whole subtree.
// describe('NavigationItems', () => {
    
//     // it() is used to wirte individual test
//     it('should render two naviagtion items if not authenticated', () => {
//         const wrapper = shallow(<NavigationItems />);

//         // "navigationItem" is not a JSX element, but a normal element.
//         expect(wrapper.find(NavigationItem)).toHaveLength(2);
//     });

//     it('should render three naviagtion items if authenticated', () => {
//         const wrapper = shallow(<NavigationItems isAuth />);

//         expect(wrapper.find(NavigationItem)).toHaveLength(3);
//     });
// })

// In above commented code, we have not used beforeEach() method
describe('NavigationItems', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    // it() is used to wirte individual test
    it('should render two naviagtion items if not authenticated', () => {
        
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three naviagtion items if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact logout button', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link = "/logout">Logout</NavigationItem>)).toEqual(true);
    });
})