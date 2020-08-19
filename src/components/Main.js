import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import socket from '../socket';
import Room from './Room';
import Chat from './Chat';
import { getMessage } from '../actions';


const Main = ({ user }) => {
    const room = useSelector(state => state.room);
   
    const dispatch = useDispatch();
   
    useEffect(() => {
        socket.on('get-message', payload => {
            dispatch(getMessage(payload));
        })
    }, []);
    return (
            <div className="d-flex h-100">
                <Chat room={room} user={user} />
                <Room room={room} user={user} />
            </div>
    );
};

export default Main;