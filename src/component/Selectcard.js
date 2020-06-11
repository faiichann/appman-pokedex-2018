
import React, { Component } from "react";
import Pokedex from "./Pokedex";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Search from '../search.png'
import '../App.css'
import Grid from "@material-ui/core/Grid";

class Listcard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      search: "", 
      filter: [] };
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
    const filterList = this.state.filter.length === 0 && !this.state.search ? this.props.list : this.state.filter
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
      <Paper style={{ maxHeight: 700 ,overflow: "auto", maxWidth: 700 }}>
        <Grid container direction="row" spacing={0} justify="center" >
          <Grid item xs={8} style={{ textAlign: "center" }}>
            <TextField
              id="outlined-basic"
              label="Find Pokemon"
              variant="outlined"
              style={{ width: "100%", margin:10 }}
              onChange={(event) => this.searchPokemon(event)}
            />
          </Grid>
          <p><img src={Search} style={{ display: "block", width: '50px', height: '50px', marginLeft: -40 }}></img></p>
        </Grid>
      </Paper>
      {this.renderList()}

    </div>;
  }
}

export default Listcard;
