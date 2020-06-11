import styled from 'styled-components';

export const Progress = styled.progress`
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

