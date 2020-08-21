import React, {useContext, useEffect, useRef, useState} from 'react';
import './chat.scss';
import {Avatar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined} from "@material-ui/icons";
import {useParams} from 'react-router-dom';
import db, {firebase} from "../../firebase/firebase";
import {UserContext} from "../../context/user-context/user-context";
import {scrollToBottom} from "../../helpers/helpers";

const Chat = () => {
    const {user} = useContext(UserContext)
    const [seed, setSeed] = useState(0);
    const [message, setMessage] = useState('');
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const {roomId} = useParams()
    let chatBodyRef = useRef(null);

    useEffect(() => {
        scrollToBottom(chatBodyRef);
    }, [messages])

    useEffect(() => {
        if (roomId) {
            setSeed(Math.floor(Math.random() * 5000))

            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', "asc").onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        }
    }, [roomId])

    const handleSendMessage = async (e) => {
        e.preventDefault();

        try {
            await db.collection('rooms').doc(roomId).collection('messages').add({
                author: user.displayName,
                body: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })

            setMessage('')

        } catch (e) {
            console.error(e)
        }

    }

    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__header__info">
                    <h3 className="chat__header__title">{roomName}</h3>
                    <p className="chat__header__text">{messages.length > 0 ? `last seen ${`${new Date(messages[messages?.length - 1].data?.timestamp?.toDate()).getHours()}:${new Date(messages[messages?.length - 1].data?.timestamp?.toDate()).getMinutes()}`}` : ''}</p>
                </div>

                <div className="chat__header__right">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body" ref={ref => chatBodyRef = ref}>
                {messages.map(message => {
                    return (
                        <p key={message.id}
                           className={`chat__message ${user.displayName === message.data.author && 'chat__message--receiver'}`}>
                            <span className="chat__message__name">{message.data.author}</span>
                            {message.data.body}
                            <span
                                className="chat__message__time">{`${new Date(message.data?.timestamp?.toDate()).getHours()}:${new Date(message.data?.timestamp?.toDate()).getMinutes()}`}</span>
                        </p>

                    )
                })}
            </div>


            <div className="chat__footer">
                <InsertEmoticon className="chat__footer__icon"/>
                <form className="chat__footer__form">
                    <input value={message} onChange={(e) => setMessage(e.target.value)} type="text"
                           placeholder="Type a message" className="chat__footer__input"/>
                    <button onClick={handleSendMessage} type="submit" className="chat__footer__button"/>
                </form>
                <Mic className="chat__footer__icon"/>
            </div>
        </div>
    );
};

export default Chat;