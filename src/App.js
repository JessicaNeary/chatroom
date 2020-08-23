import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import './App.css';

import socket from './socket';
import { joinRoomSuccess } from './actions';
import Main from "./components/Main";
import EntryPage from './components/EntryPage';

function App() {
  const alert = useAlert();

  const user = useSelector(state => state.user);
  const room = useSelector(state => state.room);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('get-room', payload => {
        dispatch(joinRoomSuccess(payload))
    });
    socket.on('room-not-found', () => {
      alert.info('Room not found');
    })
    socket.on('connect-failed', () => {
      alert.info('Connection failed')
    })    
    socket.on('error', () => {
      alert.info('Sorry, we seem to be having some trouble with that')
    })
}, []);

  return (
    <div className="app bg-light text-center rounded border">
      <nav className="navbar navbar-dark bg-dark p-0 shadow">
        <h3 className="navbar-brand px-3 m-0">Chatroom</h3>
      </nav>
      { !user.name || !room ?
        <EntryPage user={user} /> :
        <Main user={user} />
      }
    </div>
  );
}

export default App;
