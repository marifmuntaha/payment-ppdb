import React, { useState } from "react";
import {Icon, LinkList, UserAvatar} from "../../../../components";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import {APICore} from "../../../../utils/api/APICore";
import {useTheme} from "../../../provider/ThemeContext";
import {useThemeUpdate} from "../../../provider/ThemeUpdateContext";

const User = () => {
    const api = new APICore();
    const {user} = api.getLoggedInUser();
    const theme = useTheme();
    const themeUpdate = useThemeUpdate();
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((prevState) => !prevState);

    return (
        <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
            <DropdownToggle
                tag="a"
                href="#toggle"
                className="dropdown-toggle"
                onClick={(ev) => {
                    ev.preventDefault();
                }}
            >
                <div className="user-toggle">
                    <UserAvatar icon="user-alt" className="sm" />
                </div>
            </DropdownToggle>
            <DropdownMenu end className="dropdown-menu-md">
                <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card sm">
                        <div className="user-avatar">
                            <span>AB</span>
                        </div>
                        <div className="user-info">
                            <span className="lead-text">{user.fullName}</span>
                            <span className="sub-text">{user.email}</span>
                        </div>
                    </div>
                </div>
                <div className="dropdown-inner">
                    <LinkList>
                        <li>
                            <a className={`dark-switch ${theme.skin === 'dark' ? 'active' : ''}`} href="#"
                               onClick={(ev) => {
                                   ev.preventDefault();
                                   themeUpdate.skin(theme.skin === 'dark' ? 'light' : 'dark');
                               }}>
                                {theme.skin === 'dark' ?
                                    <><em className="icon ni ni-sun"></em><span>Light Mode</span></>
                                    :
                                    <><em className="icon ni ni-moon"></em><span>Dark Mode</span></>
                                }
                            </a>
                        </li>
                    </LinkList>
                </div>
                <div className="dropdown-inner">
                    <LinkList>
                        <a href={`${import.meta.env.BASE_URL + 'auth/keluar'}`}>
                            <Icon name="signout"></Icon>
                            <span>Keluar</span>
                        </a>
                    </LinkList>
                </div>
            </DropdownMenu>
        </Dropdown>
    );
};

export default User;