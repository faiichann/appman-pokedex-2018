import React from 'react';
import { shallow,mount } from 'enzyme';
import Enzyme from "enzyme";
import {Button} from './style'
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() });

it('Button style',() =>{
    const wrapper = mount(<Button primary />);
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('background','palevioletred')
    }); 
