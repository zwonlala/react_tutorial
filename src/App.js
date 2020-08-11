import React, {
  useRef,
  useReducer,
  useMemo,
  useCallback,
  createContext,
} from 'react';
import produce from 'immer';
import UserList from './UserList';
import CreateUser from './CreateUser';
// import Hello from './Hello';
// import Wrapper from './Wrapper';
// import Counter from './Counter';
// import InputSample from './InputSample';
// import useInputs from './useInputs';
import useInputs2 from './useInputs2';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중입니다...');
  return users.filter((user) => user.active).length;
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
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    // case 'CHANGE_INPUT':
    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value
    //     }
    //   };

    case 'CREATE_USER':
      return produce(state, (draft) => {
        draft.users.push(actiond.user);
      });
    // return {
    //   inputs: initialState.inputs,
    //   users: state.users.concat(action.user)
    // };

    case 'TOGGLE_USER':
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    // return {
    //   ...state,
    //   users: state.users.map( user =>
    //       user.id === action.id
    //       ? {...user, active: !user.active}
    //       : user
    //   )
    // };

    case 'REMOVE_USER':
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    // return {
    //   ...state,
    //   users: state.users.filter(user => user.id !== action.id)
    // };

    default:
      throw new Error('Unhandled action type');
  }
}

export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [state2, onChange, reset] = useInputs2({
  //   username: '',
  //   email: ''
  // });
  // const { username, email } = state2;
  // const nextId = useRef(4);
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

  // const onCreate = useCallback(() => {
  //   dispatch({
  //     type: 'CREATE_USER',
  //     user: {
  //       id: nextId.current,
  //       username,
  //       email
  //     }
  //   });
  //   nextId.current += 1;
  //   reset();
  // }, [username, email]);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
      // username={username}
      // email={email}
      // onChange={onChange}
      // onCreate={onCreate}
      />
      <UserList users={users} />
      <div>활성 사용자 수는 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
