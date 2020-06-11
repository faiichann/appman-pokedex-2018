
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import cute from '../cute.png'
import '../App.css'
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from 'react-bootstrap/Card'
import * as R from 'ramda';
import styled from 'styled-components';


const Progress = styled.progress`
height:30px;
border-radius:20px;
display: block;
background: #e4e4e4;
padding: 0px;
position:absolute;
box-shadow:#d4d4d4;

::-moz-progress-bar{
  border-radius:20px;
  background:#f3701a;
};
::-webkit-progress-bar{
  background:transparent;
};
::-webkit-progress-value{
  
  border-radius:20px;
  background:#f3701a;
}
`;


class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      text: false,
      selected: []
    };
  }

  select = (data) => {
    const newlist = this.state.list.filter(item => {
      return item.id !== data.id
    })
    this.setState({ list: newlist })
  }

  Strength = (item) => {

    if (item === undefined) {
      return 0;
    } else {
      const strength = R.multiply(item.length)(50)
      if (strength > 100) {
        return 100;
      } else {
        return strength;
      }
    }
  };
  Weak = (item) => {
    if (item === undefined) {
      return 0;
    } else {
      const weak = R.multiply(item.length)(100)
      if (weak > 100) {
        return 100
      } else {
        return weak;
      }

    }
  };

  Happiness = (item) => {
    let heal = null;
    let damage = null;
    let weak = null;

    if (this.props.item.hp >= 100) {
      heal = 100;
    } else {
      heal = 0;
    }
    if (item.weakness === undefined) {
      weak = 0;
    } else {
      weak = R.multiply(item.length)(100)
    }
    if (item.attacks === undefined) {
      damage = 0;
    } else {
      for (let i = 0; i < item.attacks.length; i++) {

        const damageLoop = item.attacks[i].damage.replace(/[^a-zA-Z0-9]/g, '');
        const intDamage = parseInt(damageLoop);
        damage = damage + intDamage
      }
    }
    let happy = R.divide((R.divide(heal)(10)) + (R.divide(damage)(10)) + 10 - (weak))(5)
    let happyArray = []
    for (let i = 0; i < happy; i++) {
      happyArray.push("")
    }

    return happyArray
  };

  show = () => {
    this.setState({
      text: true
    })
  }
  hide = () => {
    this.setState({

      text: false
    })
  }

  showtext = () => {

    if (this.state.text === false)
      return ''
    else
      return 'X'
  }


  render() {
    return (
      <div class="section group" style={{ width: "50%" }}>
        <div style={{ padding: "10px" }} class="col span_2_of_2">
          <Card style={{ width: '30rem', height: '19rem' }} onMouseOver={this.show} onMouseOut={this.hide} onClick={() => this.props.deleteSelected(this.props.item)}>
            <Card.Body style={{ padding: "10px" }}>
              <Grid container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item xs={6}>
                  <img class="pic" src={this.props.item.imageUrl} alt="picPokemon" />
                </Grid>
                <Grid item xs={6} style={{ fontSize: '10px' }}>
                  <p style={{ float: "right", color: "#ec5656", fontSize: '10px', cursor: "pointer" }}>{this.showtext()}</p>
                  <h1>{this.props.item.name} </h1>
                  <Grid container spacing={1}>
                    <Grid item xs={6}><p>HP : </p></Grid> <Grid item xs={6}><LinearProgress style={{ height: '20px', borderRadius: '10px' }} color="secondary" variant="determinate" value={this.props.item.hp >= 100 ? 100 : this.props.item.hp} /></Grid>
                    <Grid item xs={6}><p>Str:</p>  </Grid> <Grid item xs={6}><LinearProgress style={{ height: '20px', borderRadius: '10px' }} color="secondary" variant="determinate" value={this.Strength(this.props.item.attacks)} /></Grid>
                    <Grid item xs={6}><p> Weak:</p> </Grid> <Grid item xs={6}><LinearProgress style={{ height: '20px', borderRadius: '10px' }} color="secondary" variant="determinate" value={this.Weak(this.props.item.weaknesses)} /></Grid>
                  </Grid>
                  <h4> {this.Happiness(this.props.item).map(index => {
                    return <img class="smile" src={cute}></img>
                  })}</h4>
                </Grid>
              </Grid>
            </Card.Body>
          </Card>
        </div>

      </div>
    );
  }
}

export default MyList;