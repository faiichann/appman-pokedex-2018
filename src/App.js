
import React, { Component } from "react";
import "./App.css";
import Listcard from "./component/Selectcard";
import Modal from "@material-ui/core/Modal";
import Mypokedex from "./component/Mypokedex";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import {Button} from './style';


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
      modal: false,
      selected: [],
      list: []
    }
  }

  async componentDidMount() {
    const list = await fetch("http://localhost:3030/api/cards");
    const res = await list.json();
    this.setState({ list: res.cards });
  }

  OpenModal = (data) => {
    this.setState({ modal: true });
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
    this.setState({ list:[...this.state.list,data]})
    this.setState({ selected: newselected });
  };

  newlist = (list) => {
    this.setState({ list: list })
  };

  render() {
    return (
      <div className="App">

        <div className="back" >
          <Mypokedex
            myList={this.state.selected}
            deleteSelected={this.deleteSelected}
            username={this.props.two.name}
            changcolor={this.props.two.color}
          />
          <Button primary second onClick={() => {this.props.setname("I am Ironman","salmon")
          
          }}>Malware Changname</Button>
        </div>
        <Modal
          open={this.state.modal}
          onClose={this.CloseModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            margin: "auto",
            paddingTop: 10,
            paddingLeft: 160,
            paddingRight: 160,
            paddingBottom: 110,
            maxWidth: 700,
            maxHeight: 700
          }}
        >
          <Listcard Selected={this.Selected}
            list={this.state.list} newlist={this.newlist}  />
        </Modal>
        <AppBar position="fixed" color="secondary" style={{
          top: 'auto',
          bottom: 0,
          maxWidth: '1025px',
          position: 'absolute'
        }}>
          <Toolbar  >
            <Fab color="secondary"  style={{
              position: 'absolute',
              zIndex: 1,
              top: -30,
              left: 0,
              right: 0,
              margin: '0 auto',
            }} onClick={this.OpenModal} >
              <AddIcon />
            </Fab>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    one: state.one,
    two: state.two
  };
}

const mapDispatchtoProps = (dispatch) => {
  return {
    setname: (name,color) => {
      dispatch({
        type: "SETNAME",
        payload: {name,color}
      });
    }
  };
}

export default connect(mapStatetoProps, mapDispatchtoProps)(App);