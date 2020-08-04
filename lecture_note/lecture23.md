# custom Hook 만들어서 사용하기

코드를 작성하다보면 반복되는 로직이 발생.   
예를 들어 다음과 같은 input을 관리하는 코드를 자주 작성하게 됨.

```javascript 
const onChange = (e) => {
  const { name, value } = e.target;
  setInputs({...inputs, [name]: value});
} 
```
이런 경우에는 **`custom Hook`** 을 만들어 사용할 수 있다.

만드는 방법은 React에 내장되어 있는 useEffect, useState, useReducer 와 같은 Hook을 사용하여 구현하고,    
컴포넌트에서 사용하고 싶은 값들을 반환해주면 됨!



<br><br>



input 상태를 관리하는 **`custom Hook`** 을 작성하면, 

먼저 useState와 useCallback 훅을 불러오고, initialForm을 입력받는 useInputs 함수를 작성

```javascript
import { useState, useCallback } from 'react';

function useInputs(initialForm) {
}
```

그 다음 useState를 사용하여, 입력으로 받은 initialForm을 useState로 관리해주고


```javascript 
  const [ form, setForm ] = useState(initialForm);
```

onChange 메소드를 구현

```javascript 
const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value}));
  }, []);
```

그 다음, 입력을 초기화 해주는 reset 함수를 구현   
(initialForm 이라는 값 사용해주었으니 deps 배열에 넣어줘야 함)

```javascript 
  const reset = useCallback(() => setForm(initialForm),[initialForm]);
```

그리고 만든 form, onChange, reset을 배열로 감싸 리턴!(배열이 아닌 객체 형태로 리턴해줘도 됨!)

```javascript 
  return [form, onChange, reset];
```

그리고 다른 컴포넌트에서 사용할 수 있게 export 해줌!
```
export default useInputs; 
```

<br><br>

완성된 useInput 코드!
```javascript
import { useState, useCallback } from 'react';

function useInputs(initialForm) {
  const [ form, setForm ] = useState(initialForm);
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value}));
  }, []);
  const reset = useCallback(() => setForm(initialForm),[initialForm]);

  return [form, onChange, reset];
}

export default useInputs; 
```


<br><br>


그리고 기존 App 컴포넌트에서 기존 코드를

우선 reducer 함수에서 case 'CHANGE_INPUT'와 App 컴포넌트 안에 있는 onChange 함수를 사용할 일이 없으므로, 해당 case와 onChange 함수를 삭제하고

initialState 변수에서 inputs 부분, App 컴포넌트에서 state.inputs에서 비구조화 할당하여 username과 email을 추출하는 부분도 이제 필요 없음.

그다음 App 컴포넌트 내에서 useInputs 함수를 사용하여, 초깃값을 설정하고, return 하는 값들을 비구조화 할당 해준다.

```javascript
const [form, onChange, reset] = useInputs({
  username: '',
  email: ''
});
```

그리고 username 과 email을 form 에서 추출해준다.

```javascript
const { username, email } = form;
```


그리고 reset 함수는 onCreate 함수의 마지막 부분에 추가하고,    
useCallback 함수의 deps에 reset 함수를 추가한다   
(deps에 reset 함수를 추가한 것은 ESLint 문법 때문에 추가한 것. 꼭 안해줘도 동작은 함!

```javascript
const onCreate = useCallback(() => {
  dispatch({
    type: 'CREATE_USER',
    user: {
      id: nextId.current,
      username,
      email
    }
  });
  nextId.current += 1;
  reset(); //여기!
}, [username, email]);
```

<br><br>

#### **+** 숙제! 구현한 useInput 함수를 useState 대신 useReducer 사용하여 구현하기!



<br><br><br><br>

