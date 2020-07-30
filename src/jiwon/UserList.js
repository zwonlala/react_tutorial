import React, { useRef } from 'react';

function User( { user, onRemove, onToggle } ) { 
    const { name, email, active, id } = user;
    const nameStyle = {
        color: active? "green" : "black", //green과 black "green" "black"으로 나타내야 함!
        cursor: 'pointer'
    };
    return (
        /* 여기 그 마우스 커서 손가락으로 바꾸는거 기억 안남. */
        <div onClick={() => onToggle(id)} > {/*TypeError: onToggle is not a function 에러 발생*/}
        {/* props 보내줄 때, "onToggle={onToggle}" 이렇게 보내주지 않고 "onToggle" 이렇게만 보내줘서 위 TypeError 발생하였음! */}
            <b style={nameStyle}>{name}</b> {email}
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
}


function UserList( { users, onRemove, onToggle }) { 
    return (
        <>
            { users.map(  
                user => <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}/>   
            )}
        </>
    );
}

export default UserList;