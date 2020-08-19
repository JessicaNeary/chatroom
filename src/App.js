import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Main from "./components/Main";
import EntryPage from "./components/EntryPage";

function App() {
  const user = useSelector(state => state.user);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatroom</h1>
      </header>
      { user.name ?
        <Main user={user} /> :
        <EntryPage />
      }
    </div>
  );
}

export default App;
