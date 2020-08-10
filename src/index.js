import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import Counter2 from './jiwon/Counter2';
import InputSample from './jiwon/InputSample';
import UserList from './jiwon/UserList';
import Counter from './Counter';
// import ContextSample from './ContextSample';
// import App from './jiwon/App';

ReactDOM.render(
  // <React.StrictMode>
  // <Counter />,
  // </React.StrictMode>,
  // <Counter />,
  // <InputSample/>,
  // <UserList/>,
  <App />, 
  // <ContextSample />,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
