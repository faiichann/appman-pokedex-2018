import React, { Component } from 'react'
import './App.css'
import cute from './cute.png'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from "@material-ui/core/Grid"
import Button from 'react-bootstrap/Button'
// import {search} from './search.png'
// import PokemonList from './component/pokemonlist'
// import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'
// import Mylist from './component/list'
// import AddIcon from "@material-ui/icons/Add";
// import Button from "@material-ui/core/Button";


// const COLORS = {
//   Psychic: "#f8a5c2",
//   Fighting: "#f0932b",
//   Fairy: "#c44569",
//   Normal: "#f6e58d",
//   Grass: "#badc58",
//   Metal: "#95afc0",
//   Water: "#3dc1d3",
//   Lightning: "#f9ca24",
//   Darkness: "#574b90",
//   Colorless: "#FFF",
//   Fire: "#eb4d4b"
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      modal: false,
      selected: []
    };
  }

  componentDidMount() {
    const data = fetch('http://localhost:3030/api/cards')
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.setState({
          cards: data.cards
        })
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  };

  // handleOpen = () => {
  //   this.setState({ modal: true });
  // };
  // handleClose = () => {
  //   this.setState({ modal: false });
  // };

  // setSelected = (data) => {
  //   this.setState({ selected: [...this.state.selected, data] });
  // };

  // deleteSelected = (data) => {
  //   const newselected = this.state.selected.filter(
  //     (item) => item.id !== data.id
  //   );

  //   this.setState({ selected: newselected });
  // };
  onSelectCard = (cards) => {
    this.props.setSelected(cards);
    this.props.deletedPokemonOnSelect(cards);
  };
  calStrength = (cards) => {
    
    if (cards === undefined) {
      return 0;
    } else {
      const strength = cards.length * 50;
      if (strength > 100) {
        return 100;
      } else {
        return strength;
      }
    }
  };
  calWeak = (cards) => {
    if (cards === undefined) {
      return 0;
    } else {
      const weak = cards.length * 100;
      if(weak > 100){
        return 100
      }else{
        return weak;
      }
     
    }
  };

  calHappiness = (cards) => {
    let heal = null;
    let damage = null;
    let weak = null;

    if (cards.hp >= 100) {
      heal = 100;
    } else {
      heal = 0;
    }
    if (cards.weakness === undefined) {
      weak = 0;
    } else {
      weak = cards.weakness.length * 100;
    }
    if(cards.attacks === undefined){
      damage =  0;
    }else{
      for(let i =0;i< cards.attacks.length;i++){
        
        const damageLoop = cards.attacks[i].damage.replace(/[^a-zA-Z0-9]/g, '');
        const intDamage =  parseInt(damageLoop);
        damage = damage +intDamage
      }
    }
    let happy = ((heal / 10) + (damage /10 ) + 10 - (weak)) / 5
    let happyArray = []
    for(let i = 0 ; i < happy ; i++){
       happyArray.push("")
    }
    console.log(damage)
    return happyArray
  };

  render() {
    return (
      <div className="App">

        <center><h1>My Pokedex</h1></center>
        {/* <form >
             <input type="text" id="myInput" onChange={(event)=> this.search(event)} placeholder="Search for names.." ></input> <button className="App"><img class="search" src={search}></img></button></form> */}
        {/* <Button
          onClick={this.handleOpen}
          variant="contained"
          color="primary"
          size="small"
          style={{width:'100%',height:'9%'}}
          startIcon={<AddIcon />}
        >
          Add
        </Button>

        <Mylist
          myList={this.state.selected}
          deleteSelected={this.deleteSelected}
        />

<Modal
          open={this.state.modal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            margin: "auto",
            paddingTop: 120,
            paddingLeft: 160,
            paddingRight: 160,
          }}
        >
          <PokemonList setSelected={this.setSelected} />
        </Modal> */}

<div class="div1" >
          {this.state.cards.map((cards,name)=>{
            console.log(cards)
            return( 

              <div style={{ padding: "20px" }}>
              <Grid container spacing={2}>
              <Grid item xs={6}>
        
              <img class="cardd"src={cards.imageUrl}></img>
              </Grid>
                <Grid item xs={6}><p>{cards.name}</p>
              <ul> 
              <li>
                 <p>hp:{cards.hp}<div ></div></p>
              </li>
              <li>
            <p>str:<LinearProgress variant="determinate" value={this.calStrength(cards.attacks)} /> </p>
              </li>
              <li>
                  <p>weak:<LinearProgress variant="determinate" value={this.calWeak(cards.weaknesses)}/></p>
              </li>
              <li>
              {this.calHappiness(this.state.cards).map(index =>{
              return  <img class="smile" src= {cute}></img>
            })} 
              </li>
             </ul>
          </Grid>
        </Grid>
      </div>
            )
          }
          )
          } 
        </div> 
        <div class="add"> <Button
              variant="contained"
              color="primary"
              onClick={() => this.onSelectCard(this.state.cards)}
            >
              Add
            </Button></div>
        
          </div>
     );
        }
};

export default App;