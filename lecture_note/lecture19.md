# useCallback 을 사용하여 함수 재사용하기


### 나중에 다시 읽어보기...
- [ ]  [usecallback 공식문서](https://ko.reactjs.org/docs/hooks-reference.html#usecallback)  
- [ ]  [때늦은 React Hooks 시리즈 4탄 - useCallback/useRef](https://gist.github.com/ninanung/767ca722befa8b0affe51ffa0064296b)  
- [ ]  ['When to useMemo and useCallback' 를 읽고](https://rinae.dev/posts/review-when-to-usememo-and-usecallback)  
- [ ]  [리액트의 Hooks 완벽 정복하기](https://velog.io/@velopert/react-hooks)

<br><br>

useMemo와 비슷, 함수를 위한 Hook.

우리가 App.js에서 구현한 onCreate, onRemove, onToggle, onChange 함수를 보면, 컴포넌트가 리렌더링 될때마다 새로운 함수를 만들고 있다..!

-> 함수를 새로 만드는 작업이 메모리나 CPU를 많이 사용하는 작업은 아니다.    
하지만, 한번만든 함수를 재사용할 수 있으면 재사용하는게 좋다!!    
(∵ 나중에 컴포넌트들이 props가 바뀌지 않으면, Vitual DOM에 리렌더링 자체를 하지 않고 이전 값을 쓰게 바꿔줄 수 있는데, 그렇게 하려면 매번 함수를 만드는 구조로는 최적화를 하지 못한다!!!)

<br>

이전에 배운 useMemo 함수가 결과값(연산된 값)을 재사용해주는 것처럼, **`useCallback`** 도 함수를 재사용할 때 사용하고, deps 배열도 명시해줘야 함!

사용법은 이전에 만든 함수들을, **`useCallback`** 으로 묶어주고, 해당 함수 내부에서 의존하고 있는 값(props, state...)을 deps 배열에 넣어 **`useCallback`** 함수의 두번째 인자로 넣어주면 된다.

deps 배열에 명시한 값들이 바뀌었을때만 함수를 업데이트하고, deps 배열에 명시된 값이 변하지 않았을 경우에는 기존의 값을 재사용한다.

만약 deps 배열에 의존하고 있는 값을 넣는 것을 까먹게 되면, 최신의 상태를 참조하는 것이 아니라 이전 상태를 참조할 수 있다...!

나중에 컴포넌트 리렌더링 성능 최적화를 해줘야 성능이 많이 향상됨!

<br>

- onCreate 함수

```javascript
const onCreate = useCallback(() => { 
  const user = {
    id: nextId.current,
    //username과 email도 위에서 inputs라는 상태에서 뽑은 값이기 때문에 deps 배열에 추가!
    username, 
    email
  };
  setUsers(users.concat(user));

  setInputs({
    username:"",
    email:""
  });
  
  nextId.current += 1;
}, [username, email, users]); 
//여기에 왜 users 추가?? -> 위에서 users를 useState로 관리해주고 있어서...?
```

<br>

- onRemove 함수


```javascript
const onRemove = useCallback(id => {
  setUsers(users.filter(user => user.id !== id));
}, [users]);
```

<br>

- onToggle 함수


```javascript
const onToggle = useCallback(id => {
  setUsers(users.map(
    user => user.id === id
      ? {...user, active: !user.active } 
      : user
  ));
}, [users]);
```


<br>

- onChange 함수


```javascript
const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name] : value
    })
  }, [inputs]);
```

<br><br>


**+** [React dev-tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko) -> 어떤 컴포넌트가 현재 리렌더링 되는지 알기 쉬움!

<br><br><br><br>
