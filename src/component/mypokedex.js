import React, { Component } from "react";
import Newcard from "./newcard";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";


const Mypokedex = (props) => {
  
  if (props.myList.length === 0) {
    return <h1 style={{textAlign:'center'}}>Add your Pokedex</h1>;
  } else {
    return (
      <div className="MyList">
        <center><h1>My Pokedex</h1></center>
        <Paper style={{ maxHeight: 720, overflow: "auto" }}>
          {" "}
          <List style={{paddingBottom:20}}>
            {props.myList.map((item) => {
              return (
                <h1>
                  <Newcard item={item} deleteSelected={props.deleteSelected}/>
                </h1>
              );
            })}
          </List>
        </Paper>
      </div>
    );
  }
};

export default Mypokedex;
