# 17.useEffect를 사용하여서 마운트/언마운트/업데이트 시 작업 설정하기

**`useEffect`** 라는 Hook은 컴포넌트가
- 마운트(새로 생성, 화면에 나타날 때)
- 언마운트(삭제, 화면에서 사라질 때)
- 업데이트 될 때와 되기 전(변화될 때)
- **+** 리렌더링 될 때마다

어떠한 처리를 해줄 수 있다.

<br><br>

먼저 맨 위에 **`useEffect`** 를 import 하고

```JSX
import React, { useEffect } from 'react';
```

<br><br>

### 1. 컴포넌트가 마운트 / 언마운트 될 때

User 컴포넌트 내의 **`useEffect 함수`** 에 첫번째 파라미터로 함수를 넣어줌!

```JSX
function User( { user, onRemove, onToggle }) {
  const { username, email, id, active } = user;

  useEffect(() => { //첫번째 파라미터로 실행하고 싶은 함수를 넣어줌!
    console.log('컴포넌트가 화면에 나타남');
  }
);
```


이렇게 하면, 컴포넌트가 마운트 될 때(생성될 때) 해당 함수가 실행됨.

기존 예제에 users에 3개의 user 객체가 있으니,    
처음 화면이 렌더링되면 `console.log('컴포넌트가 화면에 나타남');` 가 3번 호출되고, 

추가로 새로운 객체를 등록하면 해당 함수가 다시 호출됨.

<br>

**컴포넌트가 마운트 될 때 주로 해주는 작업은**
- props -> state : props로 받은 값을 컴포넌트의 state로 설정
- REST API : 외부 API 요청
- D3, Video.js : 라이브러리 사용
- setInterval, setTimeout

**`useEffect 함수`** 의 첫번째 파라미터로 등록된 함수가 호출되는 시점은, UI가 화면에 나타난 상태 이후!     
-> DOM에 바로 접근 가능!


<br><br>

그리고 **`useEffect 함수`** 의 두번째 인자로 배열을 넣어주는데,   
이를 deps(dependency)라고 부름!

```JSX
useEffect(() => {
  console.log('컴포넌트가 화면에 나타남');
},[]);
```

의존되는 값들을 이 배열안에 넣어주면 됨!
만약 배열이 비어있으면, 처음 화면에 렌더링 될 때만 함수가 실행됨!
업데이트 되거나 할 때는 출력이 안됨!

<br><br>

그리고 컴포넌트가 언마운트 될 때(삭제될 때) 어떤 작업을 해주고 싶으면, 
**`useEffect 함수`**  내에서 return 을 사용하여 함수를 리턴하면 된다.

```JSX
useEffect(() => {
  console.log('컴포넌트가 화면에 나타남');
  
  return () => {
    console.log('컴포넌트가 화면에서 사라집니다.');
  }
}, []);
```


컴포넌트가 삭제될 때, 해당 함수가 실행됨!   
이 함수를 클리너 함수라 부름!(뒷정리를 해주는 함수라고 생각!!)

**컴포넌트가 언마운트 될 때 주로 해주는 작업은**
- clearInterval, clearTimeout : setInterval, setTimeout을 통해 등록한 작업을 제거할 때
- D3, Video.js 등 라이브러리 인스턴스 제거

<br><br><br>


### 2. deps 배열안에 user 값이 있을 때

deps 배열 안에 user 값을 설정해주면,    
**`useEffect 함수`** 에서 첫번째 인자로 설정해 둔 함수는  
deps 배열에 설정해둔 user가 설정되거나(새로 마운트 되거나), 바뀐 직후(업데이트 된 직후)에 호출된다!

그리고 return으로 설정해주는 클리너 함수는 deps 배열 안에 설정한 user 값이 바뀌기 전에 호출된다. 

```JSX
useEffect(() => { 
  console.log('user 값이 설정됨');
  console.log(user);

  return () => { 
    console.log('user 값이 바뀌기 전');
    console.log(user);
  }

}, [user]);
```

위와 같이 이렇게 **`useEffect 함수`** 를 설정하고 나면,   
기존 예제에 users에 3개의 user 객체가 있으니,       
처음 화면이 렌더링 되면,        

`console.log('user 값이 설정됨');` 이 메시지와   
각 user 객체가 3번 출력이 되고

중간에 user 객체를 수정하면,

```JSX
console.log('user 값이 바뀌기 전');
console.log(user);
```

이 두 문장이 실행되어 바뀌기 전의 user를 출력하고

```JSX
console.log('user 값이 설정됨');
console.log(user);
```
다음 위 두 문장이 실행되어 바뀌고 난 후의 user를 출력한다.

<br>

**+** 만약 useEffect에서 등록한 함수에서 props로 받아온 값이나 함수를 참조(사용)하거나,    
useState로 관리하고 있는 값을 참조하는 경우에는 꼭 deps 배열에 해당 값을 넣어줘야 함!   
-> deps 배열에 넣어야지 함수에서 해당 값을 최신 값으로 가지고 있음!! 


<br><br><br>


### 3. deps배열을 생략하는 경우

deps 배열을 생략하고 **`useEffect 함수`** 를 다음과 같이 작성하면,

```JSX
useEffect(() => {
  console.log(user);
});
```

새로운 user를 추가할때도, users에 있는 모든 객체가 출력됨.  
(∵ React에서는 부모 컴포넌트가 리렌더링 되면, 자식 컴포넌트로 리렌더링 됨.    
User 컴포넌트의 부모 컴포넌트는 UserList 컴포넌트이고,     
UserList에서 users props가 변하게 되면,     
UserList 컴포넌트가 리렌더링되고, 모든 User 컴포넌트도 따라 리렌더링 됨.)   

-> 만약 보여주는 컴포넌트가 많을 경우 느려질 수 있다!!    


<br><br><br>


### 정리

**`useEffect`**  Hook을 사용할 때는
- 첫 번째 인자에는 함수를 등록하고, 
- 두번째 파라미터에는 deps라는 배열을 등록한다.

- 그리고 첫번째 함수에서 return을 사용하여 함수를 반환하게 되면, 해당 함수는 뒷정리 함수로 사용되고 업데이트 되기 직전 사용됨!

- 그리고 useEffect 함수 내에서 사용하고 있는 props나 상태 등이 있다면, deps 배열에 꼭 등록해줘야 한다!

<br><br><br><br>

잘 이해가 안감....

해당 내용을 잘 찬찬히 설명한 듯한 글이 있으니 나중에 다시 읽어보기!

[[번역]useEffect 완벽 가이드](https://rinae.dev/posts/a-complete-guide-to-useeffect-ko)

<br><br><br><br>