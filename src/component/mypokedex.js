import React, { Component } from "react";
import Newcard from "./Newcard";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";


const Mypokedex = (props) => {
  
  if (props.myList.length === 0) {
    return <h1 style={{textAlign:'center'}}>Add your Pokedex</h1>;
  } else {
    return (
      <div className="MyList">
        <center><h1>My Pokedex</h1></center>
        <Paper style={{ maxHeight: 650, overflow: "auto"  }}
        >
          {" "}
          <List style={{paddingBottom:10}}>
            {props.myList.map((item) => {
              return (
                <h1>
                  <Newcard  item={item} deleteSelected={props.deleteSelected}/>
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

// import React, { Component } from "react";
// import Newcard from "./Newcard";
// import Paper from "@material-ui/core/Paper";
// import List from "@material-ui/core/List";

// //show card was selected 
// const Mypokedex = (props) => {

//     if (props.listcard.length === 0) {
//         return <h1 style={{ textAlign: 'center' }}>Add your Pokedex</h1>;
//     } else {
//         return (
//             <div className="listcard">
//                 <center><h1>My Pokedex</h1></center>
//                 <Paper style={{ maxHeight: 650, overflow: "auto" }}>
//                     {" "}
//                     <List style={{ paddingBottom: 10 }}>
//                         {props.listcard.map((item) => {
//                             return (
//                                 <h1>
//                                     <Newcard item={item} deletecard={props.deletecard} />
//                                 </h1>
//                             );
//                         })}
//                     </List>
//                 </Paper>
//             </div>
//         );
//     }
// };

// export default Mypokedex;
