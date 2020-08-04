import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
// import Hello from './Hello';
// import Wrapper from './Wrapper';
// import Counter from './Counter';
// import InputSample from './InputSample';
import useInputs from './useInputs';

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중입니다...");
  return users.filter(user => user.active).length;
}

const initialState = {
  // inputs: {
  //   name: "",
  //   email: ""
  // },
  users: [
    {
      id: 1,
      username: 'jiwon',
      email: 's26788761@naver.com',
      active: true,
    },
    {
      id: 2,
      username: 'unknown',
      email: 'unknown@gmail.com',
      active: false,
    },
    {
      id: 3,
      username: 'stella',
      email: 'jang@naver.com',
      active: false,
    }
  ]
};

function reducer(state, action) {
  switch(action.type) {
    // case 'CHANGE_INPUT':
    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value
    //     }
    //   };

    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };

    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map( user => 
            user.id === action.id
            ? {...user, active: !user.active}
            : user
        )
      };

    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };

    default :
     throw new Error('Unhandled action type');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({
    username: '',
    email: ''
  });
  const { username, email } = form;
  const nextId = useRef(4);
  const { users } = state;
  // const { username, email } = state.inputs;

  // const onChange = useCallback( e => {
  //   const { name, value } = e.target;
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     name,
  //     value
  //   })
  // }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
    reset();
  }, [username, email]);

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    })
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    })
  }, []);
  
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList 
        users={users}
        onToggle={onToggle}
        onRemove={onRemove}
       />
      <div>활성 사용자 수는 : {count}</div>
    </>
  );
}

export default App;
