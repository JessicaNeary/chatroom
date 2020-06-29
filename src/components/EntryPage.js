import React, { useState } from 'react';
import { setUsername } from '../actions';
import { useDispatch } from 'react-redux';

const EntryPage = () => {
    const [username, setUsernameInput] = useState("");
    const dispatch = useDispatch();

    const handleInput = (e) => {
        setUsernameInput(e.target.value);
    };

    const handleSubmit = () => {
        dispatch(setUsername(username));
    }

    return (
        <div>
            <input type="text" value={username} placeholder="Enter your username" onChange={handleInput} />
            <button type="submit" onClick={handleSubmit}>Enter</button>
        </div>
    );
}

export default EntryPage;