import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {Provider} from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { green } from '@material-ui/core/colors'


//Multi state
const initialState = {
    result: 15000,
    value: []
  }
  //Muti Reducer
  const SecondReducer = (state = { name: "faii", age: 20,color:"orange" }, action) => {
    switch (action.type) {
      case "SETNAME":
        state = {
          ...state,
          name: action.payload.name,
          color: action.payload.color

        }
        break;
      case "SETAGE":
        state = {
          age: action.payload
        }
  
        break;
      default:
    }
    return state;
  }
  
  const FristReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD":
        state = {
          ...state,
          result: state.result += action.payload,
          value: [...state.value, action.payload]
        }
        break;
  
      case "DELETE":
        state -= action.payload;
        break;
      default:
    }
    return state;
  
  }
  
  const mylogger = (store) => (next) => (action) => {
    console.log("log action", action);
    next(action);
  }
  
  const store = createStore(combineReducers({ one:FristReducer, two:SecondReducer }), {}, applyMiddleware(mylogger))
  store.subscribe(() => {
    console.log("Update store:", store.getState());
  })


ReactDOM.render(
    <Provider store={store}>
    <App />,
</Provider>,
document.getElementById('root'))
