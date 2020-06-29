import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import socket from '../socket';
import Room from './Room';
import Home from './Home';
import { joinRoomSuccess } from '../actions';


const Main = ({ user }) => {
    const room = useSelector(state => state.room);
   
    const dispatch = useDispatch();
   
    useEffect(() => {
        socket.on('get-room', payload => {
            console.log('getting room', payload)
            dispatch(joinRoomSuccess(payload))
        });
    });
    return (
        <div>
        <h5>Hi {user.name}!</h5>
        { room ? 
            <Room room={room} user={user} /> :
            <Home user={user} />
        }
        </div>
    );
};

export default Main;