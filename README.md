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





### 11. useRef로 특정 DOM 선택하기


HTML과 JS를 사용할때, DOM에 접근하거나 선택할 일이 있으면, [`getElementById`](https://developer.mozilla.org/ko/docs/Web/API/Document/getElementById)나 [`querySelector`](https://developer.mozilla.org/ko/docs/Web/API/Document/querySelector) 등의 DOM selector 함수를 사용함.

React를 사용하는 경우에서도 특정 DOM에 접근할 일이 있다.   

- 특정 엘리먼트의 크기/위치를 알아낼 때, 
- 스크롤 바의 위치를 가져오거나 설정할 때, 
- focus를 설정해야할 때, 
- Video.js(비디오 관련 라이브러리)등 HTML5 비디오 관련 라이브러리를 사용할 때, 
- D3, Chart.js와 같은 그래프 관련 라이브러리를 사용하게 될 때    
-> 특정 DOM에 라이브러리 설정해야 함

<br>

이럴때, React에서는 `ref`라는 것을 사용하고,   
함수형 컴포넌트에서는 **`useRef`** 라는 훅 함수를 사용한다.   
클래스형 컴포넌트에서는 `React.createRef()`라는 함수를 사용.    
여기선 함수형 컴포넌트일때 사용하는 **`useRef`** 함수만 알아봄!   

<br>

우리가 이전에 만든 InputSample 컴포넌트에서는 초기화 버튼을 누르고 나면, 포커스가 계속 '초기화' 버튼에 남아있음.    
이 부분을 '초기화' 버튼을 누르고 나서 '이름' input 태그로 포커스가 이동하게 변경해보자.

<br>

이렇게 바꾸기 위해서는 React 자체적인 기술로는 뭔가 할 수 있는게 없어, 직접 DOM에 접근을 해야 한다.

DOM에 직접 접근하기 위해서는

먼저 **`useRef`** 함수를 불러옴.

```JSX
import React, { useState, useRef } from 'react'; //새로 'useRef' 함수 불러옴
```

그리고 코드 상단에

```JSX
const nameInput = useRef(); 
```
라고 nameInput 객체를 선언.   
그리고 만들어진 nameInput 객체를 우리가 선택해주고 싶은 DOM에 설정해준다.

```JSX
<input 
  name="name" 
  placeholder="이름" 
  onChange={onChange} 
  value={name}
  ref={nameInput} //이렇게 설정!
/>
```

여기까지 하고 나면 우리가 원하는 DOM에 직접 접근할 수 있는데, 


```JSX
const onReset = () => {
  setInputs({
    name: '',
    nickname: '',
  });

  nameInput.current.focus(); //이렇게 접근할 수 있다.
};
```
위와 같이 쓸 수 있다.  
 
`nameInput.current.focus();` 이 문장을 해석해보면,   

`nameInput.current` 까지가 해당 DOM을 가리키게 되고,    

그 다음 DOM API 중 하나인 `focus()` 함수를 사용하여 우리가 원하는 기능을 구현할 수 있다.

<br><br>

**+** **`useRef`** 함수의 기능으로 이렇게 DOM에 접근하는 것 말고도, 렌더링과 관련이 없는 변수를 관리할 수 있는데, 이 기능은 다음에 알아봄! 😀 


<br><br><br><br>




### 12. 배열 컨트롤1 (배열 렌더링)

어떠한 정보가 객체 형태로 담겨져 있는 배열을 화면에 뿌려줘야할 땐 어캐 해야할까..?

이러한 정보가 있다고 할때, 
```JSX
const users = [
  {
    id: 1,
    username: 'jiwon',
    email: 's26788761@naver.com'
  },
  {
    id: 2,
    username: 'unknown',
    email: 'unknown@gmail.com'
  },
  {
    id: 3,
    username: 'stella',
    email: 'jang@naver.com'
  }
```

<br><br>

우선 제일 무식하고, 비효율적으로 작성해 보겠다.

```JSX
return (
  <div>
    <div>
      <b>{users[0].username}</b> <span>{users[0].email}</span>
    </div>
    <div>
      <b>{users[1].username}</b> <span>{users[1].email}</span>
    </div>
    <div>
      <b>{users[2].username}</b> <span>{users[2].email}</span>
    </div>
  </div>
);
```

이렇게 작성을 하면, 각 user를 출력하는 부분이 반복된다.

<br><br>

이 반복되는 부분을 수정하기 위해 새로운 User 컴포넌트를 만들어 반복되는 부분을 넣으면

```JSX
function User( { user }) {
  return (
    <div>
      <b>{user.username}</b> <span>{user.email}</span>
    </div>
  );
}
```
이렇게 새로운 User 컴포넌트가 만들어지고,

```JSX
return (
  <div>
    <User user={users[0]} />
    <User user={users[1]} />
    <User user={users[2]} />
  </div>
);
```
UserList 컴포넌트를 이렇게 수정해줄 수 있다!

<br><br>

이렇게 하면 만약 배열의 크기가 고정적이라면 문제가 없지만, user의 수가 동적으로 변할 때, 대응을 해줄 수 없다.

그럴땐, JS 배열의 내장함수 **`map`** 을 사용한다!!!

**`map`** 함수를 이용해서 객체 배열 형태로 있는 배열을, 컴포넌트 엘리먼트 형태의 배열로 바꿔주면 된다!

```JSX
return (
  <div>
    {
      users.map( 
        user => <User user={user}/>
      )
    }
  </div>
)
```

이렇게 하면 기존의 코드와 동일하게 화면에 보이고, 또 배열의 크기가 변하더라도 문제없이 화면에 뿌려줄 수 있다.

<br><br>

**`map`** 함수를 사용할때, 위에서 처럼만 쓰면 콘솔창에 워닝이 뜨는데, 

![스크린샷 2020-07-28 오후 3 26 03](https://user-images.githubusercontent.com/13375734/88627113-bff85580-d0e6-11ea-8322-fdac3c672650.jpg)


`각 child(User 컴포넌트)는 key라는 prop이 있어야 한다`고 나온다.

이 **key** 라는 prop은 각 원소들마다 고유값을 줌으로서 원소들이 추가, 삭제, 업데이트 될때, 어떤 원소가 변형되었는지 판단할 수 있게 해주는 것이다! 그 결과 리렌더링 성능을 최적화 할 수 있다.

지금 같은 경우에는 id 라는 데이터로 각 User를 구분할 수 있으니,

```JSX
users.map(
  user => <User user={user} key={user.id}/>
)
```

다음과 같이 `user.id` 값을 **key** prop으로 넣어주어야 한다!

<br>

**+** 또 만약 `user.id` 같이 각 배열 원소를 구분할 수 있는 데이터가 없다면,

```JSX
users.map(
  (user, index) => <User user={user} key={index}/>
);
```
위와 같이 **`map`** 함수의 콜백함수의 두번째 파라미터인 index 변수를 사용하여 **key** prop을 설정해줄 수 있고, 워닝을 피할 수 있다!

하지만 위와 같은 경우에서는 위에서 언급한 리렌더링 성능을 개선하진 않고, 워닝만 피하는 코드이니 꼭! 꼭! 꼭! id 같이 원소를 구분할 수 있는 정보가 있으면 해당 값을 **key** prop에 적용해야 한다!

<br><br>

### 정리!!

- 배열을 렌더링 할 때는 **key**를 설정해 주어야 효율적으로 렌더링 할 수 있다.

- 고유값이 없는 경우에는 **key** 값 위치에 index를 넣어줄 수 있지만, 비효율 적이다.
(데이터가 몇개 없거나, 업데이트가 자주 일어나지 않는다면 ㄱㅊ..?)

<br><br><br><br>

### 13. useRef로 컴포넌트 안의 변수 만들기

이번에는 [이전 시간에 배운 **`useRef`**](https://github.com/zwonlala/react_tutorial#11-useref%EB%A1%9C-%ED%8A%B9%EC%A0%95-dom-%EC%84%A0%ED%83%9D%ED%95%98%EA%B8%B0)를 활용해 컴포넌트 안에 변수를 만드는 법에 대해 설명

<br>

만약 컴포넌트 안에서 `let` 키워드를 사용하여 변수를 선언하면, 해당 컴포넌트가 생성될 때마다 해당 변수는 해당 값으로 계속 선언됨. (다음에 리렌더링되어도 값이 초기화 됨)  

<br>

그럼 값을 유지시키고 싶으면 [전에 배운 `useState`](https://github.com/zwonlala/react_tutorial#08-usestate%EB%A5%BC-%ED%86%B5%ED%95%9C-%EB%8F%99%EC%A0%81-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC)를 써야 하는데, ustState를 통해 값을 변화시키면(상태를 변화), 변화시킬때마다 컴포넌트가 리렌더링됨. 

만약 저장하는 값이 렌더링이랑 상관없는 값이면 값이 변화될때마다 리렌더링 되는 방법은 비효율 적인 방법임.

<br>

이때 우리는 **`useRef`** 함수를 쓸 수 있는데, 컴포넌트가 리렌더링 될 때도 계속 값을 저장해야할 때 쓴다!

- setTimeout/setInterval의 id 값 저장할 때
- 외부 라이브러리를 사용하여 생성된 인스턴스를 저장할 때
- Scroll 위치
- ...

<br>

#### 여기서 포인트는 **`useRef`** 로 저장하고 관리하는 값은 값이 변하더라고 컴포넌트가 리렌더링 되지 않는다는 거!!!

<br><br>

이전에 활용한 예제에 새로운 항목을 추가할 때, id값을 받아오기 위해 변수를 **`useRef`** 함수를 사용하여 저장할 것.

```JSX
import React, { useRef } from 'react';
```
와 같이 **`useRef`** 함수를 불러온 다음,

```JSX
const nextId = useRef(4); //초기값을 4로 설정
```

초기값 4를 nextId 에 저장

그리고 그 값을 사용할때는

```JSX
const onCreate = () => { //새로운 원소를 추가하는 함수

  console.log(nextId.current);
  nextId.current += 1; //기존 값에 1 추가
}
```

이렇게 사용하면 된다.

포인트!는 **`useRef`** 함수를 사용하여 컴포넌트 안의 변수를 만들면, 컴포넌트에 값을 저장할 수 있고, 값이 변경된다 하더라도 컴포넌트가 리랜더링 되진 않는다.

<br><br><br><br>




### 14. 배열 컨트롤2 (배열 항목 추가)

배열에 항목 추가를 할 때는 기존의 항목을 유지시키면서(불변성을 지켜주면서) 추가를 해줘야 함.

그래서 [push](https://velog.io/@zwonlala/%EB%B0%B0%EC%97%B4-%EB%82%B4%EC%9E%A5%ED%95%A8%EC%88%98-shift-pop-unshift-push), [splice](https://velog.io/@zwonlala/%EB%B0%B0%EC%97%B4-%EB%82%B4%EC%9E%A5%ED%95%A8%EC%88%98-spliceslice), [sort](http://dudmy.net/javascript/2015/11/16/javascript-sort/)등의 함수를 사용하면 안된다.

불변성을 지키며 배열에 새 항목을 추가하는 방법에는 [spread 연사자](https://velog.io/@chlwlsdn0828/Js-Spread-%EC%97%B0%EC%82%B0%EC%9E%90-Rest-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0)를 이용하는 법, [concat 함수](https://velog.io/@zwonlala/%EB%B0%B0%EC%97%B4-%EB%82%B4%EC%9E%A5%ED%95%A8%EC%88%98-concat)를 사용하는 법 이렇게 2가지가 있다.

<br><br>

### 1. spread 연산자를 이용하여 배열에 새 항목을 추가하는 방법

```JSX
//users는 user 객체 정보가 저장되어 있는 배열
//user는 새로 입력된 정보가 담긴 객체
setUsers([...users, user]);
```

<br><br>

### 2. concat 연산자를 이용하여 배열에 새 항목을 추가하는 방법

```JSX
//users는 user 객체 정보가 저장되어 있는 배열
//user는 새로 입력된 정보가 담긴 객체
setUsers(users.concat(user));
```

**TODO: 코드에 대한 설명 추가**

<br><br><br><br>


### 14. 배열 컨트롤3 (배열 항목 삭제)

배열에 항목 삭제를 할 때는 기존의 항목을 유지시키면서(불변성을 지켜주면서) 추가를 해줘야 함.

그래서 삭제할 경우에는 [**`filter 함수`**](https://velog.io/@zwonlala/%EB%B0%B0%EC%97%B4-%EB%82%B4%EC%9E%A5%ED%95%A8%EC%88%98-filter)를 사용하여 구현한다.
**`filter 함수`** 는 배열에서 특정 조건을 만족하는 값들만 따로 추출하여 새로운 배열을 만드는 함수 이므로,
어떤 항목을 삭제하면, 해당 항목만 제외한 배열을 구하여 설정해주면 삭제가 구현된다!
<br><br>

### filter 함수를 이용하여 배열의 항목을 삭제하는 방법

```JSX
const onRemove = id => {
  setUsers(users.filter(user => user.id !== id));
}
```

위 함수 설명 : <br>

우선 `onRemove 함수`를 만들고,    
해당 함수를 `UserList 컴포넌트`에 props로 보내고,    
`UserList 컴포넌트`에서 다시 `User 컴포넌트`의 props로 보낸다.    
`User 컴포넌트`에서는 삭제 버튼이 눌리면 자신의 id값을 담아 `onRemove 함수`를 호출한다.

<br>

그럼 위의 `onRemove 함수`에서,   
`users.filter(...)`을 통해 users 배열 중 조건에 맞는 원소만을 가진 배열을 만들고   
해당 조건은 `(user => user.id !== id)`  
즉, user의 id가 입력으로 받은 id 값 *(삭제 버튼이 눌린 User 컴포넌트의 id 값)* 이 아닌 원소들만 리턴하는 것  
-> 삭제 원소를 제외한 원소들로 이루어진 배열을 get 하고 해당 배열을 `setUsers()`를 통해  Users 배열에 저장!
<br><br>


**TODO: 코드에 대한 설명 추가**

<br><br><br><br>