// import React, { Component,useState } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import Modal from '@material-ui/core/Modal'
// import Form from 'react-bootstrap/Form'
// import Listcard from './listcard'
// // import Modal from 'react-bootstrap/Modal'
// // import Button from 'react-bootstrap/Button'

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
//   }

//   function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();

//     return {
//       top: `${top}%`,
//       left: `${left}%`,
//       transform: `translate(-${top}%, -${left}%)`,
//     };
//   }

//   const useStyles = makeStyles((theme) => ({
//     paper: {
//       position: 'absolute',
//       width: 400,
//       backgroundColor: theme.palette.background.paper,
//       border: '2px solid #000',
//       boxShadow: theme.shadows[5],
//       padding: theme.spacing(2, 4, 3),
//     },
//   }));



// function Example(props) {

//     const classes = useStyles();
//     // getModalStyle is not a pure function, we roll the style only on the first render
//     const [modalStyle] = React.useState(getModalStyle);
//     const [open, setOpen] = React.useState(false);

//     const handleOpen = () => {
//       setOpen(true);
//     };

//     const handleClose = () => {
//       setOpen(false);
//     };


//     // search =(event)=>{
//     //   this.setState({search: event.targat.value})
//     // }


//     const body = (
//       <div style={modalStyle} className={classes.paper}>
//         <h2 id="simple-modal-title">search: <Form.Control type="namae" placeholder="search name" onChange={(event)=> this.search(event)} /></h2>
//         <p id="simple-modal-description">

//           <Listcard Add={props.Add}/> 

//         </p>
//         <Example />
//       </div>
//     );

//     return (
//       <>
//       <div>
//       <button type="button" onClick={handleOpen}>
//         Open Modal
//       </button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         {body}
//       </Modal>
//     </div>
//         {/* <Button variant="primary" onClick={handleShow}>
//           Launch demo modal
//         </Button>

//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Modal heading</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleClose}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal> */}
//       </>
//     );
//   }

//   export default Example

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import cute from '../cute.png'
import '../App.css'
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from 'react-bootstrap/Card'
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

const MyList = (props) => {

  const calStrength = (item) => {
    console.log(item);
    if (item === undefined) {
      return 0;
    } else {
      const strength = item.length * 50;
      if (strength > 100) {
        return 100;
      } else {
        return strength;
      }
    }
  };
  const calWeak = (item) => {
    if (item === undefined) {
      return 0;
    } else {
      const weak = item.length * 100;
      if (weak > 100) {
        return 100
      } else {
        return weak;
      }

    }
  };

  const calHappiness = (item) => {
    let heal = null;
    let damage = 100;
    let weak = null;

    if (item.hp >= 100) {
      heal = 100;
    } else {
      heal = 0;
    }
    if (item.weakness === undefined) {
      weak = 0;
    } else {
      weak = item.weakness.length * 100;
    }
    let happy = ((heal / 10) + (damage / 10) + 10 - (weak)) / 5
    let happyArray = []
    for (let i = 0; i < happy; i++) {
      happyArray.push("")
    }
    return happyArray
  };


  return (
    <div className="MyList">
        <div style={{ padding: "20px" }}>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img src={props.item.imageUrl} alt="picPokemon" />
            </Grid>
            <Grid item xs={6}>
              <h4>{props.item.name}</h4>
              <p>HP : {props.item.hp}</p>
              <p>Str : <LinearProgress color="secondary" variant="determinate" value={calStrength(props.item.attacks)} /></p>
              <p>Weak : <LinearProgress color="secondary" variant="determinate" value={calWeak(props.item.weaknesses)} /></p>
              <p>{calHappiness(props.item).map(index => {
                return <img class="smile" src={cute}></img>
              })}</p>
              <Button variant="contained" color="primary" onClick={() => props.deleteSelected(props.item)}>
                Delete
            </Button>
            </Grid>
          </Grid>

        </div>
    </div >
  );
};

export default MyList;
