import React, {useEffect, useState} from 'react';
import './sidebar-chat.scss';

import {Avatar} from "@material-ui/core";

const SidebarChat = ({addNewChat}) => {
    const [seed, setSeed] = useState(0);

    useEffect(() => {

        setSeed(Math.floor(Math.random() * 5000))

    }, [])

    const createChat = () => {
        const chatName = prompt('what is the room name? ')

        if(chatName) {
            // database action
        }

    }

    return (
        addNewChat
            ? <button onClick={createChat} className="sidebar-chat__new-chat-button">ADD NEW CHAT</button>
            : <div className="sidebar-chat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebar-chat__info">
                    <h2 className="sidebar-chat__title">Room name</h2>
                    <p className="sidebar-chat__text">Last message...</p>
                </div>
            </div>
    );
};

export default SidebarChat;