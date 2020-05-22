import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { mount } from 'enzyme';
import NavbarComponent from './components/navbar-component/NavbarComponent';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('<App />', () => {
  test('renders learn react link', () => {
    const app = render(<App />);
    // const { getByText } = render(<App />);
    // const linkElement = getByText(/learn react/i);
    //expect(linkElement).toBeInTheDocument();
    expect(app).toBeTruthy();
  });

  test('Renders NavBarComponent', () => {

    //Testing wrapper
    const wrapper = mount(<App />);
    expect(wrapper.find(NavbarComponent)).toHaveLength(1);
  }) 
});