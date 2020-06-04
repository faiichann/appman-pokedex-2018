
import React, { Component } from "react";
import Pokedex from "./Pokedex";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Search from '../search.png'
import '../App.css'

class Listcard extends Component {
  constructor(props) {
    super(props);
    // Don't do this!
    this.state = {  search: "", filter: [] };
  }


  searchPokemon = (event) => {
    this.setState({ search: event.target.value.toLowerCase() });
    if (event.target.value.toLowerCase() === "") {
      this.setState({ filter: [] });
    } else {
      const namelist = this.props.list;
      const search = namelist.filter(({ name }) =>

        name.toLowerCase().includes(event.target.value.toLowerCase())
      );

      this.setState({ filter: search });
    }
  };

  deletedPokemonOnSelect = (data) => {

    const newFilter = this.state.filter.filter(item => {
      return item.id !== data.id
    })
    const namelist = this.props.list.filter(item => {
      return item.id !== data.id
    })
    this.props.newlist(namelist)
    this.setState({ filter: newFilter })

  }

  renderList = () => {
    const filterList = this.state.filter.length === 0 && !this.state.search ? this.props.list: this.state.filter
    if (filterList.length === 0) {
      return <Paper style={{ maxHeight: 720, overflow: "auto", maxWidth: 700 }}><center>No Pokemon Found</center></Paper>;
    } else {

      return (
        <div>

<Paper style={{ maxHeight: 710, overflow: "auto", maxWidth: 700 }}>
          
          <List>
            {filterList.map((item) => {
              return <Pokedex item={item} key={item.id} Selected={this.props.Selected} deletedPokemonOnSelect={this.deletedPokemonOnSelect} />;
            })}
          </List>
          </Paper>
        </div>
      );
    }
  };

  render() {
    return <div>
      <Paper style={{ maxHeight: 720, overflow: "auto", maxWidth: 700 }}>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          style={{ width: "80%", margin: 20 }}
          onChange={(event) => this.searchPokemon(event)}
          startIcon= {<img class="smile" src={Search}></img>}
          
        />
       
      </Paper>
      {this.renderList()}

    </div>;
  }
}

export default Listcard;


// import React, { Component } from "react"
// import Pokedex from "./Pokedex"
// import TextField from "@material-ui/core/TextField"
// import Paper from "@material-ui/core/Paper"
// import List from "@material-ui/core/List"
// import Search from '../search.png'
// import '../App.css'

// class Listcard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { search: " ", filter: [] };
//     }

//     Search = (event) => {
//         this.setState({ search: event.target.value.toLowerCase() });
//         if (event.target.value.toLowerCase() === "") {
//             this.setState({ filter: [] });
//         } else {
//             const name = this.props.listcard;
//             const search = name.filter(({ name }) =>
//                 name.toLowerCase().includes(event.target.value.toLowerCase())
//             );
//             this.setState({ filter: search });
//         }
//     };

//     removecard = (data) => {

//         const newFilter = this.state.filter.filter(item => {
//             return item.id !== data.id
//         })
//         const namelist = this.props.list.filter(item => {
//             return item.id !== data.id
//         })
//         this.props.newlist(namelist)
//         this.setState({ filter: newFilter })

//     }

//     showlist = () => {
//         const filterList = this.state.filter.length === 0 && !this.state.search ? this.props.listcard : this.state.filter
//         if (filterList.length === 0) {
//             return <Paper style={{ maxHeight: 720, overflow: "auto", maxWidth: 700 }}><center>No Pokemon Found</center></Paper>;
//         } else {

//             return (
//                 <div>

//                     <Paper style={{ maxHeight: 710, overflow: "auto", maxWidth: 700 }}>

//                         <List>
//                             {filterList.map((item) => {
//                                 return <Pokedex item={item} key={item.id} Selected={this.props.Selected} removecard={this.removecard} />;
//                             })}
//                         </List>
//                     </Paper>
//                 </div>
//             );
//         }
//     };

//     render() {
//         return <div>
//             <Paper style={{ maxHeight: 720, overflow: "auto", maxWidth: 700 }}>
//                 <TextField
//                     id="outlined-basic"
//                     label="Search"
//                     variant="outlined"
//                     style={{ width: "80%", margin: 20 }}
//                     onChange={(event) => this.Search(event)}
//                     startIcon={<img class="smile" src={Search}></img>}

//                 />

//             </Paper>
//             {this.showlist()}

//         </div>;
//     }
// }

// export default Listcard;

