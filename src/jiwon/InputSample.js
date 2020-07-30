import React, { useState } from 'react';

function InputSample() {
    const [input, setInput] = useState('');

    const onChange = e => {
        // console.log(e.target);
        // console.log(`${e.target}'s change : ${e.target.value}`);
        const { value } = e.target;
        setInput(value);
    }

    const onReset = () => {
        setInput('');
    }

    return (
        <div>
            <input onChange = { onChange } value={input}/> {/*input에 value 설정하는 거 까먹음 */ }
            <button onClick = { onReset }>초기화</button> { /*초기화 버튼 까먹음 */ }
            <div>
                <b>입력: </b>
                {input}
            </div>  
        </div>
    )
}

export default InputSample;