# immer를 사용한 더 쉬운 불변성 지키기

이번 시간에는 **`immer`** 라는 라이브러리를 사용하여 더 쉽게 불변성을 지키는 방법을 배움.

<br>

```javascript 
const object = {
  a: 1,
  b: 2
};

object.b = 3;
```
React에서 객체나 배열의 값을 수정할 때, 위의 방법 처럼 직접적으로 접근하여 값을 수정하하는 방식을,

**불변성을 깨뜨린다**고 한다.


<br><br>

그 대신 이렇게 **스프레드 연산자** 등을 사용해 값을 수정하는 방식을, **불변성을 유지**한다고 하고

```
const nextObject = {
  ...object,
  b: 3
};
```

객체나 배열을 수정할 때는    
**새로운 객체나 배열을 만들고**, **기존의 값을 집어넣고**, **새로운 값을 덮어쓰는**    
이런 방식으로 수정해야 한다!  
-> 이렇게 수정을 해야 컴포넌트가 제대로 리렌더링 되고, 컴포넌트 최적화도 할 수 있다!


<br><br><br>

배열도 마찬가지로 **push**, **splice**, **find** 등을 사용하여 직접적으로 수정을 하면 안됨!!!🙅🏻


```javascript 
const todos = [
  {
    id: 1,
    text: '할 일 #1',
    done: true
  },
  {
    id: 2,
    text: '할 일 #2',
    done: false
  }
];

//배열에 새로운 객체 추가
todos.push({ ... });

//배열의 어떤 요소 삭제
todos.splice(
  todos.findIndex(todo => todo.id ===2),
  1
);

//배열의 어떤 요소 수정
const selected = todos.find(todo => todo.id === 2);
selected.done = !selected.done;
```

<br>

위와 같은 처리를 해줄 때는, **`concat`**, **`filter`**, **`map`** 등의 함수를 사용하여 불변성을 지키며 수정해줘야 함!!


```javascript 
const todos = [
  {
    id: 1,
    text: '할 일 #1',
    done: true
  },
  {
    id: 2,
    text: '할 일 #2',
    done: false
  }
];

//"불변성을 지키며" 배열에 새로운 객체 추가 <span class="evidence">concat</span>
const inserted = todos.concat({
  id: 3,
  text: '할 일 #3',
  done: false
});


//"불변성을 지키며" 배열의 어떤 요소 삭제
const filtered = todos.filter(todo => todo.id !== 2);

//"불변성을 지키며" 배열의 어떤 요소 수정
const toggled = todos.map(
  todo => todo.id === 2
    ? {
      ...todo,
      done: !todo.done,
    }
    : todo
);
```

<br><br>

이렇게 **`concat`**, **`filter`**, **`map`** 을 사용하면서 불변성을 지키는 코드가 배열이나 객체가 복잡해지면 코드가 너무 복잡해짐...

<br>

이럴 때 사용하면 좋은게 **`immer`** 라는 라이브러리임!

<br>

**`immer`** 라이브러리를 사용하면 이렇게 불변성을 생각하지 않고 바로 수정해줄 수 있다!

```javascript 
const nextState = produce(state, draft => {
  const post = draft.posts.find(post => post.id === 1); //id 값이 1인 특정 포스트를 찾고
  post.comments.push({ //해당 포스트의 comments에 새로운 댓글 추가!
    id: 3,
    text: '와 정말 쉽다~'
  });
});
```

<br>

**`immer`** 를 사용하면 불변성을 해치는 코드를 작성해도 대신 불변성 유지를 해준다!!!

<br>

**`immer`** 라이브러리를 사용하기 위해서는 먼저 설치해야 한다!

`yarn add immer`

위 명령어를 실행하여 **`immer`** 를 설치하고


<br><br>


App.js 상단에서 **`immer`** 를 불러온다.

`import produce from 'immer';`

(원래 `import immer ~` 할수도 있지만, 일반적으로 `import produce ~` 이렇게 한다)

<br><br>


그리고 `window.produce = produce;` 라는 문장을 App.js에 작성하면,

크롬 개발자도구에서 produce 를 사용할 수 있게 된다.

<br><br><br>

**`immer`** 의 사용법을 알아보면,

```javascript
const state = {
  number: 1,
  dontChangMe: 2
};
```

이런 객체를 바꿔주고 싶다고 했을때, 

<br>


**`produce`** 함수를 사용하고,

첫번째 파라미터에는 `우리가 바꿔주고 싶은 값(객체/배열)`을 입력하고(여기선 state),

두번째 파라미터에는 `어떻게 바꿔줄 지 알려주는 함수`를 넣으면 된다.   
(draft라는 값을 받아와 내부에서 하고 싶은 처리를 하면 되고, draft는 첫번째 파라미터인 state와 동일하다!!!)

<br><br>

만약 위 예제에서 state 객체 안의 number 값을 1 증가시킨다고 하면,

```javascript
const nextState = produce(state, draft => {
  draft.number += 1;
});
```

여기서 두번째 파라미터 함수의 입력으로 받는 draft 값은   
첫번째 파라미터인 state와 같고,     
함수 내에서 어떤 처리를 해주면 불변성을 지켜주며 새로운 객체를 만들어준다.    

nextState를 출력해주면

`{ number: 2, dontChangeMe: 2}`

이렇게 출력된다!



<br><br><br>


또 다른 예제를 다뤄보면,

```javascript
const array = [
  { id: 1, text: 'hello' },
  { id: 2, text: 'bye' },
  { id: 3, text: 'lalala' }
];
```

위와 같은 배열이 있을 때, 배열을 수정해주기 위해서는 

```javascript
const nextArray = produce(array, draft => {
  draft.push({ id: 4, text: 'lololo' });
  draft[0].text = draft[0].text + 'world';
});
```

위와 같이 수정해줄 수 있다.

그 결과 nextArray라는 우리가 원해는 대로 새로운 배열이 만들어 졌고,   
또 기존의 array 배열을 원본 값을 유지하고 있다.

<br><br><br><br>
