# UserDispatch Context 만들기

이전에 배운 **`Context API`** 를 사용하여,    
**onToggle** 함수와 **onRemove** 함수를 UserList 컴포넌트를 거쳐 보내는 것이 아니라   
User 컴포넌트로 바로 보내는 방식으로 수정하면,

dispatch 만 따로 **`Context API`** 를 사용하여 보내줄 것이다.

<br><br><br>

먼저 App.js 상단에 **`createContext`** 를 import 해 오고,    
App 컴포넌트 위에 **`createContext`** 함수를 사용함!   
(기본 값을 필요 없으니 null)


```javascript 
export const UserDispatch = createContext(null);
```

<br><br>

그 다음 UserDispatch 안에 Provider라는 컴포넌트가 있으니, 해당 컴포넌트를 사용!

App 컴포넌트의 return 하는 부분에서 `<UserDispatch.Provider>`로 감싸준다!

그리고 `value`는 위에 있는 dispatch로 설정해준다!

```javascript 
return (
  <UserDispatch.Provider value={dispatch}>
    <CreateUser 
      username={username}
      email={email}
      onChange={onChange}
      onCreate={onCreate}
    />
    <UserList 
      users={users}
      onToggle={onToggle}
      onRemove={onRemove}
      />
    <div>활성 사용자 수는 : {count}</div>
  </ UserDispatch.Provider>
);
```

<br><br><br>

그 다음 App 컴포넌트 내의 **onToggle** 함수와 **onRemove** 함수는 이제 필요 없으니 삭제하고, 

UserList 컴포넌트에 props로 **onToggle** 함수와 **onRemove** 함수를 보내주는 부분도 삭제하고,

UserList 컴포넌트 내의 **onToggle** 함수와 **onRemove** 함수를 받아 User 컴포넌트로 보내주는 부분도 삭제하고,


User 컴포넌트 내의 **onToggle** 함수와 **onRemove** 함수를 받아 사용하는 부분도 삭제.

<br><br><br>

그리고 상단에 **`useContext`** 함수를 import 해오고,    
App.js에서 **`createContext`** 하고 export 한 userDispath도 import 해 옴.

```javascript 
import React, { useContext } from 'react';
import { UserDispatch } from './App';
```

<br><br><br>

그 다음 **`useContext`** 함수를 통해 userDispatch에 저장된 값 불러옴.

```javascript 
const dispatch = useContext(UserDispatch);
```

<br><br><br>

그리고 User 컴포넌트에 **onToggle** 함수와 **onRemove** 함수가 있던 자리에 dispatch 함수를 이용하여 구현해주면 됨.

```javascript 
//이 코드를
onClick={() => onToggle(id)}

//이렇게
onClick={() => dispatch({
  type: 'TOGGLE_USER',
  id
})}
```

<br>

```javascript
//이 코드를
onClick={() => onRemove(id)}

//이렇게
onClick={() => dispatch({
  type: 'REMOVE_USER',
  id
})}
```

<br><br><br>

**여기서 새로운 insight!**

만약 **useReducer**를 사용하지 않고, **useState**를 사용했다면~  
dispatch 같은 함수가 없기 때문에    
방금처럼 UserDispatch 와 같은 context를 만들어 관리하는게 쉽지 않았을 것!   

<br>

앞으로 특정 함수를 여러 컴포넌트에 거쳐서 전달해줄 일이 있다면,   
앞에서 한 것 처럼 dispatch를 관리하는 context를 만들어서    
필요한 곳에 dispatch를 불러와 사용하면, 구조도 깔끔하고 코드 작성하기도 쉬워질 것이다!   

<br>

지금은 context에 dispatch 함수만 넣어서 보내주는 방식을 사용했는데, 나중에는 상태도 같이 보내주는 것을 배울 것임!

<br><br><br><br>


**+** **숙제**
- CreateUser 에게는 아무 props 도 전달하지 않기
- CreateUser 컴포넌트 내부에서 이전에 만든 커스텀 Hook인 useInputs 를 사용
- useRef 를 사용한 nextId 값을 CreateUser 에서 관리

<br>

<details>
<summary><b>내 코드</b></summary>

```javascript
import React, { useContext, useRef } from 'react';
import { UserDispatch } from './App';
import useInputs from './useInputs';

function CreateUser() {
  const [form, onChange, reset] = useInputs({
    username: '',
    email: ''
  });
  const { username, email } = form;
  const dispatch = useContext(UserDispatch);
  const nextId = useRef(4);
  
  return (
    <div>
      <input
        name="username" 
        placeholder="계정명" 
        onChange={onChange} 
        value={username} 
      />
      <input
        name="email" 
        placeholder="이메일" 
        onChange={onChange} 
        value={email} 
      />
      <button onClick={() => {
          dispatch({
            type: 'CREATE_USER',
            user: {...form, id: nextId.current}
          })
          nextId.current += 1;
          reset();
        }
      }>등록</button>
    </div>
  )
};

export default React.memo(CreateUser);
```
</details>

<br>

<details>
<summary><b>벨로퍼트님 코드</b></summary>

```javascript
import React, { useRef, useContext } from 'react';
import useInputs from './hooks/useInputs';
import { UserDispatch } from './App';

const CreateUser = () => {
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: ''
  });

  const nextId = useRef(4);
  const dispatch = useContext(UserDispatch);

  const onCreate = () => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    reset();
    nextId.current += 1;
  };

  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
};

export default React.memo(CreateUser);
```
</details>

<br><br>

- onCreate가 수행해야할 기능이 여러개 일때는 따로 함수로 뽑아서    
`<button onClick={onCreate}>등록</button>`  
이렇게 등록해주는게 깔끔할 것 같음!


- `import useInputs from './useInputs';` 할 때    
`import { useInputs } ... `이렇게 해서  
   **Attempted import error**가 남<br>
[해당 스택 오버 플로](https://stackoverflow.com/questions/53328408/receiving-attempted-import-error-in-react-app)

- `const dispatch = useContext(UserDispatch);`  
위 문장에서 useContext 훅이 아닌 useState 훅을 사용하여   
**'dispatch' is not a function** 라고 출력되는 **type Error** 발생...😅

- 등록 버튼을 누르고 다시 리셋해줘야 하는 것을 깜빡함


<br><br><br><br>



