import React, { Component } from 'react'
import './App.css'
import cute from './cute.png'
import search from './search.png'


const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      attacks:[{name:[]},{damage:[]}]
    };

  }

  componentDidMount(){
   const data= fetch('http://localhost:3030/api/cards')
   .then(response => response.json())
   .then(data => {
    console.log('Success:', data);
    this.setState({cards:data.cards
    })
  })
  .catch((error) => {
    console.error('Error:', error);
  })
  }

  search = event =>{
  
    console.log(event.target.value)

  }
  

  render() {
    return (
      <div className="App">
        
        <center><h1>My Pokedex</h1></center>
        <form >
             <input type="text" id="myInput" onChange={(event)=> this.search(event)} placeholder="Search for names.." ></input> <button className="App"><img class="search" src={search}></img></button></form>
        <div class="row1">
        <div class="div1" >
          {this.state.cards.map((cards,name)=>{
            console.log(cards)
            return( 

          <div class="container">
<div class="row">
            <div  class="card">
        
                <div class="col-1"><img class="cardd"src={cards.imageUrl}></img></div>
                <div class="col-7"><p>{cards.name}</p>
              <ul> 
              <li>
                 <p>hp:{cards.hp}<div ></div></p>
              </li>
              <li>
            <p>str:{cards.damage} </p>
              </li>
              <li>
                  <p>weak:</p>
              </li>
              <li>
                  <img class="smile" src= {cute}></img>
              </li>
             </ul>
            </div>
                </div>
                </div> 
        </div>
            )
          }
          )
          } 
        </div> 
        <div class="add"><button class="plus" onClick={document.getElementsByClassName}>+</button></div>
              </div>
       
    
           
      </div>
    )
  }
}

export default App

