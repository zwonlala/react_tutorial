import React, { useState } from 'react'; //useState 이름 헷갈림

function Counter(){
    const [number, setNumber] = useState(0); //앞에 const 안붙임
    
    const onIncrease = () => {
        // console.log("+1");
        // setNumber(number + 1);
        setNumber( prevNumber => prevNumber + 1);
    }
    const onDecrease = () => {
        // console.log("-1");
        // setNumber(number - 1);
        setNumber( prevNumber => prevNumber - 1);
    }
    return ( 
        <div>
            { number }
            <div>
                <button onClick={onIncrease}>+1</button>
                <button onClick={onDecrease}>-1</button>
            </div>
        </div>
    )
}

export default Counter;
