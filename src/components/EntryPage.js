import React from 'react';
import UsernameInput from './UsernameInput';
import JoinRoom from './JoinRoom';

const EntryPage = ({ user }) => (
    <div className="m-auto w-25">
        {
            !user.name ?
            <UsernameInput /> :
            <JoinRoom user={user} />
        }
    </div>
);

export default EntryPage;