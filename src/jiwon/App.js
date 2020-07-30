import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {

    const [input, setInput] = useState({
        name: '',
        email: ''
    });
    const { name, email } = input;
    const onChange = (e) => {
        const { name, value } = e.target;
        setInput({ 
            ...input,
            [name]: value,    
        });
    };

    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'asdf',
            email: 'asdf@asdf.com',
            active: true
        },
        {
            id: 2,
            name: 'aaaaaa',
            email: 'aaaaaa@aaaaa.com',
            active: false
        },
        {
            id: 3,
            name: 'bbbbbb',
            email: 'bbbbb@bbbbbb.com',
            active: false
        },
    ]);  
    const idCnt = useRef(4); 

    const onCreate= () => { 
        const newUser = {
            id: idCnt.current,
            name: name,
            email: email,
            active: false
        };
        setUsers(
            [...users, newUser] 
            // users.concat(newUser)
        );
        idCnt.current += 1;
        setInput({
            name: '',
            email: ''
        });
    }

    const onRemove = (id) => {
        setUsers(
            users.filter((user) => user.id !== id)
        );
    }

    const onToggle = (id) => {
        setUsers(
            users.map(user => 
                user.id === id //Failed to compile Error 발생
                //Line 69:17:  Expected an assignment or function call and instead saw an expression  no-unused-expressions
                ? {...user, active: !user.active} //여기 부분 active 업데이트 해주는 부분 헷갈림... 객체 표현 쓰는 부분...!
                : user
            )
        );
    };
    
    
    return (
        <>
            <CreateUser 
                name={name} 
                email={email} 
                onChange={onChange} 
                onCreate={onCreate} 
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
        </>
    );
}

export default App;