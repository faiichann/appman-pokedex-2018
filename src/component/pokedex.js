import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import cute from '../cute.png'
import '../App.css'
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from 'react-bootstrap/Card'


class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      list: [], 
      text: false }
  }

  onSelectCard = (item) => {
    this.props.Selected(item)
    this.props.deletedPokemonOnSelect(item)
  };

  calStrength = (item) => {
    if (item === undefined) {
      return 0;
    } else {
      const strength = item.length * 50
      if (strength > 100) {
        return 100;
      } else {
        return strength;
      }
    }
  }

  calWeak = (item) => {
    if (item === undefined) {
      return 0;
    } else {
      const weak = item.length * 100
      if (weak > 100) {
        return 100
      } else {
        return weak
      }
    }
  }

  calHappiness = (item) => {
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
      weak = item.weakness.length * 100
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
    let happy = ((heal / 10) + (damage / 10) + 10 - (weak)) / 5
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
        <Card style={{ width: '40rem' }} className="aAASa" onMouseOver={this.show} onMouseOut={this.hide} onClick={() => this.onSelectCard(this.props.item)} >
          <Card.Body style={{ padding: "5px" }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <img src={this.props.item.imageUrl} alt="picPokemon" />
              </Grid>
              <Grid item xs={6}>
                <p style={{ float: "right", color: "#ec5656",cursor:"pointer" }}>{this.showtext()}</p>
                <h1>{this.props.item.name}</h1>
                <Grid container spacing={0}>
                  <Grid item xs={6}><p>HP : </p></Grid> <Grid item xs={6}><LinearProgress style={{ height: '30px', borderRadius: '20px'}} color="secondary" variant="determinate" value={this.props.item.hp >= 100 ? 100 : this.props.item.hp} /></Grid>
                  <Grid item xs={6}><p>Str:</p>  </Grid> <Grid item xs={6}><LinearProgress style={{ height: '30px', borderRadius: '20px' }} color="secondary" variant="determinate" value={this.calStrength(this.props.item.attacks)} /></Grid>
                  <Grid item xs={6}><p> Weak:</p> </Grid> <Grid item xs={6}><LinearProgress style={{ height: '30px', borderRadius: '20px' }} color="secondary" variant="determinate" value={this.calWeak(this.props.item.weaknesses)} /></Grid>
                </Grid>
                <h4> {this.calHappiness(this.props.item).map(index => {
                  return <img class="smile" src={cute}></img>
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

