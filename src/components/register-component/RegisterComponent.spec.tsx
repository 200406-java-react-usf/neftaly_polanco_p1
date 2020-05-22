import * as React from 'react';
import RegisterComponent, {IRegisterProps} from './RegisterComponent';
import { mount, ReactWrapper } from 'enzyme';
import { FormControl } from '@material-ui/core';


const props: IRegisterProps = {
    authUser: undefined,
    errorMessage: '',
    registerAction: jest.fn()

}

const registerComponent = <RegisterComponent {...props} />;
let wrapper = mount(<RegisterComponent { ...props}/>);   

describe('<RegisterComponent />', () => {

    const setState = jest.fn();
    const useStateMock: any = (init: any) => [init, setState];

    describe('Rendered from', () => {
         /* 
            {..props} isequivalent to:

            authUser = {props.authUser}
            errorMessage = {props.errorMessage}
            registerAction = {props.registerAction}

            */ 

        it('Renders without error', () => {
            //expect that the component should render and contain content
            expect(wrapper.exists()).toBeTruthy();
        });

        it ('Renders 6 FormControl components', () => {
            //wrapper.find(selector) - finds all nodes matching the selector type
            expect(wrapper.find(FormControl)).toHaveLength(6);
        })

        it('Renders 6 input elements', () => {
            expect(wrapper.find('input')).toHaveLength(6);
        });

        it('Renders a button elements', () => {
            expect(wrapper.find('button')).toHaveLength(1);
        });
    })

    describe('Input fields will update value onChange', () => {

        let wrapper: ReactWrapper;

        beforeEach(() => {
            wrapper = mount(registerComponent);
        });

        it('should update #firstName value when change event triggered', () => {
            wrapper.find('input#firstName').simulate('change', {
                target: { value: 'new-firstName'}
            });

            expect(wrapper.find('input#firstName').prop('value'))
            .toEqual('new-firstName');
        });

        it('should update #lastName value when change event triggered', () => {
            wrapper.find('input#lastName').simulate('change', {
                target: { value: 'new-lastName'}
            });

            expect(wrapper.find('input#lastName').prop('value'))
            .toEqual('new-lastName');
        });

        it('should call prop registerAction when button is clicked', () => {
            wrapper.find('button').simulate('click');
            expect(props.registerAction).toHaveBeenCalled();
        });
    });

    describe('state management', () => {
        afterEach(() => {
            jest.clearAllMocks();
        })

        it('calls setState when #firstName changed', () => {
            jest.spyOn(React, 'useState').mockImplementation(useStateMock);

            const wrapper = mount(registerComponent);

            wrapper.find('input#firstName').simulate('change', {
                target: {value: 'Abby'}
            });

            expect(setState).toHaveBeenCalledWith('Abby');
        });

        it('calls setState when #lastName changed', () => {
            jest.spyOn(React, 'useState').mockImplementation(useStateMock);

            const wrapper = mount(registerComponent);

            wrapper.find('input#lastName').simulate('change', {
                target: {value: 'Mitch'}
            });

            expect(setState).toHaveBeenCalledWith('Mitch');
        });
    })
});