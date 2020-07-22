import React, {useState} from 'react';

function InputSample() {
    const [text, setText] = useState("");

    const onChange = (e) => {
        // console.log(e.target.value);
        setText(e.target.value);
    }

    const onReset = () => {
        setText("");
    }
    return (
        <div>
            <input onChange={onChange} value={text}/>
            <button onClick={onReset}>Reset</button>
            <div>
                <b>value: </b>
                {text}
            </div>
        </div>
    )
}

export default InputSample;