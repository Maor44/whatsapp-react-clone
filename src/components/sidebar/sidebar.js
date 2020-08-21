import React, {useContext, useEffect, useState} from 'react'
import './sidebar.scss';
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import {Chat, DonutLarge, MoreVert, SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./sidebar-chat/sidebar-chat";

import db from "../../firebase/firebase";
import {UserContext} from "../../context/user-context/user-context";

const Sidebar = () => {
    const {user} = useContext(UserContext)
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
        })

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>

                <div className="sidebar__header__right">
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>
                    <IconButton>
                        <Chat/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>

                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__search__container">
                    <SearchOutlined className={'sidebar__search__icon'}/>
                    <input type="text" placeholder={"Search or start new chat"} className="sidebar__search__input"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => {
                    return (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar;