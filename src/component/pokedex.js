import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import cute from '../cute.png'
import '../App.css'
import Card from 'react-bootstrap/Card'
import * as R from 'ramda';
import {Progress} from '../style'

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      text: false
    }
  }

  onSelectCard = (item) => {
    this.props.Selected(item)
    this.props.deletedPokemonOnSelect(item)
  };

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
  }

  Weak = (item) => {
    if (item === undefined) {
      return 0;
    } else {
      const weak = R.multiply(item.length)(100)
      if (weak > 100) {
        return 100
      } else {
        return weak
      }
    }
  }

  Happiness = (item) => {
    let heal = null
    let damage = null
    let weak = null

    if (this.props.item.hp >= 100) {
      heal = 100
    } else {
      heal = 0
    }
    if (item.weakness === undefined) {
      weak = 0
    } else {
      weak = R.multiply(item.weakness.length)(100)
    }
    if (item.attacks === undefined) {
      damage = 0
    } else {
      for (let i = 0; i < item.attacks.length; i++) {
        const damageLoop = item.attacks[i].damage.replace(/[^a-zA-Z0-9]/g, '')
        const intDamage = parseInt(damageLoop)
        damage = damage + intDamage
      }
    }
    let happy = R.divide((R.divide(heal)(10)) + (R.divide(damage)(10)) + 10 - (weak))(5)
    let happyArray = []
    for (let i = 0; i < happy; i++) {
      happyArray.push("")
    }
    return happyArray
  }

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
      return 'ADD'
  }


  render() {
    return (
      <div style={{ padding: "20px" }}>
        <Card style={{ width: '40rem' }}  onMouseOver={this.show} onMouseOut={this.hide} onClick={() => this.onSelectCard(this.props.item)} >
          <Card.Body style={{ padding: "10px",margin:"2px"}}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <img src={this.props.item.imageUrl} alt="picPokemon" />
              </Grid>
              <Grid item xs={6}>
                <p style={{ float: "right", color: "#ec5656", cursor: "pointer" }}>{this.showtext()}</p>
                <h1>{this.props.item.name}</h1>
                <Grid container spacing={0}>
                  <Grid item xs={6}><p>HP : </p></Grid> <Grid item xs={6}><Progress value={this.props.item.hp >= 100 ? 100 : this.props.item.hp} max="100" ></Progress></Grid>

                  <Grid item xs={6}><p>Str:</p>  </Grid> <Grid item xs={6}><Progress value={this.Strength(this.props.item.attacks)} max="100" /></Grid>

                  <Grid item xs={6}><p> Weak:</p> </Grid> <Grid item xs={6}><Progress value={this.Weak(this.props.item.weaknesses)} max="100" /></Grid>
                </Grid>
                <h4> {this.Happiness(this.props.item).map(index => {
                  return <img className="smile" src={cute}></img>
                })}</h4>
              </Grid>
            </Grid>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Pokedex

