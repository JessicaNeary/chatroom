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
        <div className="col-4 sidebar border-left">
            <div className="pt-3">{user.name}</div>
            <div>
                <div className="card-subtitle">{room.name}</div>
                <ul className="nav flex-column">
                    {Object.values(room.users).map(({ name, id }) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
                <button className="btn align-right" onClick={leaveRoom}>Leave room</button>
            </div>
        </div>
    )
}

export default Room;