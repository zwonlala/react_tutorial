# 리듀서 Immer로 구현하기



기존에 우리가 reducer를 사용해 구현했던   
**'CREATE_USER'**, **'TOGGLE_USER'**, **'REMOVE_USER'** 액션에 대해   
**`immer`** 라이브러리를 적용해 구현해봄!   
-> **`immer`** 를 사용한다고 해서 무조건 코드가 깔끔해지는 것은 아님!! 케바케임!

<br>

### - CREATE_USER

```javascript 
//이전 코드
case 'CREATE_USER':
  return {
    inputs: initialState.inputs,
    users: state.users.concat(action.user)
  };


//immer 적용 버젼
case 'CREATE_USER':
  return produce(state, draft => {
    draft.users.push(action.user);
  });
```

<br><br>

### - TOGGLE_USER

```javascript 
//이전 코드
case 'TOGGLE_USER':
  return {
    ...state,
    users: state.users.map( user => 
        user.id === action.id
        ? {...user, active: !user.active}
        : user
    )
  };


//immer 적용 버젼
case 'TOGGLE_USER':
  return produce(state, draft => {
    const user = draft.users.find(user => user.id === action.id);
    user.active = !user.active;
  });
```
-> TOGGLE_USER의 경우 코드가 더 깔끔해짐 & 이해하기 쉬움

<br><br>

### - REMOVE_USER

```javascript 
//이전 코드
case 'REMOVE_USER':
  return {
    ...state,
    users: state.users.filter(user => user.id !== action.id)
  };

//immer 적용 버젼
case 'REMOVE_USER':
  return produce(state, draft => {
    const index = draft.users.findIndex(user => user.id === action.id);
    draft.users.splice(index, 1);
  };
```
-> REMOVE_USER의 경우 코드가 더 복잡해짐...;


<br>

∴ 만약 **`immer`** 를 사용할 일이 있다면,    
**'TOGGLE_USER'** 같이 업데이트 로직이 까다로운 경우 사용하고,    
**'CREATE_USER'** 같이 간단한 경우는 사용하지 않는 걸 추천!


<br><br><br><br>


### 추가적인 팁!

```javascript 
const [todo, setTodo] = useState({
  text: 'Hello',
  done: false
});

const onClick = useCallback(() => {
  setTodo(todo => ({
    ...todo,
    done: !todo.done
  }));
}, []);
```

이전에 useState를 배울 때, 함수형 업데이트를 배운 적이 있음!    

그럴때의 이점은, useCallback 훅을 사용했을 때, deps 배열에 아무것도 안넣어줘도 된다는 장점이 있었음!  

이런 함수형 업데이트를 하는 경우에 **`immer`** 를 사용하면 상황에 따라 더 편하게 구현할 수 있음!!


<br>


```javascript 
const todo = {
  text: 'Hello',
  done: false
};

//draft 값을 받아와서 done 값을 업데이트 해주는 업데이트 함수 updater
const updater = produce(draft => {
  draft.done = !draft.done;
};

const nextTodo = updater(todo);

console.log(nextTodo);
// { text: 'Hello', done: true }
```

**`immer`** 의 특징 중에    
파라미터를 함수 하나만 사용하면(기존의 두번째 파라미터),   
produce 함수의 결과물은 update 함수가 된다!    

위의 updater 자체가 하나의 함수이기 때문에 

`const nextTodo = updater(todo);`

이 문장을 실행하면, 우리가 예상했던대로 실행이 됨.

<br><br>


이를 활용하면, produce 함수의 결과물이 update 함수가 되니

```javascript 
const [todo, setTodo] = useState({
  text: 'Hello',
  done: false
});

const onClick = useCallback(() => {
  setTodo(
    produce(draft => {
      draft.done = !draft.done;
    })
  };
}, []);
```
-> 불변성을 유지하며, 특정 업데이트를 하기 쉬워짐!

∴ useState를 통해 좀 까다로운 구조의 상태를 관리해줘야 할때,     
위와 같이 사용하면 좀 더 편하게 사용할 수 있다!!!

<br><br><br><br>

**+** **immer의 성능**

<br><br><br><br>

