import React, { Component } from "react";
import Newcard from "./Newcard";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Mypokedex = (props) => {

  if (props.myList.length === 0) {
    return <h1 style={{ textAlign: 'center' }}>Add your Pokedex</h1>;
  } else {
    return (
      <div className="MyList">
        <center><h1>My Pokedex</h1></center>
        <Paper style={{ maxHeight: 670, overflow: "auto" }}
        >
          <Grid container direction="row" spacing={0} justify="center" >
            {" "}

            <div style={{ paddingBottom: 10 ,width:"100%",display:"flex",flexDirection:"row",flexWrap:"wrap"}} >
              {props.myList.map((item) => {
                return (
                    <Newcard item={item} deleteSelected={props.deleteSelected} />     
                );
              })}
            </div>
          </Grid>
        </Paper>
      </div>
    );
  }
};

export default Mypokedex;