import React, { useRef } from 'react';

function User( { user } ) { 
    const { name, email } = user;
    return (
        <div>
            <b>{name}</b> {email}
        </div>
    );
}


function UserList() {
    const users = [
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
    ]
    
    const useRefVar = useRef(4);

    const onCreate = () => {
        console.log(`이번에 생성된 원소의 id는 ${useRefVar.current} 입니다`);
        useRefVar.current += 1;
    }
    return (
        <>
            {users.map( 
                user => <User user={user} key={user.id}/>   
            )}
            <button onClick={onCreate}>생성</button>
        </>
    );
}

export default UserList;