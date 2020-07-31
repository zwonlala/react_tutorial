import React, { useState } from 'react';

function Counter2() {
    const [count, setCount] = useState(0);

    function handleAlertClick() {
        setTimeout(() => {
            alert('you clicked on: ' + count);
        }, 3000);
    }

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click ME</button>
            <button onClick={handleAlertClick}>Show alert</button>
        </div>
    );
}

export default Counter2;