import React, { useEffect } from 'react';
import socket from '../socket';

const Room = ({ room, user }) => {
    useEffect(() => {
        window.addEventListener('beforeunload', leaveRoom);
    }, []);
    const leaveRoom = () => {
        socket.emit('leave-room', { roomId: room.id, userId: user.id })
    }
    return (
        <div>
            <h6>{room.name}</h6>
            <button onClick={leaveRoom}>Leave room</button>
            <div>
                <p>Online:</p>
                <ul>
                    {Object.values(room.users).map(({ name, id }) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Room;