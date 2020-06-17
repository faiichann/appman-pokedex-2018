// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import {Provider} from 'react-redux'

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(  <Provider store={store}>
//     <App />,
// </Provider>,div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { mount, shallow} from "enzyme";
import App,{mapStatetoProps,mapDispatchtoProps} from "./App";

Enzyme.configure({ adapter: new Adapter() });

test('the data is crad', async () => {
  const data = await fetch("http://localhost:3030/api/cards");
  const res = await data.json();
  expect(res.cards.length).toEqual(20);
});

test('the fetch fails with an error', async () => {
  // const data = await fetch("http://localhost:3030/apkhi/cardggs");
  // const res = await data.json();
  // await expect(res).rejects.toThrow('error');
  // expect.assertions(1);
  try {
    await fetch("http://localhost:3030/apikjm/cardsuhnuhy");
  } catch (e) {
    console.log(e)
    expect(e).toMatch('error');
  }
});

test('test mapstate', () => {
  var state = {}
  expect(mapStatetoProps(state)).toEqual({ one: state.one, two: state.two })
})

test('test dispatch', () => {
  var dispatch = jest.fn()
  var name = 'jyku'
  var color ="red"
  mapDispatchtoProps(dispatch).setname(name,color)
  expect(dispatch.mock.calls[0][0]).toEqual({ "payload":{"name":"jyku" ,"color":"red"} ,"type": "SETNAME" })
})

