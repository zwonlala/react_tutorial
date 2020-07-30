import React from 'react';

function CreateUser({ name, email, onChange, onCreate, id }) {

    return (
        <div>
            <input name="name" value={name} placeholder="이름" onChange={onChange}/>
            <input name="email" value={email} placeholder="이메일" onChange={onChange}/>
            <button onClick={onCreate}>생성</button>
        </div>
    );
}

export default CreateUser;