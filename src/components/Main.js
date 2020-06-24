import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import socket from '../socket';
import Room from './Room';
import { joinRoomRequest, joinRoomSuccess } from '../actions';
import { createRoom } from '../actions';

const Main = ({ username }) => {
    const room = useSelector(state => state.room);
    return (
        <div>
        <h5>Hi {username}!</h5>
        { room ? 
            <Room room={room} /> :
            <Home username={username} />
        }
        </div>
    );
};


const Home = ({ username }) => {
    const dispatch = useDispatch();
    const [ roomName, setRoomName ] = useState("");
    const [ roomId, setRoomId ] = useState("");
    useEffect(() => {
        socket.on('get-room', payload => {
            dispatch(joinRoomSuccess(payload))
        });
    });
    const handleNameChange = (e) => {
        setRoomName(e.target.value);
    }    
    const handleIdChange = (e) => {
        setRoomId(e.target.value);
    }
    const submitCreate = () => {
        dispatch(createRoom(roomName, username))
    }    
    const submitJoin = () => {
        socket.emit('join-room', { roomId, username });
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

export default Main;