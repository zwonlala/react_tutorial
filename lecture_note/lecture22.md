# useReducer - App에서 useReducer 사용하기

기존의 useState를 통해 구현된 App 컴포넌트를 **`useReducer`** 를 사용해 구현하면,

가장 먼저 App 컴포넌트에서 사용할 상태(초기상태)를 컴포넌트 밖에 선언하는 것이다.

```javascript 
const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
    //생략...
  ]
};
```
<br>

그리고 App 컴포넌트 내에 작성한 로직들을 다 지우고 **`useReducer`** 를 import한 다음 reducer 함수의 틀을 작성해준다.

```javascript 
function reducer(state, action) {
  return state;
}
```

일단 이렇게만 구현한 다음, App 컴포넌트에서 **`useReducer`** 함수를 사용한다.

```javascript 
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  //...생략
}
```
그리고 state에 있는 users와 username, email을 비구조화 할당을 통해 빼준다.

```javascript 
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;
  const { username, email } = state.inputs;  
  //...생략
}
```


<br><br>


## onChange

그 다음 onChange 함수를 구현한다.
```javascript 
const onChange = useCallback( e => {
  const { name, value } = e.target;
  dispatch({
    type: 'CHANGE_INPUT',
    name,
    value
  })
}, []);
```

일단 useCallback을 통해 이벤트를 받아와 특정 작업을 할 거고, 이 함수는 처음 렌더링 될 때만 한번 만들고 재사용할 것이라고 설정.  
 
그리고 e.target에서 name과 value 값을 뽑아온 다음     
**dispatch 함수**를 통해 **action 객체**를 보내는데,   
type은 'CHANGE_INPUT'으로 설정하고  
name과 value 값을 보내둔다.   

그리고 onChange를 CreateUser 컴포넌트에게 보내고, reducer 함수를 구현한다.

```javascript 
function reducer(state, action) {
  switch(action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state, //기존의 자신의 상태를 넣어주고(불변성 유지)

        inputs: { //input에 대하여 업데이트를 해줄 것이니
          ...state.inputs, //기존의 state.input을 불러오고
          [action.name]: action.value 
          //전달받은 onChange가 발생한 name(action.name)을 value 값으로 업데이트
        }
      };

  default :
     throw new Error('Unhandled action');
  }
}
```


<br><br>


## onCreate

```javascript 
const onCreate = useCallback(() => {
  dispatch({
    type: 'CREATE_USER', //type를 'CREATE_USER'로 설정하고
    user: { //새로 생성된 user에 대한 정보를 추가
      id: nextId.current,
      username,
      email
    }
  });
  nextId.current += 1;
}, [username, email]);
```

위와 같이 onCreate 구현한 다음 **reducer** 함수에 'CREATE_USER' case 추가 
```javascript 
case 'CREATE_USER':
  return {
    inputs: initialState.inputs, //input 초기 상태로 설정
    users: state.users.concat(action.user) 
    //Action 객체에서 넘어온 user 객체를 state.users에 추가!
  };
```

기존에 useState를 사용해 구현했을 땐,    
inputs를 초기화하는 작업 따로, users에 새로운 user 객체 추가하는 작업 따로 이렇게 따로따로 작업했는데,   
**`useReducer`** 를 사용하고 나선 이렇게 동시에 작업 처리가 가능함!

<br><br>


## onToggle


```javascript
case 'TOGGLE_USER':
  return {
    ...state, //state를 전부 불러온 다음
    
    //users에 대해 map 함수를 통해 각 user를 비교할 건데
    users: state.users.map( user => 
        user.id === action.id //만약 action 객체로 보낸 id 값이 user의 id 값과
        ? {...user, active: !user.active} //일치하면 active 반전
        : user //다르면 기존의 user 객체 그대로
    )
  }; 
```

**reducer** 함수를 먼저 위와 같이 구현하고, onToggle 함수는 다음과 같이 구현한다.

```javascript 
const onToggle = useCallback(id => { //onToggle이 수행된 User 컴포넌트의 id 값을 받아와
  dispatch({
    type: 'TOGGLE_USER',
    id //onToggle에서 입력받은 id 값 action 객체에 넣어 전달!
  })
}, []);
```


<br><br>


## onRemove


```javascript 
case 'REMOVE_USER':
  return {
    //state를 전부 불러온 다음
    ...state, 
    users: state.users.filter(user => user.id !== action.id)
    //users를 새로 업데이트 할 건데
    //filter를 사용하여, 
    //onRemove로 입력받아 action 객체를 통해 전달한 id(action.id)값과 
    //id 값이 다른 user들만 이루어진 배열로 업데이트!
  };

```

```javascript 
const onRemove = useCallback(id => { //onRemove이 수행된 User 컴포넌트의 id 값을 받아와
  dispatch({
    type: 'REMOVE_USER',
    id //onRemove에서 입력받은 id 값 action 객체에 넣어 전달!
  })
}, []);
```


<br><br>


#### Q. 그럼 언제 useState를 사용하고 언제 **`useReducer`** 를 사용해야 하나?? 🤔 

A. 일단 이럴땐 이거, 저럴땐 저거 이렇게 딱 정해진 것은 없다.   
만약 컴포넌트에서 관리해야 하는 상태가 하나고 그 형태가 간단한 문자열, 숫자, 불리언 값이면, useState로 관리하는게 편할 거임!

하지만, 컴포넌트에서 관리해야 하는 값이 여러개여서 상태의 구조가 복잡해지거나,   
setter 함수(setUsers, setInputs)를 여러번 사용하면 **`useReducer`** 를 사용할까 고민하신다고 함!

<br><br><br><br>
