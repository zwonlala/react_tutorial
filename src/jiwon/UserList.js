import React, { useRef } from 'react';

function User( { user, onRemove } ) { 
    const { name, email } = user;
    return (
        <div>
            <b>{name}</b> {email}
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
}


function UserList( { users, onRemove }) { 
    return (
        <>
            { users.map(  
                user => <User user={user} key={user.id} onRemove={onRemove}/>   
            )}
        </>
    );
}

export default UserList;