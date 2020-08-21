import React, {useContext} from 'react';
import './App.scss';
import Sidebar from "./components/sidebar/sidebar";
import Chat from "./components/chat/chat";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Login from "./components/login/login";
import {UserContext} from "./context/user-context/user-context";

function App() {
    const userContext = useContext(UserContext);

    if (!userContext.user) return <Login/>

    return (
        <div className='app'>
            WHATSAPP CLONE
            <div className='app__body'>
                <Router>
                    <Sidebar/>
                    <Switch>
                        <Route path='/rooms/:roomId'>
                            <Chat/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
