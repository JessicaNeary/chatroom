import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Main from "./components/Main";
import EntryPage from "./components/EntryPage";

function App() {
  const username = useSelector(state => state.username);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatroom</h1>
      </header>
      { username ?
        <Main username={username} /> :
        <EntryPage username={username} />
      }
    </div>
  );
}

export default App;
