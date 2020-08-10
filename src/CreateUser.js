import React, { useContext, useRef } from 'react';
import { UserDispatch } from './App';
import useInputs from './useInputs';

function CreateUser() {
    const [form, onChange, reset] = useInputs({
        username: '',
        email: ''
    });
    const { username, email } = form;
    const dispatch = useContext(UserDispatch);
    const nextId = useRef(4);
    return (
        <div>
            <input 
                name="username" 
                placeholder="계정명" 
                onChange={onChange} 
                value={username} 
            />
            <input
                name="email" 
                placeholder="이메일" 
                onChange={onChange} 
                value={email} 
            />
            <button onClick={() => {
                dispatch({
                    type: 'CREATE_USER',
                    user: {...form, id: nextId.current}
                })
                nextId.current += 1;
                reset();
            }
            }>등록</button>
        </div>
    )
};

export default React.memo(CreateUser);