import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Counter2 from './jiwon/Counter2';
import InputSample from './jiwon/InputSample';
import UserList from './jiwon/UserList';
import App from './jiwon/App';

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  // <Counter />,
  // <InputSample/>,
  // <UserList/>,
  // <App />, //복구!
  <Counter2 />,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
