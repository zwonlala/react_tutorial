# React.memo()를 사용한 컴포넌트 리렌더링 방지

컴포넌트에서 리렌더링이 불필요할 때는, 이전에 렌더링 한 결과를 재사용할 수 있게 하는 방법    
-> 컴포넌트의 리렌더링 성능을 개선시킬 수 있음!

<br>

사용법은 간단함

맨 마지막에 컴포넌트를 내보내는 부분을 **`React.memo()`** 로 감싸면 됨.   
**`React.memo()`** 로 감싸면 props가 바뀌었을 때만 컴포넌트가 리렌더링 됨!!

<br>

CreateUser 컴포넌트와 UserList 컴포넌트를
```javascript 
export default CreateUser; //기존 이 코드를

export default React.memo(CreateUser); //이렇게 React.memo()로 묶어주면 된다
```

```javascript 
export default UserList; //기존 이 코드를

export default React.memo(UserList); //이렇게 React.memo()로 묶어주면 된다
```

위와 같이 고치고, UserList.js 파일에 있는 User 컴포넌트는

```javascript 
const User = React.memo(function User( { user, onRemove, onToggle }) {
...
});
```

와 같이 고치면 된다.

이렇게 고치고 나서 input(계정명, 이메일)들을 수정하면 이젠 아래의 UserList 컴포넌트가 렌더링 되지 않는다!(*react dev-tools나 consolg.log로 확인가능!*)

<br>

하지만, 하나의 User 컴포넌트의 onToggle 함수를 실행시키면 UserList 컴포넌트 전체가 리렌더링 된다.

이 이유는 UserList 컴포넌트에서 onToggle함수와 onRemove 함수를 props로 받아        
User 컴포넌트에게 onToggle함수와 onRemove 함수를 props로 보내주게 되는데, 


onToggle함수와 onRemove 함수를 보면, users 배열이 deps 배열에 있다.


```javascript 
const onRemove = useCallback(id => {
  setUsers(users.filter(user => user.id !== id));
}, [users]); //deps 배열에 users가 등록되어 있음!!

const onToggle = useCallback(id => {
  setUsers(users.map(
      user => user.id === id
      ? {...user, active: !user.active } 
      : user
  ));
}, [users]); //deps 배열에 users가 등록되어 있음!!
```


즉, users 배열이 바뀌면 onRemove, onToggle 함수가 새로 바뀌는 것이고,   
이 두 함수는 UserList 컴포넌트와 User 컴포넌트의 props이므로    
두 컴포넌트는 다시 리렌더링 되는 것임!!!

<br>

이 문제를 해결하려면, onRemove, onToggle, onCreate 함수에서 기존 users를 참조하면 안됨.   

그대신 `useState의 함수형 업데이트`를 해야 함!!

`함수형 업데이트`를 하면 deps 배열에 users를 안넣어도 된다!!



```javascript 
const onCreate = useCallback(() => { 
  
  //...생략 
 
  setUsers(users.concat(user)); //이 문장을

  setUsers(users => users.concat(user)); // 이렇게 바꾸주면 된다!!
  //이렇게 하면, setUsers에 등록하는 콜백함수의 파라미터에서 최신의 users 값을 조회하기 때문에 
  //굳이 밑의 deps 배열에 users를 안넣어 줘도 된다!!

  //...생략

}, [username, email, /*users*/]); //users 삭제!
```
위와 같이 구현을 하면 onCreate 함수는 username과 email이 바뀔때만 업데이트 되는 것임!!

onRemove와 onToggle도 비슷하게 이렇게 고치면 된다!

```javascript
const onRemove = useCallback(id => {

  setUsers(users => users.filter(user => user.id !== id));
  //deps 배열에서 users 빼기위해 콜백함수의 파라미터로 users 등록

}, [/*users*/]); //users 제거
```


```javascript 
const onToggle = useCallback(id => {

  //deps 배열에서 users 빼기위해 콜백함수의 파라미터로 users 등록
  setUsers(users => users.map(
      user => user.id === id
      ? {...user, active: !user.active } 
      : user
  ));
}, [/*users*/]); //users 제거
```
이렇게 함수를 작성하면 컴포넌트가 처음 렌더링 될때 만들어지고 계속 재사용되는 것임!!!

<br><br><br>



또 **`React.memo`** 의 두번째 파라미터에 **`propsAreEqual`** 이라는 함수를 넣어줄 수 있는데, 

함수는 **prevProps**랑 **nextProps**, 즉 전 후의 props를 가져와서 비교를 해주는데,    
여기서 만약 **true**를 반환해주면 **리렌더링을 방지**해 주는 것이고,    
**false**를 반환해주면 **리렌더링하게** 하는 것임!   

UserList 컴포넌트에서 해당 함수를 사용하면,   
UserList 컴포넌트는 아까 위에서 onToggle, onRemove 함수를 useCallback을 통해 안바뀌게(재사용하게) 구현했으니  
아래와 같이 구현할 수 있다!

```javascript 
export default React.memo(UserList); //기존의 이 코드를 아래와 같이 고칠 수 있다!


export default React.memo(
    UserList, 
    (prevProps, nextProps) => prevProps.users === nextProps.users
    //prevProps.users 와 nextProps.users 가 같다면 리렌더링 하지 않겠다!!!
);
```

하지만 이렇게 **`propsAreEqual`** 함수를 사용하는 경우에는 나머지 props가 고정적이어서 비교를 할 필요가 없는 것인지 확인을 할 필요가 있음!!

<br><br>

# ∴ 정리 : 컴포넌트를 최적화하는 방법  


- 연산된 값을 재사용하기 위해서는 **`useMemo()`** 를 사용하고<br>

- 특정함수를 재사용하기 위해서는 **`useCallback()`** 을 사용하고<br>

- 컴포넌트 렌더링 된 결과?을 재사용하기 위해서는 **`React.memo()`** 를 사용한다!!! <br>
  
<br>

**+** 위 함수들을 사용한다고 해서 무조건 성능이 좋아지는 것은 아니다!   
(**`useCallback`** -> User 컴포넌트의 onClick() 함수에 적용하면 더 많은 코드만 실행됨,   
**`React.memo`** -> 이 컴포넌트를 성능 최적화가 가능하겠다/필요하겠다 생각이 들 때만 사용!)

<br>

**+** 위에서 사용한 **useState**의 함수형 업데이트 말고도 **useReducer** 라는 함수도 사용가능!   
(다음강의에 🤗)



<br><br><br><br>

