# useMemo 를 사용하여 연산한 값 재사용하기

**`useMemo`** 라는 Hook은 주로 성능을 최적화 해줘야 할 때 사용!

<br><br>

이전에 구현한 예제에서 active한 user를 세어 그 수를 보여주게 구현하면,

먼저 App.js에서 countActiveUsers()라는 함수를 구현하고

```javascript
function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중입니다...");
  return users.filter(user => user.active).length;
}
```

<br>

App.js가 return 되기 전에 위 함수를 실행시켜 값을 저장하여
```javascript
const count = countActiveUsers(users);
```

count를 출력해주면, 활성 사용자 수가 잘 출력된다.

<br><br>

근데 이때, input에서 새로운 user를 입력할때, inputs의 state가 변할때 마다 컴포넌트를 리렌더링 되고, 그때마다 countActiveUsers 함수가 호출됨.

실제로 users가 변화 되었을 때만 countActiveUsers를 호출하게 하고 싶다면, **`useMemo`** Hook을 사용하면 된다.

<br>

**`useMemo`** 는    
**특정 값이 바뀌었을 때만, 특정 함수를 실행시켜 연산이 되도록 하고,**   
**만약 특정 값이 바뀌지 않았으면, 리렌더링 할때, 기존의 값을 재사용하게 하는 Hook!**

<br>

```javascript 
const count = useMemo(() => countActiveUsers(users), [users]);
```
아까 위에서 return 문 위에서 countActiveUsers 함수를 호출하는 부분에서, 함수 호출 부분을 **`useMemo`** 로 감싸고, **`useMemo`** 의 첫번째 인자는 함수 형태여야 해서 화살표 함수 형태로 바꿔준다!

**`useMemo`** 의 두번째 인자는 deps 배열인데, 어떤 값이 변화되었을때, 해당 함수를 실행시킬 것인지 작성해주면 된다.

<br>

그러면 countActiveUsers 함수는 users가 바뀔때만 호출되도록 최적화 되고, users가 바뀌지 않으면, 기존의 값을 사용하게 된다!

<br><br><br><br>
