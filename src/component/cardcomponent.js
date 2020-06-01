import React, { Component } from 'react'  
import './App.css'
import card from './cards.json'

class card extends Component {
   
    render() {
      return (
        <div className="card">
          <h1>{this.props.cards}</h1>
          <card id="card" >name:</card>
            <ul>
                <li>
                    <p>name:</p>
                </li>
                <li>
                    <p>hp:</p>
                </li>
                <li>
                    <p>attacks:</p>
                </li>
            </ul>
        </div>
      )
    }
  }

  export default cardcomponent