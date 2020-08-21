import React, {useEffect, useState} from 'react';
import './sidebar-chat.scss';

import {Avatar} from "@material-ui/core";
import db, {firebase} from "../../../firebase/firebase";
import {Link} from "react-router-dom";

const SidebarChat = ({id, addNewChat, name}) => {
    const [seed, setSeed] = useState(0);
    const [lastMessage, setLastMessage] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [id])

    useEffect(() => {

       if(id) {
           db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', "desc").limit(1).onSnapshot(snapshot => (
               snapshot.docs.map(doc => setLastMessage(doc.data().body))
           ))
       }
    }, [id])

    const createChat = async() => {
        const roomName = prompt('what is the room name? ')

        if(roomName) {
            await db.collection('rooms').add({
                name: roomName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }

    return (
        addNewChat
            ? <button onClick={createChat} className="sidebar-chat__new-chat-button">ADD NEW CHAT</button>
            : <Link as={'div'} to={`/rooms/${id}`} className="sidebar-chat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebar-chat__info">
                    <h2 className="sidebar-chat__title">{name}</h2>
                    <p className="sidebar-chat__text">{lastMessage}</p>
                </div>
            </Link>
    );
};

export default SidebarChat;