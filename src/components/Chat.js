import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket';
import styled from 'styled-components';

import { sendMessage } from '../actions';

const Chat = ({ room, user }) => {
    const [ input, setInput ] = useState("");
    const chatLog = useSelector(state => state.room.chatLog)
    const dispatch = useDispatch();
    const handleInput = e => {
        setInput(e.target.value);
    };
    const send = () => {
        const message = {
            user,
            text: input
        }
        socket.emit('send-message',  { roomId: room.id, message });
        dispatch(sendMessage(room.id, message))
        setInput("");
    }
    return (
        <Container>
            <MessageLog>
                {room.chatLog.map(message => (
                    <Message key={message.id}>
                        <strong>{message.user.name}: </strong>
                        {message.text}
                    </Message>
                ))}
            </MessageLog>
            <TextInput value={input} onChange={handleInput} />
            <button onClick={send}>Send</button>
        </Container>
    )
}

const Container = styled.div`
    width: 60vw;
    border-radius: 20px;
    border: 2px solid black;
`;

const MessageLog = styled.ul`
    padding: 10px 5px;
    border-bottom: 1px solid black;
`;

const Message = styled.li`
    width: fit-content;
    padding: 5px;
    border-radius: 5px;
    background: lightGrey;
    box-shadow: 2px 3px grey;
    margin-bottom: 5px;
`;

const TextInput = styled.textarea`
    height: 100px;
    padding: 10px;
`;

export default Chat;