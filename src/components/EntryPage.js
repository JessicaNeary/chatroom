import React, { useState } from 'react';
import { setUsername } from '../actions';
import { useDispatch } from 'react-redux';

const EntryPage = (addUser) => {
    const [userName, setUsernameInput] = useState("");
    const dispatch = useDispatch();

    const handleInput = (e) => {
        console.log(e);
        setUsernameInput(e.target.value);
    };

    const handleSubmit = () => {
        console.log('submitting')
        dispatch(setUsername(userName));
    }

    return (
        <div>
            <input type="text" value={userName} placeholder="Enter your username" onChange={handleInput} />
            <button type="submit" onClick={handleSubmit}>Enter</button>
        </div>
    );
}

export default EntryPage;