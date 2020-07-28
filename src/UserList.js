import React from 'react';

function User( { user }) {
    return (
        <div>
            <b>{user.username}</b> <span>{user.email}</span>
        </div>
    );
}
function UserList() {
    const users = [
        {
            id: 1,
            username: 'jiwon',
            email: 's26788761@naver.com'
        },
        {
            id: 2,
            username: 'unknown',
            email: 'unknown@gmail.com'
        },
        {
            id: 3,
            username: 'stella',
            email: 'jang@naver.com'
        }
    ];

    return (
        <div>
            {
                users.map( 
                    user => <User user={user} key={user.id}/>
                )
            }
        </div>
    )
}

export default UserList;