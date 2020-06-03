// import React, { Component } from 'react'
// import '../App.css'
// import cute from '../cute.png'
// import LinearProgress from '@material-ui/core/LinearProgress'
// // import Grid from "@material-ui/core/Grid"
// import Card from 'react-bootstrap/Card'

// // import Button from 'react-bootstrap/Button'


// // import Container from 'react-bootstrap/Container'
// // import Row from 'react-bootstrap/Row'
// // import Col from 'react-bootstrap/Col'


// // import {search} from './search.png'
// // import PokemonList from './component/pokemonlist'
// // import Modal from 'react-bootstrap/Modal'
// // import Button from 'react-bootstrap/Button'
// // import Mylist from './component/list'
// // import AddIcon from "@material-ui/icons/Add";
// // import Button from "@material-ui/core/Button";


// class Listcard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cards: [],
//       modal: false,
//       selected: [],
//       text: false
//     };
//   }

//   componentDidMount() {
//     const data = fetch('http://localhost:3030/api/cards')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Success:', data);
//         this.setState({
//           cards: data.cards
//         })
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       })
//   };

//   calStrength = (cards) => {

//     if (cards === undefined) {
//       return 0;
//     } else {
//       const strength = cards.length * 50;
//       if (strength > 100) {
//         return 100;
//       } else {
//         return strength;
//       }
//     }
//   };
//   calWeak = (cards) => {
//     if (cards === undefined) {
//       return 0;
//     } else {
//       const weak = cards.length * 100;
//       if (weak > 100) {
//         return 100
//       } else {
//         return weak;
//       }

//     }
//   };

//   calHappiness = (cards) => {
//     let heal = null;
//     let damage = null;
//     let weak = null;

//     if (cards.hp >= 100) {
//       heal = 100;
//     } else {
//       heal = 0;
//     }
//     if (cards.weakness === undefined) {
//       weak = 0;
//     } else {
//       weak = cards.weakness.length * 100;
//     }
//     if (cards.attacks === undefined) {
//       damage = 0;
//     } else {
//       for (let i = 0; i < cards.attacks.length; i++) {

//         const damageLoop = cards.attacks[i].damage.replace(/[^a-zA-Z0-9]/g, '');
//         const intDamage = parseInt(damageLoop);
//         damage = damage + intDamage
//       }
//     }
//     let happy = ((heal / 10) + (damage / 10) + 10 - (weak)) / 5
//     let happyArray = []
//     for (let i = 0; i < happy; i++) {
//       happyArray.push("")
//     }
    
//     return happyArray
//   };

//   show = () => {
//     this.setState({
//       text: true
//     })
//   }
//   hide = () => {
//     this.setState({

//       text: false
//     })
//   }

//   showtext = () => {

//     if (this.state.text === false)
//       return ''
//     else
//       return 'Add'
//   }

// //   deletecard=(data)=>{
// //     const remove = this.state.remove.filter(cards => {
// //       return cards.id !== data.id
// //     })
// //     this.setState({filter:remove })
    
// //   }

// // delete=(cards)=>{
// //   this.props.deletecard(cards)
// // }

//   render() {
//     return (
//     <div class="scoll" >


//         {this.state.cards.map((cards, name) => {
         
//           return (<>

//             <Card style={{ width: '18rem' }} onMouseOver={this.show} onMouseOut={this.hide} onClick={()=>this.props.Add(cards)} >
//               {this.showtext()}
//               <Card.Body>
//                 <Card.Title><center><p>{cards.name}</p></center></Card.Title>
//                 <Card.Img variant="top" src={cards.imageUrl} />
//                 <Card.Text>

//                   <p>hp:<LinearProgress variant="determinate" value={cards.hp} /></p>

//                   <p>str:<LinearProgress variant="determinate" value={this.calStrength(cards.attacks)} /> </p>

//                   <p>weak:<LinearProgress variant="determinate" value={this.calWeak(cards.weaknesses)} /></p>

//                   {this.calHappiness(this.state.cards).map(index => {
//                     return <img class="smile" src={cute}></img>
//                   })}

//                 </Card.Text>
//               </Card.Body>
//             </Card>


//           </>
//           )
//         }
//         )
//         }
//       </div>
//     );
//   }
// };

// export default Listcard;

import React, { Component } from "react";
import Pokedex from "./pokedex";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Search from '../search.png'
import '../App.css'

class Listcard extends Component {
  constructor() {
    super();
    // Don't do this!
    this.state = { list: [], search: "" ,filter:[] , hasFetch: false};
  }

  getPokemonList = async () => {
    const list = await fetch("http://localhost:3030/api/cards");
    const res = await list.json();

    this.setState({ list: res.cards , hasFetch : true});
    
  };

  componentDidMount() {
    this.getPokemonList();
  }
  

  searchPokemon = (e) => {
    
    
    this.setState({ search: e.target.value });
    if (e.target.value === "") {
      this.setState({ filter: [] });
    } else {
     const newList = this.state.list; 
      const search = newList.filter(({ name }) =>
        name.includes(e.target.value)
      );
      
      this.setState({ filter: search });
    }
  };

  deletedPokemonOnSelect = (data) =>{
    
    const newFilter = this.state.filter.filter(item => {
      return item.id !== data.id
    })
    const newList = this.state.list.filter(item => {
      return item.id !== data.id
    })
    this.setState({filter:newFilter,list:newList})
    
  }
  
  renderList = () => {
    const filterList = this.state.filter.length === 0 ? this.state.list :  this.state.filter
    if (filterList.length === 0) {
      return <Paper style={{ maxHeight: 720, overflow: "auto",maxWidth:700 }}>No Pokemon Found</Paper>;
    } else {
        
      return (
        <div>
          <Paper style={{ maxHeight: 720, overflow: "auto" ,maxWidth:700}}>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              style={{ width: "80%", margin: 20 }}
              onChange={(e) => this.searchPokemon(e)}
            />
            <img class="smile" src={Search}></img>
            <List>
              {filterList.map((item) => {
                return <Pokedex item={item} key={item.id} setSelected={this.props.setSelected} deletedPokemonOnSelect={this.deletedPokemonOnSelect}/>;
              })}
            </List>
          </Paper>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderList()}</div>;
  }
}

export default Listcard;

