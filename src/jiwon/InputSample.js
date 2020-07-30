import React, { useState } from 'react';

function InputSample() {
    const [input, setInput] = useState({
        name: '',
        email: ''
    });
    const { name, email } = input;

    const onChange = e => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    const onReset = () => {
        setInput({
            name: '',
            email: ''
        });    
    };

    return (
        <div>
            <input 
                name='name' 
                placeholder='이름' 
                onChange = { onChange } 
                value = { name } //input 태그에 value 설정하는 거 까먹음 
            /> 
            <input 
                name='email' 
                placeholder='이메일'
                onChange={ onChange } 
                value={ email } //input 태그에 value 설정하는 거 까먹음
            /> 

            <button onClick ={ onReset }>초기화</button> 
            <div>
                <b> { name } :</b>
                ({ email })
            </div>  
        </div>
    )
}

export default InputSample;