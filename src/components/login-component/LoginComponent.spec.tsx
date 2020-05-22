import * as React from 'react';
import LoginComponent, { ILoginProps } from './LoginComponent';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { FormControl } from '@material-ui/core';

const props: ILoginProps = {
    //@ts-ignore
    authUser: null as User,
    loginAction: jest.fn()
}

const loginComponent = <LoginComponent {...props} />;
const wrapper = mount(<LoginComponent { ...props}/>);   

describe('<LoginComponent />', () => {

    const setState = jest.fn();
    const useStateMock: any = (init: any) => [init, setState];

    describe('Rendered from', () => {
         /* 
            {..props} isequivalent to:

            authUser = {props.authUser}
            errorMessage = {props.errorMessage}
            loginAction = {props.loginAction}

            */ 

        it('Renders without error', () => {
            //expect that the component should render and contain content
            expect(wrapper.exists()).toBeTruthy();
        });

        it ('Renders 5 FormControl components', () => {
            //wrapper.find(selector) - finds all nodes matching the selector type
            expect(wrapper.find(FormControl)).toHaveLength(2);
        })

        it('Renders 5 input elements', () => {
            expect(wrapper.find('input')).toHaveLength(2);
        });

        it('Renders a button elements', () => {
            expect(wrapper.find('button')).toHaveLength(1);
        });
    })

    describe('Input fields will update value onChange', () => {

        let wrapper: ReactWrapper;

        beforeEach(() => {
            wrapper = mount(loginComponent);
        });

        it('should update #username value when change event triggered', () => {
            wrapper.find('input#username').simulate('change', {
                target: { value: 'new-username'}
            });

            expect(wrapper.find('input#username').prop('value'))
            .toEqual('');
        });

        it('should update #password value when change event triggered', () => {
            wrapper.find('input#password').simulate('change', {
                target: { value: 'new-password'}
            });

            expect(wrapper.find('input#password').prop('value'))
            .toEqual('');
        });

        it('should call prop loginAction when button is clicked', () => {
            wrapper.find('button').simulate('click');
            expect(props.loginAction).toHaveBeenCalled();
        });
    });

    describe('state management', () => {
        afterEach(() => {
            jest.clearAllMocks();
        })

        it('calls setState when #username changed', () => {
            jest.spyOn(React, 'useState').mockImplementation(useStateMock);

            const wrapper = mount(loginComponent);

            wrapper.find('input#username').simulate('change', {
                target: {value: 'Abby'}
            });

            expect(setState).toHaveBeenCalledWith('');
        });

        it('calls setState when #password changed', () => {
            jest.spyOn(React, 'useState').mockImplementation(useStateMock);

            const wrapper = mount(loginComponent);

            wrapper.find('input#password').simulate('change', {
                target: {value: 'Mitch'}
            });

            expect(setState).toHaveBeenCalledWith('');
        });
    })
});