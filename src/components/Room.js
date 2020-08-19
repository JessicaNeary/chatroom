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
        <div className="col-4 text-left sidebar border-left">
            <h5 className="pt-2 sidebar-heading">{user.name}</h5>
            <div>
                <h6 className="text-uppercase pt-2 d-flex align-items-center">
                    <img className="mr-3" src="/icons/people-fill.svg" alt="" width="16" height="16" />
                    {room.name}
                </h6>
                <ul className="nav flex-column pl-4">
                    {Object.values(room.users).map(({ name, admin, id }) => (
                        <li className="navitem d-flex align-items-center" key={id}>
                            {   admin ?
                                <img className="mr-3" src="/icons/person-fill.svg" alt="" width="16" height="16" /> :
                                <img className="mr-3" src="/icons/person.svg" alt="" width="16" height="16" />
                            }
                            {name}
                        </li>
                    ))}
                </ul>
                <button className="btn align-right leave-btn text-muted font-italic mt-2" onClick={leaveRoom}>LEAVE ROOM</button>
            </div>
        </div>
    )
}

export default Room;