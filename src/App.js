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
    setUsers(users.concat(user)); //위 문장과 동일한 문장!

    setInputs({
      username:"",
      email:""
    });
    nextId.current += 1; //기존 값에 1 추가
  }, [username, email, users]); //여기에 왜 users 추가??

  const onRemove = useCallback(id => {
    setUsers(users.filter(user => user.id !== id));
  }, [users]);

  const onToggle = useCallback(id => {
    setUsers(users.map(
        user => user.id === id
        ? {...user, active: !user.active } 
        : user
    ));
  }, [users]);

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
