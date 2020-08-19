import React, { useState } from 'react';
import { setUsername } from '../actions';
import { useDispatch } from 'react-redux';

const UsernameInput = () => {
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
            <input className="form-control mb-3" type="text" value={username} placeholder="Enter your username" onChange={handleInput} />
            <button className="btn btn-primary btn-block py-1" type="submit" onClick={handleSubmit}>Enter</button>
        </div>
    );
}

export default UsernameInput;