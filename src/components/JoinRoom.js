import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { joinRoomRequest } from '../actions';
import { createRoom } from '../actions';
import socket from '../socket';

const JoinRoom = ({ user }) => {
    const [ roomName, setRoomName ] = useState("");
    const [ roomId, setRoomId ] = useState("");

    const dispatch = useDispatch();

    const handleNameChange = (e) => {
        setRoomName(e.target.value);
        setRoomId("");
    }    
    const handleIdChange = (e) => {
        setRoomId(e.target.value);
        setRoomName("");
    }
    const handleEnter = () => {
        if (roomName !== "") {
            submitCreate();
        } else submitJoin();
    }
    const submitCreate = () => {
        dispatch(createRoom(roomName, user))
    }    
    const submitJoin = () => {
        socket.emit('join-room', { roomId, user });
        dispatch(joinRoomRequest(roomId))
        console.log(roomId)
    };
    return (
        <div>
            <input className="form-control mb-1" value={roomName} placeholder="Create a room..." type="text" onChange={handleNameChange} />
            <input className="form-control" value={roomId} placeholder="Join a room..." type="text" onChange={handleIdChange} />
            <button className="mt-4 btn btn-primary btn-block py-1" type="submit" onClick={handleEnter}>Enter</button>
        </div>
    );
}

export default JoinRoom;