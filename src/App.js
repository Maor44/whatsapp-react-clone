import React from 'react';
import './App.scss';
import Sidebar from "./components/sidebar/sidebar";
import Chat from "./components/chat/chat";

function App() {
  return (
    <div className='app'>
      WHATSAPP CLONE
      <div className='app__body'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
