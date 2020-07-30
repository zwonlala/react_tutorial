import React, { useRef } from 'react';

function User( { user } ) { 
    const { name, email } = user;
    return (
        <div>
            <b>{name}</b> {email}
        </div>
    );
}


function UserList( { users }) { 
    // console.log("송지원");
    // console.log(users);
    return (
        <>
            {users.map(  //Error 발생 : "TypeError: users.map is not a function"
                user => <User user={user} key={user.id}/>   
            )}
        </>
    );
}

export default UserList;