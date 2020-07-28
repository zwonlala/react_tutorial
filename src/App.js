import React, { useRef } from 'react';
import UserList from './UserList';
// import Hello from './Hello';
// import Wrapper from './Wrapper';
// import Counter from './Counter';
// import InputSample from './InputSample';


function App() {

  const users = [
    {
      id: 1,
      username: 'jiwon',
      email: 's26788761@naver.com'
    },
    {
      id: 2,
      username: 'unknown',
      email: 'unknown@gmail.com'
    },
    {
      id: 3,
      username: 'stella',
      email: 'jang@naver.com'
    }
  ];

  const nextId = useRef(4); //초기값을 4로 설정

  const onCreate = () => { //새로운 원소를 추가하는 함수
   
    console.log(nextId.current);
    nextId.current += 1; //기존 값에 1 추가
  }



  return (
    <UserList users={users}/>
  );
}

export default App;
