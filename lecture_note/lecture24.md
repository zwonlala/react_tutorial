# Context API를 사용한 전역 값 관리

이전에 구현한 App 컴포넌트를 보면, **onToggle** 함수와 **onRemove** 함수가   
App 컴포넌트에서 정의되어 UserList 컴포넌트로 전달되고,    
또 UserList 컴포넌트에서는 User 컴포넌트로 전달을 한다.

**onToggle** 함수와 **onRemove** 함수의 실제 동작은 User 컴포넌트에서만 동작하지만,    
UserList 컴포넌트에서 다리 역할을 하며 위 함수를 props로 전달받고, 또 props로 전달한다.

만약 구조가 더 복잡해지면,    
*자신이 사용하지도 않는 props를 children이 사용한다는 이유만으로 props를 받아 전달해준다*면 비효울적!!!

-> 이런 구조를 효율적으로 해주기 위해 **`Context API`** 를 사용할 수 있다!!!


<br><br><br>


#### 사용법

먼저 가장 위에 **`createContext`** 함수와 **`useContext`** 함수를 import 하고

```javascript 
import React, { createContext, useContext } from 'react';
```

<br><br>

**`createContext`** 함수를 사용하여 context에서 사용할 default value를 설정해준다.

```javascript 
const MyContext = createContext('default Value');
```

<br><br>

그 다음 전달받은 props를 최종적으로 사용하는 컴포넌트에서 **`useContext`** 함수를 사용하여, MyContext 값을 불러온다.   
**`useContext`** 는 context에 내장된 값을 불러올 수 있게 해주는 React에 내장된 Hook!

```javascript 
//이랬던 코드를
function Child({ text }) {
  return <div>안녕하세요? {text}</div>
}


//이렇게 불러온다 
function Child() {
  const text = useContext(MyContext);
  return <div>안녕하세요? {text}</div>
}
```

이렇게 하면 아직 context에 값을 지정해주지 않았기 때문에 default 값이 뜰 것임!

<br>

만약 MyContext의 값을 지정해주고 싶다면, context를 사용하는 컴포넌트의 가장 위에 있는 곳, ContextSample 컴포넌트에서 MyContext안에 있는 Provider라는 컴포넌트를 사용해야 한다.

`<MyContext.Provider>`로 묶어주고, `value` 라는 값을 넣어준다.
그리고 GradnParent 컴포넌트에 넣어주던 text 컴포넌트를 삭제해줘도 된다.

```javascript 
//이랬던 코드를
function ContextSample() {
  return <GrandParent text="GOOD" />
}


//이렇게 바꿔준다.
function ContextSample() {
  return (
    <MyContext.Provider value="GOOD">
      <GrandParent />     
    </MyContext.Provider>
  )
}
``` 


그리고 이전에 props를 전달만 해줬던 컴포넌트들에 전달했던 props를 지워줘도 된다.


<br><br><br>




<details>
<summary>이전 코드</summary>

```javascript 
import React from 'react';

function Child({ text }) {
  return <div>안녕하세요? {text}</div>
}

function Parent({ text }) {
  return <Child text={text} />
}

function GrandParent({ text }) {
  return <Parent text={text} />
}

function ContextSample() {
  return <GrandParent text="GOOD" />     
}

export default ContextSample;
```
</details>

<br>

<details>
<summary>Context API 사용한 코드</summary>

```javascript 
import React, { createContext, useContext } from 'react';

const MyContext = createContext('default Value');

function Child() {
  const text = useContext(MyContext);
  return <div>안녕하세요? {text}</div>
}

function Parent() {
  return <Child />
}

function GrandParent() {
  return <Parent />
}

function ContextSample() {
  return (
    <MyContext.Provider value="GOOD">
      <GrandParent />     
    </MyContext.Provider>
  )
}

export default ContextSample;
```
</details>




<br><br><br>

**+** **context 값 유동적으로 변하게 구현**

```javascript 
function ContextSample() {
  const [value, setValue] = useState(true);
  return (
    <MyContext.Provider value={value ? 'GOOD' : 'BAD'}>
      <GrandParent />
      <button onClick={() => setValue(!value)}>CLICK ME</button>
    </MyContext.Provider>
  )
}
```

이렇게 구현하면 유동적인 값을 **`Context API`** 를 사용하여 처리할 수 있고,   
값이 바뀔 때 마다 여러 컴포넌트를 거쳐 전달하는것이 아니라,    
사용하는 컴포넌트에 바로 보낼 수 있다!    

<br><br><br>


### 정리 

구조를 설명하면, `MyContext.Provider`라는 것의 `value`값 설정을 통해 context의 값을  설정해주고, 

Child 컴포넌트에서 **`useContext`** 함수를 통해 context에 저장되어 있는 값을 불러와 사용함!

그리고 **`createContext`** 함수를 통해 context를 생성하고 기본 값을 설정해 줄 수 있다.

그리고 context를 다른 파일에서 불러와서 사용할 수 있다는 큰 장점이 있다!!!


<br><br><br><br>
