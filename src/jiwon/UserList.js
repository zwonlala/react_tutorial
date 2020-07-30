import React from 'react';

function User( { user } ) { //props 받을때 {} 중괄호로 묶어야 하는거 까먹음
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
    return (
        <>
            {users.map( 
                user => <User user={user} key={user.id}/> //map 함수 사용하고 key 설정하는거 까먹음
                // (user, index) => <User user={user} key={index}/>
            )}
        </>
    );
}

export default UserList;