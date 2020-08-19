import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket';

import { sendMessage } from '../actions';

const Chat = ({ room, user }) => {
    const [ input, setInput ] = useState("");
    const dispatch = useDispatch();
    const handleInput = e => {
        setInput(e.target.value);
    };
    const send = () => {
        if (input) {
            const message = {
                user,
                text: input
            }
            socket.emit('send-message',  { roomId: room.id, message });
            dispatch(sendMessage(room.id, message))
            setInput("");
        }
    }
    return (
        <div className="col-8 bg-white d-flex flex-column justify-content-between">
            <div>
                {room.chatLog.map(message => (
                    <div key={message.id}>
                        <strong>{message.user.name}: </strong>
                        {message.text}
                    </div>
                ))}
            </div>
            <div>
            <textarea className="form-control" value={input} onChange={handleInput} />
            <button className="btn btn-block" onClick={send}>Send</button>
            </div>
        </div>
    )
}

export default Chat;