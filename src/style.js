import styled from 'styled-components';
import { props } from 'ramda';

export const Progress = styled.progress`
height:30px;
border-radius:20px;
display: block;
background: #e4e4e4;
padding: 0px;
position:relative;
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


export const Button = styled.button`
  /* Adapt the colors based on primary prop */
  /**ส่งprops เชคว่าเป็น primary หรือไม่ให้แสดงผล ถ้าไม่ :  */
  background: ${props => props.primary ? "palevioletred" : "white"}; 
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor:pointer;

  ${
    props => props.second && `
          &hover{
            background-color: #000;
            color:#fff;
          } 
      `
    }
 
`;