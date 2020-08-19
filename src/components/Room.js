import React from 'react';

const Room = ({ room }) => {
    return (
        <div>
            <h6>{room.name}</h6>
            <div>
                <p>Online:</p>
                <ul>
                    {room.users.map(({ name, id }) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Room;