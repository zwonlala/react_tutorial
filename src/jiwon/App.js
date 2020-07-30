import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {

    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'asdf',
            email: 'asdf@asdf.com'
        },
        {
            id: 2,
            name: 'aaaaaa',
            email: 'aaaaaa@aaaaa.com'
        },
        {
            id: 3,
            name: 'bbbbbb',
            email: 'bbbbb@bbbbbb.com'
        },
    ]);  
    const idCnt = useRef(4); 
    const onCreate= () => { //onCreate 잘못 구현
        const newUser = {
            id: idCnt.current,
            name: name,
            email: email
        };

        setUsers(
            // ...users,
            // newUser
            //위 두문장은 왜 안되는지...?
            // -> 당연히 안됨!! ...users로 배열을 풀었는데(?) 크게 다시 배열로 묶어주지 않았으니
            //    users가 더이상 배열형태를 유지하지 못해서 users.map에서 에러가 났던 것!!

            [...users, newUser] //이렇게 스프레드 연산자 쓰거나, 
            // users.concat(newUser) //이렇게 concat 함수 쓰거나 해야함
        );
       
        idCnt.current += 1;
        //onCreate 끝나고 input setInput해서 초기 상태로 만들어 주는 거 빼먹음
        setInput({
            name: '',
            email: ''
        });
    }

    const [input, setInput] = useState({
        name: '',
        email: ''
    });
    const { name, email } = input;
    const onChange = (e) => {
        const { name, value } = e.target;
        // console.log(`\n${name}에서 변화가 발생한 값:${value}`);
        // console.log(input);
        setInput({ 
            //여기서 에러 났는데 뭐가 문제인지 모르겠음
            // -> setInput 함수의 인자로는 객체를 보내야 하는데, 
            //    중괄호로 묶지 않아 에러 발생하였음.
            //https://stackoverflow.com/questions/57149326/error-the-type-cast-expression-is-expected-to-be-wrapped-with-parenthesis-when
            ...input,
            [name]: value,    
        });
        // console.log(input);
    };
    
    return (
        <>
            <CreateUser 
                name={name} 
                email={email} 
                onChange={onChange} 
                onCreate={onCreate} 
                id={idCnt.current}
            />
            <UserList users={users}/>
        </>
    );
}

export default App;