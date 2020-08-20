import React, {useEffect, useState} from 'react';
import './chat.scss';
import {Avatar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined} from "@material-ui/icons";

const Chat = () => {
    const [seed, setSeed] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {

        setSeed(Math.floor(Math.random() * 5000))

    }, [])

    const handleSendMessage = (e) => {
        e.preventDefault();

        console.log(message);

        setMessage('')
    }

    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__header__info">
                    <h3 className="chat__header__title">Room Name</h3>
                    <p className="chat__header__text">last seen...</p>
                </div>

                <div className="chat__header__right">
                    <IconButton>
                        <SearchOutlined fontSize={'large'}/>
                    </IconButton>
                    <IconButton>
                        <AttachFile fontSize={'large'}/>
                    </IconButton>
                    <IconButton>
                        <MoreVert fontSize={'large'}/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">

                <p className={`chat__message ${true && 'chat__message--receiver'}`}>
                    <span className="chat__message__name">Maor Bar</span>
                    test message
                    <span className="chat__message__time">3:43 PM</span>
                </p>

                <p className={`chat__message ${false && 'chat__message--receiver'}`}>
                    <span className="chat__message__name">Maor Bar</span>
                    test message
                    <span className="chat__message__time">3:43 PM</span>
                </p>

            </div>

            <div className="chat__footer">
                <InsertEmoticon fontSize={'large'} className="chat__footer__icon" />
                <form className="chat__footer__form">
                    <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Type a message" className="chat__footer__input"/>
                    <button onClick={handleSendMessage} type="submit" className="chat__footer__button"/>
                </form>
                <Mic fontSize={'large'} className="chat__footer__icon" />
            </div>
        </div>
    );
};

export default Chat;