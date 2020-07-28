import React, { useState, useRef } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: '',
    }); {/*사용할 문자열들을 저장하는 객체 형태로 관리!*/}

    const { name, nickname } = inputs; {/*나중에 쓰기 편하게 비구조화 할당!*/}

    const nameInput = useRef();

    const onChange = (e) => { 
        // console.log(`${e.target.name}의 변한 값은 ${e.target.value}`); {/*어떤 input에서 값이 어캐 바뀌었는지 콘솔로그로 볼 수 있음 */}
        const { name, value }  = e.target;

        // //react에서 객체를 업데이트 할때는 기존의 객체를 복사해야 함!
        // const nextInputs = {
        //     ...inputs,
        //     [name]: value, //여기서 name 좌우에 대괄호로 씌우지 않으면, 문자열 name 자체가 들어가지게 됨...(?)
        //                 //-> 위에서 비구조화 할당한 inputs의 name과 동일한 name이 되어서 
        //                 //name input 태그를 수정해도, nickname input 태그를 수정해도 다 name으로 수정된 값이 update 됨.                
        //                 //∴ name을 대괄호로 감싸게 되면, 무엇을 가리키고 있느냐에 따라 다른 키 값이 변경됨.
        // };
        // // nextInputs[name] = value; //이렇게 하면 되는데 굳이 이렇게 다른 줄에서 할 필요 없이 위에서 처럼 nextInputs에서 바로 해줄 수 있음
        // setInputs(nextInputs); //이 문장을 통해 변경사항이 inputs에 적용!   
        
        //그리고 위에서 처럼 굳이 nextInputs 만들필요 없이 아래처럼 한번에 해도 됨!!
        setInputs({
            ...inputs,
            [name]: value,
        });

        // inputs[name] = value; //만약 setInputs 함수가 아니라 이렇게 값을 바꾼다고 하면, 화면에 변경된 값 적용이 하나도 안됨!!!
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        });
        nameInput.current.focus();
    };

    return (
        <div>
            <input 
                name="name" 
                placeholder="이름" 
                onChange={onChange} 
                value={name}
                ref={nameInput}
            />
            <input 
                name="nickname" 
                placeholder="닉네임" 
                onChange={onChange} 
                value={nickname}
            /> 
            <button onClick={onReset}>Reset</button>
            <div>
                <b>value: </b>
                {name} ({nickname})
            </div>
        </div>
    )
}

export default InputSample;