import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createRoom, joinRoom } from '../actions';

const Main = ({ username }) => {
    const room = useSelector(state => state.room);
    return (
        <div>
        <h5>Hi {username}!</h5>
        { room ? 
            <div>{room.name}</div> :
            <Home />
        }
        </div>
    );
};


const Home = () => {
    const dispatch = useDispatch();
    const [ roomName, setRoomName ] = useState("");
    const [ roomId, setRoomId ] = useState("");
    const handleNameChange = (e) => {
        setRoomName(e.target.value);
    }    
    const handleIdChange = (e) => {
        setRoomId(e.target.value);
    }
    const submitCreate = () => {
        dispatch(createRoom(roomName))
    }    
    const submitJoin = () => {
        dispatch(joinRoom(roomId))
    }
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