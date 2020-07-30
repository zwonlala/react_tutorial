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
    const onCreate= () => { 
        const newUser = {
            id: idCnt.current,
            name: name,
            email: email
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
    
    return (
        <>
            <CreateUser 
                name={name} 
                email={email} 
                onChange={onChange} 
                onCreate={onCreate} 
            />
            <UserList users={users} onRemove={onRemove}/>
        </>
    );
}

export default App;