# useReducer 기초

**`useReducer`** 라는 Hook은 컴포넌트의 상태를 업데이트 해줄 때 사용할 수 있는 Hook 이다.

**useState** Hook도 비슷한 역할을 하지만, **useState**는 설정하고 싶은 다음 상태를 직접 지정해주는 방식으로 업데이트를 해주는 반면

**`useReducer`** 는 **Action**이라는 **객체**를 기반으로 상태를 업데이트 해준다.   

<br>

**Action 객체**는 업데이트 할 때 참조하는 객체로,

```javascript 
dispatch({ type : 'INCREMENT' });
//{type: 'INCREMENT'}가 Action 객체

dispatch({
  type: 'INCREMENT',
  diff: 4
});
```

**type**이라는 값을 사용하여 어떤 업데이트를 할 것인지 명시할 수 있고,

업데이트 시 필요한 참조하고 싶은 다른 값(diff)이 있다면, 위와 같이 객체 안에 넣을 수 있다.

<br><br>


**`useReducer`** Hook을 사용하면, *상태 업데이트 로직을 컴포넌트 밖으로 분리가 가능*하다.  
(다른 파일에 작성 후 불러와서 사용할 수도 있다!)

여기서 **reducer**라는 개념이 있는데, **reducer**는 `상태를 업데이트 하는 함수`로 아래와 같이 생겼다.

```javascript 
function reducer(state, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
```

현재 상태 **state**와 **action 객체**를 파라미터로 받아와서, 새로운 상태를 반환해주는 형태를 가지고 있다

그리고 함수 내에서 swicth-case 문을 사용하여 **action.type**에 따라 다르게 상태를 업데이트 해주는 것을 알 수 있다.

<br><br>

그리고 **`useReducer`** 를 사용할 때는 다음과 같이 사용한다

```javascript 
const [number, dispatch] = useReducer(reducer, 0);
```
- **number** : 현재 상태를 의미
- **dispatch** : action을 발생시키는 함수
- **reducer** : 위에서 정의한 reducer 함수
- **0** : 초깃값(숫자, 문자, 불리언, 객체, 배열 ... 다 가능!)

<br>

dispatch 같은 경우 '보내다'(액션을 발생시킨다)라는 의미를 가지고 있고 다음과 같이 사용

```javascript 
dispatch({ type: 'INCREMENT' });
```



<br><br><br><br>



이전에 작성한 Counter 컴포넌트를 **`useReducer`** 를 사용하는 코드로 바꿔보면,


우선 **`useReducer`** 를 import 하고

먼저 **reducer** 함수를 만든다

```javascript 
fuction reducer(state, action) {
...
}
```

**reducer** 함수의 첫번째 파라미터에는 `state`, 두번째 파라미터는 `action`이고      
`다음 상태를 return` 하는 함수 여야 한다.

그리고 함수 바디 부분에 switch-case 문을 사용하여 `action.type`에 따라 다른 작업을 해주도록 구현한다.

```javascript 
fuction reducer(state, action) {
  switch(action.type) {
    case 'INCREMENT' :
      return state + 1;
    case 'DECREMENT' :
      return state - 1;
    default:
      //return state;
      throw new Error('Unhandled action');
  }
}
```

<br><br>

이렇게 **reducer** 함수 구현이 마쳤으므로 이젠 Counter 컴포넌트 내부 구현을 해준다.

이제 Counter 컴포넌트 내에서 **`useReducer`** Hook을 사용해야 하는데,

```javascript 
function Counter() {
  
  const [number, dispatch] = useReducer(reducer, 0);

  //생략...
}
```

- number : 현재의 상태
- dispatch 함수 : action을 발생시키는 함수
- reducer : 위에서 구현한 reducer 함수
- 0 : useReducer에서 사용하고 싶은 초기값

<br>

그리고 이전에 setNumber을 이용해 구현했던 onIncrease, onDecrease 함수를    
**dispatch** 함수를 사용하여 **Action 객체**를 보내주는 스타일로 구현한다.


```javascript 
const onIncrease = () => {
  //기존의 setNumber를 사용하는 코드를
  //setNumber(number + 1); 
  //setNumber(pervNumber => pervNumber + 1);
  
  //dispatch를 사용하는 코드로 바꿈!
  dispatch({
    type: 'INCREMENT'
  });
}
```

<br>

```javascript 

const onDecrease = () => {
  //기존의 setNumber를 사용하는 코드를
  //setNumber(number - 1); 
  //setNumber(pervNumber => pervNumber - 1);

  //dispatch를 사용하는 코드로 바꿈!
  dispatch({
    type: 'DECREMENT'
  });

}
```

사용해보면 잘 동작한다!😀 

<br><br><br><br>
