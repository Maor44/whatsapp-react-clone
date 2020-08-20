import React from 'react'
import './sidebar.scss';
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import {Chat, DonutLarge, MoreVert, SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./sidebar-chat/sidebar-chat";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar />

                <div className="sidebar__header__right">
                    <IconButton>
                        <DonutLarge fontSize={'large'} />
                    </IconButton>
                    <IconButton>
                        <Chat fontSize={'large'} />
                    </IconButton>
                    <IconButton>
                        <MoreVert fontSize={'large'} />
                    </IconButton>

                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__search__container">
                    <SearchOutlined className={'sidebar__search__icon'} />
                    <input type="text" placeholder={"Search or start new chat"} className="sidebar__search__input"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar;