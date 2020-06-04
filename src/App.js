
import React, { Component } from "react";
import "./App.css";
import Listcard from "./component/Selectcard";
import Modal from "@material-ui/core/Modal";
import Mypokedex from "./component/Mypokedex";
import Button from "@material-ui/core/Button";

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
  constructor() {
    super();
    this.state = { modal: false, selected: [],list: [] };
  }

  pokedexdata = async () => {
    const list = await fetch("http://localhost:3030/api/cards");
    const res = await list.json();
    this.setState({ list: res.cards });

  };

  componentDidMount() {
    this.pokedexdata();
   
  }

  OpenModal = (data) => {
    
    this.setState({ modal: true});
  };
  CloseModal = () => {
    this.setState({ modal: false });
  };

  Selected = (data) => {
    this.setState({ selected: [...this.state.selected, data] });
  };

  deleteSelected = (data) => {
    const newselected = this.state.selected.filter(
      (item) => item.id !== data.id
    
    );
    this.setState({list:[...this.state.list,data]})
    this.setState({ selected: newselected });
  };

newlist=(list)=>{

  this.setState({list:list})
}

  render() {
    return (
      <div className="App">
         
      <div class="back" >
        <Mypokedex
          myList={this.state.selected}
          deleteSelected={this.deleteSelected}
        />
        </div>
       
        <Modal
          open={this.state.modal}
          onClose={this.CloseModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            margin: "auto",
            paddingTop: 35,
            paddingLeft: 160,
            paddingRight: 160,
            paddingBottom:100,
            maxWidth:700
          }}
        >
          <Listcard Selected={this.Selected}
          list={this.state.list} newlist={this.newlist} />
        </Modal> 
      
        
        <div class= " add" >
        <center><Button class="button circle"
          onClick={this.OpenModal}>
        <p >+ ADD </p>
        </Button>
        </center>
        </div>
      </div>
    );
  }
}

export default App;

// import React, { Component } from 'react'
// import './App.css'
// import Selectcard from "./component/Selectcard";
// import Modal from "@material-ui/core/Modal";
// import Mypokedex from "./component/Mypokedex";
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

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       modal: false,
//       selectedcard: [],
//       listcard: []
//     }
//   }
//   // componentDidMount() {
//   //       const data = fetch('http://localhost:3030/api/cards')
//   //         .then(response => response.json())
//   //         .then(data => {
//   //           console.log('Success:', data)
//   //           this.setState({listcard: data.cards})
//   //         })
//   //         .catch((error) => {
//   //           console.error('Error:', error)
//   //         })
//   //     }

//   Pokedexdata = async () => {
//     const list = await fetch("http://localhost:3030/api/cards")
//     const res = await list.json()
//     this.setState({ listcard: res.cards })
//   }

//   componentDidMount() {
//     this.Pokedexdata()
//   }

//   OpenModal = (data) => {
//     this.setState({ modal: true });
//   }

//   CloseModal = () => {
//     this.setState({ modal: false });
//   }

//   Selected = (data) => {
//     this.setState({ selectedcard: [...this.state.selectedcard, data] });
//   }

//   deletecard = (data) => {
//     const deleteSelected = this.state.selectedcard.filter(
//       (item) => item.id !== data.id
//     );
//     this.setState({ listcard: [...this.state.listcard, data] })
//     this.setState({ selectedcard: deleteSelected })
//   }

//   newlist = (list) => {
//     this.setState({ listcard: list })
//   }

//   render() {
//     return (
//       <div className="App">

//         <div class="้back" >
//           <Mypokedex
//             listcard={this.state.selectedcard}
//             deletecard={this.deletecard}
//           />
//         </div>

//         <Modal
//           open={this.state.modal}
//           onClose={this.CloseModal}
//           aria-labelledby="simple-modal-title"
//           aria-describedby="simple-modal-description"
//           style={{
//             margin: "auto",
//             paddingTop: 35,
//             paddingLeft: 160,
//             paddingRight: 160,
//             paddingBottom: 100,
//             maxWidth: 700
//           }}
//         >
//           <Selectcard Selected={this.Selected}
//             listcard={this.state.listcard} newlist={this.newlist} />
//         </Modal>

//         <div class="add" >
//           <center>
//             <Button class="button circle"
//               onClick={this.OpenModal}>
//               <p >+ ADD </p>
//             </Button>
//           </center>
//         </div>
//       </div>
//     )
//   }
// }

// export default App
