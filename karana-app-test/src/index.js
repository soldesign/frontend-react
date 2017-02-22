import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';



var USERS = [
  {name: 'Micha', email: 'micha@ex.de'},
  {name: 'Steffen', email: 'steffen@ex.de'},
  {name: 'Frank', email: 'frank@ex.de'},
  {name: 'Setu', email: 'setu@ex.de'},
  {name: 'Tobias', email: 'tobias@ex.de'},
];
 

var KARANAS = [
  {name: 'MichasKarana', owner: 'Micha', link: 'https://grafana.me-soldesign.com'},
  {name: 'MichasKarana2', owner: 'Micha', link: 'https://grafana.me-soldesign.com'},
  {name: 'SteffensKarana', owner: 'Steffen', link: 'https://grafana.me-soldesign.com'},
  {name: 'FranksKarana', owner: 'Frank', link: 'https://grafana.me-soldesign.com'},
  {name: 'SetusKarana', owner: 'Setu', link: 'https://grafana.me-soldesign.com'},
  {name: 'TobiasKarana', owner: 'Tobias', link: 'https://grafana.me-soldesign.com'},
];


ReactDOM.render(
  <App users={USERS} karanas={KARANAS}/>,
  document.getElementById('root')
);
