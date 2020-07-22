#### 이 문서는 [fastcampus 강의](https://www.fastcampus.co.kr/dev_online_react/) 를 듣고 정리한 문서입니다. 문제가 있을 경우 <s26788761@naver.com> 으로 문의주세요! 😀

### 04. React Component

리액트 컴포넌트를 만들때는 상단에 
> import React from 'react';  //리액트를 불러와 사용하겠다

컴포넌트는 **함수형**, **클래스형** 두가지

컴포넌트 이름은 대문자로 시작 

그리고 중간중간 문장 끝날때마다 세미콜론은 취향~

그리고 맨 마지막엔 

> export default Hello; //Hello라는 컴포넌트를 만들어 내보내주겠다

컴포넌트는 일종의 UI 조각 && 재사용 가능


<br><br><br><br>

### 05. JSX rules

JSX는 리액트에서 컴포넌트의 생김새?를 정의할 때 사용하는 문법

우리가 JSX로 작성한 코드는 Babel이라는 도구를 통해 JS 코드로 바뀐다!!

[Babel 이란...?]()

Babel을 통해 React 안의 createElement라는 함수를 통하여 컴포넌트를 만들는 것! 
매번 컴포넌트를 만들때마다 creteElement를 호출해서 작업을 하면 어려우니(귀찮으니?) 우리가 JSX로 작성을 하면 Babel이라는 도구를 통하여 변환해주는 것!

<br><br>

### JSX rules

#### 1. 태그는 꼭 닫혀 있어야 한다

태그를 열고 닫지 않으면 에러가 발생

input이나 br 태그같지 닫지 않고 쓰는 태그들에 대해서는 \<input />, \<br />와 같이 **self closing tag**를 사용하면 된다!

<br><br>

#### 2. 2개 이상의 태그는 꼭 하나의 태그로 감싸 주어야 한다.

컴포넌트에서 return을 할때 두개 이상의 태그를 그냥 리턴하면, 에러가 발생  
-> 하나의 태그로 감싸서 리턴해야 한다!!

- 빈 \<div> 태그로 감싸기
- <> ~~~ </> (**fragment**)로 감싸기  
(만약 빈 \<div> 태그로 감싸는게 싫다면 **fagment** 사용할 수 있다. **fragment** 사용 시 HTML 상에 아무것도 안나타남!)

**\+** return 문 사용할때 괄호로 감싸는 것은 가독성(같은 레벨에 있게 하기 위해)을 위해 하는 것 (필수 아님!!)

<br><br>

#### 3. JSX 내부에서 JS 값을 사용할 때는 { }로 감싼다.

```JSX
//생략...
  const name = "jiwon";
  return (
    <>
      <div>name</div> //"name" 출력
      <div>{name}</div> //"jiwon" 출력
    </>
  );
//생략...
```

<br><br>

#### 4. JSX 내부에서 inline style을 적용할 때는 객체를 사용한다.


```JSX
<div style="background: black;">name</div>
```
기존 HTML에서는 문자열로 설정을 하지만

JSX에서는 객체를 사용하여 설정

```JSX
const style = {
  //"background-color" 처럼 대쉬(-)로 구분되어 있는 경우는 camelCase로 명명
  backgroudColor: 'black', 
  color: 'aqua',
  fontSize: 24, //camelCase 적용, 숫자일시 기본단위는 px
  padding: '1rem' //단위를 따로 설정하고 싶으면 문자열로 설정
}
```

그리고 위에서 설정한 style객체를 적용시킬때는,

```JSX
<div style={style}> {name} </div>
```
<br>

**\+** 그리고 JSX는 태그에 class를 적용시킬 때, className으로 적용해야 함.

```JSX
<div class="~~~"></div> //적용은 되나 콘솔창에 워닝 뜸!
<div className="~~~"></div> //good~ 
```

<br><br>

#### 5. JSX에서 주석을 사용할때

JSX 내부에서 주석을 사용할 때는 중괄호로 감싸고,

컴포넌트 내부(tag를 여는 부분, self closing tag)에서 사용할때는 그냥 사용해도 된다


```JSX
return (
  <>
    { /*주석1*/ }
    <Hello
      //주석2
    />
    <div
      //주석3
    >
    </div>
  </>
);
```

<br><br><br><br>

### 06. props

#### 1. props

props는 properties의 준말

컴포넌트를 사용할때 특정 값을 전달해주고 싶을때 사용함!

전달한 props는 객체 형태로 리턴함

값을 전달할 때는,
```JSX
<Hello name="react"/>
```
이렇게 사용하면 되고,

값을 전달받은 해당 컴포넌트에서는 

```JSX
function Hello(props) {
  console.log(props); // {name: "react"} 출력
  retur n <div> 안녕하세요 {props.name} </div>;
}
```

**+** props를 입력받을 때, 비구조화 할당 사용해서 편하게 쓸수도 있다!

<br><br>

#### 2. default props

만약 특정 값을 빼먹었을때, 기본적으로 사용할 값

```JSX
function Hello({ color, name }) {
    return <div style={{
        color
    }}>안녕하세요 {name}</div>;
}

Hello.defaultProps = {
    name: '이름없음'
};
```

<br><br>

#### 3. children props

컴포넌트 안에 넣는 값을 조회하기 위해 사용하는 것이 props children
(태그와 태그 사이에 넣는 내용을 의미하는게 children!)

```JSX
function Wrapper({ children }) {
    const style = {
        border: "2px solid black",
        padding: 16
    };

    return <div style={style}>{children}</div>;
    //{children}에 <Hello /> 컴포넌트 두개 들어감!
}
```


```JSX
function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red"/>
      <Hello color="gray"/>
    </Wrapper>
  );
}
```

<br><br><br><br>


### 07. 조건부 렌더링

조건부 렌더링이란, 특정 조건이 참인지 거짓인지에 따라 다른 것을 보여주는 것

#### 1. 삼항연산자 사용  
->  true or false 일때, 다른 결과값을 보여줌  
 ∴ 내용이 달라져야 할 때 사용함!!

```JSX
function Hello({ color, name, isSpecial }) {
  return (
    <div>
      { isSpecial ? <b>*</b> : null }
      안녕하세요 {name} 
    </div>
  );
}
```

**+** JSX에서 null, false, undefined를 출력하면 아무것도 안나옴! but false의 한 값인 0은 숫자 0 출력!!

<br><br>

#### 2. && 연산자 사용  
-> 단순히 어떤 값을 숨기거나 넣어줄 때는 && 연산자 이용.  
≈ short-circuit evalution

```JSX
function Hello({ color, name, isSpecial }) {
  return (
    <div>
      { isSpecial  && <b>*</b> }
      안녕하세요 {name}
    </div>
  );
}
```

**+** 컴포넌트로 boolean 값 넣어줄때, 이름만 넘겨주고 값 설정 안할 시 true 값 넘겨준 것과 동일.

```JSX
//위 아래가 모두 동일
<Hello name="react" color="red" isSpecial={true}/>
<Hello name="react" color="red" isSpecial/>
```

<br><br><br><br>


### 08. useState를 통한 동적 상태 관리

**`useState`** 는 Hooks 중 하나로 이 함수를 사용하면 함수형 컴포넌트에서도 상태(state) 관리를 할 수 있다.

<br>

우선 맨 위에서 

```JSX
import React, { useState } from "react";
```

와 같이  **`useState`** 함수를 import 하고

<br>

컴포넌트 내에서
```JSX
const [number, setNumber] = useState(0);
```

위 문장의 의미는   
`우리가 number라는 상태를 만들건데, 그 상태의 기본값은 0이고,`  
`옆에 있는 setNumber는 상태를 바꿔주는 함수`  
라고 의미하는 것!!

<br>

원래라면 아래와 같이 작성해야 하지만, 배열 비구조화 할당을 통해 위와 같이 쓸 수 있다!!

```JSX
const numberState = useState(0);
const number = numberState[0];
const setNumber = numberState[1];
```
**`useState`** 가 호출하면 배열을 반환하게 하는데,   
첫번째 원소를 number이라는 변수에 추출하고,    
두번째 원소를 setNumber이라는 변수에 추출하겠단 의미!

<br><br>


#### ∴ 정리!
바뀌는 값을 **`useState`** 함수를 통해 관리 할 수 있고,

관리할 값의 기본값은 **`useState`** 함수의 파라미터로 넣어주면 된다.

그리고 **`useState`** 함수를 배열을 반환하게 되는데,   
첫번째 원소는 현재 상태,    
그리고 두번째 원소는 이 상태를 바꾸는 함수이다.

리턴받은 함수에다가 새로운 상태를 넣어 호출하면 상태가 바뀌게 된다.

<br>

**+** 리턴받은 함수에다가 새로운 상태(**값**)을 넣어서 호출하는 것이 아니라, 어떻게 상태를 변화시킬 것인지 설명한 함수(**업데이트 함수**)를 넣어 호출할 수 도 있다.   
업데이트 함수를 사용하는 것이 리액트 컴포넌트를 최적화 하는데 더 효과적이다! 

```JSX
//위아래 실행문 동일한 결과를 냄!
setNumber(number + 1);
setNumber(pervNumber => pervNumber + 1);
```

<br><br><br><br>

### 09.Rect에서 input 상태 관리하기

```JSX
import React, {useState} from 'react'; //지난 강의에서 배운 useState 함수 import

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
  );
}

export default InputSample;
```

여기서 `<input onChange={onChange} value={text}/>` 이 문장에서 `value={text}` 설정을 안해주면 리셋 버튼 눌러도 input 태그는 변화 없음!


<br><br><br><br>

### 10.Rect에서 여러개의 input 상태 관리하기

저번 예시와 다르게 이번엔 인풋을 여러개 관리해야 하는 상황이다!

이때 처음 드는 생각은 useSate 함수와 onChange 함수를 여러번 정의하고 쓰면 되는거 아닌가 하는 생각인데 그것은 가장 최선의 방법은 아니다!

가장 좋은 방법은 **input에 name이라는 값을 설정하고, 이벤트가 발생했을 때, 그 값을 참조하는 것!!!**

그리고 useState 함수가 이전에는 그냥 문자열을 관리해줬던것과 달리 이번엔 **여러개의 문자열을 가지고 있는 객체 형태를 관리**해줘야함!

<br><br>


우선 밑에 리턴하는 JSX 코드부분을 이렇게 고친다.

```JSX
return (
  <div>
    <input placeholder="이름" />
    <input placeholder="닉네임" /> 
    <button onClick={onReset}>Reset</button>
    <div>
      <b>value: </b>
      이름 (닉네임)
    </div>
  </div>
);
```

<br>

위에서 말할 것 같이 여러개의 문자열을 가지고 있는 객체 형태로 관리해야 하기 때문에 아래와 같이 수정한다!

```JSX
const [inputs, setInputs] = useState({
  name: '', 	//사용할 문자열들을 저장하는 객체 형태로 관리!
  nickname: '',
}); 

const { name, nickname } = inputs; //그리고 나중에 쓰기 편하게 비구조화 할당!
```

<br>

그리고 input tag에 name 속성을 각각 부여한다  
(∵ onChange 함수에서 **e.target.name**을 조회하면 사용자가 name input tag를 수정하였는지, nickname input tag를 수정하였는지 알 수 있다!)

그리고 input tag의 onChange 속성에 onChange 함수 설정
```JSX
<input name="name" placeholder="이름" onChange={onChange} />
<input name="nickname" placeholder="닉네임" onChange={onChange} /> 
```

<br>

그리고 onChange 함수와 onReset 함수를 설정해준다.

```JSX
const onChange = (e) => { 
  const { name, value }  = e.target;
  
  setInputs({
    ...inputs,
    [name]: value,
  });
};

const onReset = () => {
  setInputs({
    name: '',
    nickname: '',
  });
};
```

<br><br>

이때 주의해야 할 점은 **`객체 상태를 업데이트 해줄 때`** 에는 `기존의 객체 상태를 복사`해놓은 다음, `그 값에서 특정 값을 덮어씌운 다음`, `그 값을 새로운 상태로 설정`해줘야 함!! 

이렇게 하는 것을 **`불변성을 지킨다`** 고 표현을 함

불변성을 지켜줘야만, 리엑트 컴포넌트에서 상태가 업데이트 되었음을 감지할 수 있고, 이에따라 필요한 렌더링이 발생하게 됨!!


그리고 `inputs[name] = value;`  
만약 setInputs 함수가 아니라 이렇게 값을 바꾼다고 하면, 화면에 변경된 값 적용이 하나도 안됨!!!

<br><br>

### 최종 코드

```JSX
import React, { useState } from 'react';

function InputSample() {

  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  }); 

  const { name, nickname } = inputs; 

  const onChange = (e) => { 
    const { name, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    });
  };

  return (
    <div>
      <input
        name="name" 
        placeholder="이름" 
        onChange={onChange} 
        value={name}
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
```

<br><br>

**∴ 객체의 상태를 업데이트 할때는 ...(스프레드 연산자)를 사용하여 현재 객체 상태를 받아오고, 특정 값을 변경하여서 상태를 업데이트 해줘야 한다!**

+그리고 불변성을 지켜줘야만 나중에 컴포넌트 업데이트 성능을 최적화 해줄 수 있다!!


<br><br><br><br>
