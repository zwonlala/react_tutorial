import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
// import Hello from './Hello';
// import Wrapper from './Wrapper';
// import Counter from './Counter';
// import InputSample from './InputSample';


function App() {

  const [inputs, setInputs] = useState( {
    name: "",
    email: ""
  });
  const { username, email }  = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name] : value
    })
  }

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

  const onCreate = () => { 
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
  }

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id));
  }

  const onToggle = id => {
    setUsers(users.map(
        user => user.id === id
        ? {...user, active: !user.active } 
        : user
    ));
  }


  return (
    <>
      <CreateUser 
        username={username} 
        email={email} 
        onChange={onChange} 
        onCreate={onCreate} 
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    </>
  );
}

export default App;
