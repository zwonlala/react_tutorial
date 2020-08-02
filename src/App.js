import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
// import Hello from './Hello';
// import Wrapper from './Wrapper';
// import Counter from './Counter';
// import InputSample from './InputSample';

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중입니다...");
  return users.filter(user => user.active).length;
}

function App() {

  const [inputs, setInputs] = useState( {
    name: "",
    email: ""
  });
  const { username, email }  = inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name] : value
    })
  }, [inputs]);

  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);

  const onCreate = useCallback(() => { 
    const user = {
      id: nextId.current,
      username,
      email
    };
    // setUsers([...users, user]);
    setUsers(users => users.concat(user));
    //deps 배열에서 users 빼기위해 콜백함수의 파라미터로 users 등록

    setInputs({
      username:"",
      email:""
    });
    nextId.current += 1; 
  }, [username, email, /*users*/]); //users 제거

  const onRemove = useCallback(id => {
    setUsers(users => users.filter(user => user.id !== id));
    //deps 배열에서 users 빼기위해 콜백함수의 파라미터로 users 등록

  }, [/*users*/]); //users 제거

  const onToggle = useCallback(id => {
    //deps 배열에서 users 빼기위해 콜백함수의 파라미터로 users 등록
    setUsers(users => users.map(
        user => user.id === id
        ? {...user, active: !user.active } 
        : user
    ));
  }, [/*users*/]); //users 제거

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser 
        username={username} 
        email={email} 
        onChange={onChange} 
        onCreate={onCreate} 
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성 사용자 수는 : {count}</div>
    </>
  );
}

export default App;
