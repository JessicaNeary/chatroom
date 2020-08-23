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
    const bubbleClasses = (isAdmin, isSelf) => {
        let options = "bg-purple";
        if (isAdmin) options = "bg-dark";
        else if (isSelf) options = "bg-info ml-auto"
        return options + " text-white shadow-sm px-2 py-1 chat-bubble";
    }
    return (
        <div className="col-8 bg-white d-flex flex-column justify-content-between">
            <div className="message-log">
                <div className="py-4 text-left">
                    {room.chatLog.map(message => user.id === message.user.id ? 
                        <div className="d-flex m-1" key={message.id}>
                            <div className={bubbleClasses(false, true)}>{message.text}</div>
                            <div className="align-self-end ml-2">
                                :<strong>{message.user.name}</strong>
                            </div>
                        </div> :
                        <div className="d-flex m-1" key={message.id}>
                            <div className="align-self-end mr-2">
                                <strong>{message.user.name}</strong>
                                {message.user.admin && 
                                    <img className="mx-1 mb-1" src="/icons/person-badge-fill.svg" alt="" width="16" height="16" />
                                }:
                            </div>
                            <div className={bubbleClasses(message.user.admin)}>{message.text}</div>
                        </div>
                    )}
                </div>
            </div>
            <div>
            <textarea className="form-control" value={input} onChange={handleInput} />
            <button className="btn btn-block" onClick={send}>Send</button>
            </div>
        </div>
    )
}

export default Chat;