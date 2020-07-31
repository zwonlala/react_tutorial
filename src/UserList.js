import React, { useEffect } from 'react';

function User( { user, onRemove, onToggle }) {
    const { username, email, id, active } = user;

    useEffect(() => { //첫번째 파라미터로 실행하고 싶은 함수를 넣어줌!
        // console.log('컴포넌트가 화면에 나타남');
        // //컴포넌트가 마운트 될 때 주로 해주는 작업은
        // //- props -> state
        // //- REST API
        // //- D3, Video.js
        // //- setInterval, setTimeout

        //deps를 [user]로 설정한 이후
        console.log('user 값이 설정됨');
        console.log(user);

        //컴포넌트가 삭제될 때 어떤 작업을 해주고 싶으면, useEffect 함수 내에서 return 을 사용하여 함수를 리턴하면,
        //컴포넌트가 삭제될 때, 해당 함수가 실행됨!
        //그리고 이 함수를 클리너 함수라 부름!(뒷정리를 해주는 함수라고 생각!!)
        return () => { 
            // console.log('컴포넌트가 화면에서 사라집니다.');
            // //컴포넌트가 언마운트 될 때 주로 해주는 작업은
            // //- clearInterval, clearTimeout (setInterval, setTimeout을 통해 등록한 작업을 ~~할 때)
            // //- D3, Video.js 등 라이브러리 인스턴스 제거

            //deps를 [user]로 설정한 이후
            console.log('user 값이 바뀌기 전');
            console.log(user);

        }

    }, [user]); //두번째 파라미터로는 배열을 넣어주는데 이를 deps(dependency)라고 부름!
    //의존되는 값들을 이 배열안에 넣어주면 됨!
    // 만약 배열이 비어있으면, 처음 화면에 렌더링 될 때만 함수가 실행됨!
    // 업데이트 되거나 할 때는 출력이 안됨!
    return (
        <div>
            <b style={{
                color: active? 'green' : 'black',
                cursor: 'pointer'
            }}
            onClick={() => onToggle(id)}>
                {username}
            </b>
            &nbsp;
            <span>{email}</span>
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    );
}
function UserList({ users, onRemove, onToggle }) {

    return (
        <div>
            {
                users.map( 
                    user => <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}/>
                )
            }
        </div>
    )
}

export default UserList;