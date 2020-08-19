import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { joinRoomRequest } from '../actions';
import { createRoom } from '../actions';
import socket from '../socket';

const Home = ({ user }) => {
    const [ roomName, setRoomName ] = useState("");
    const [ roomId, setRoomId ] = useState("");

    const dispatch = useDispatch();

    const handleNameChange = (e) => {
        setRoomName(e.target.value);
    }    
    const handleIdChange = (e) => {
        setRoomId(e.target.value);
    }
    const submitCreate = () => {
        dispatch(createRoom(roomName, user))
    }    
    const submitJoin = () => {
        socket.emit('join-room', { roomId, user });
        dispatch(joinRoomRequest())
    };
    return (
        <div>
            <div>
                <input value={roomName} placeholder="Create a room..." type="text" onChange={handleNameChange} />
                <button type="submit" onClick={submitCreate}>Create</button>
            </div>        
            <div>
                <input value={roomId} placeholder="Enter a room..." type="text" onChange={handleIdChange} />
                <button type="submit" onClick={submitJoin}>Enter</button>
            </div>
        </div>
    );
}

export default Home;