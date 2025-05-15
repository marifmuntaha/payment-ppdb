import React, {useState, useEffect} from "react";
import classNames from "classnames";
import Toggle from "../sidebar/Toggle";
import Logo from "../logo";
import User from "./dropdown/user";
import Notification from "./dropdown/notification";
import Menu from "../menu/MenuHeader";
import {copywriterheadermenu} from "../menu/MenuData";
import {useTheme} from "../provider/ThemeContext";
import {useThemeUpdate} from "../provider/ThemeUpdateContext";

const Header = ({ fixed, className}) => {

    const [sticky, setSticky] = useState(false);

    const theme = useTheme();
    const themeUpdate = useThemeUpdate();

    const headerClass = classNames({
        "nk-header": true,
        "nk-header-fixed": fixed,
        "has-fixed": sticky,
        [`is-light`]: theme.header === "white",
        [`is-${theme.header}`]: theme.header !== "white" && theme.header !== "light",
        [`${className}`]: className,
    });

    useEffect(() => {
        const options = { passive: true }; // options must match add/remove event
        const scroll = () => {
            const {scrollY} = window;
            let _item_offset = 20;
            if (scrollY > _item_offset) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };
        document.addEventListener("scroll", scroll, options);
        return () => {
            document.removeEventListener("scroll", scroll, options);
        };
    }, []);



    return (
        <div className={headerClass}>
            <div className="container-xl wide-xl">
                <div className="nk-header-wrap">
                    <div className="nk-menu-trigger d-xl-none ms-n1">
                        <Toggle
                            className="nk-nav-toggle nk-quick-nav-icon d-xl-none ms-n1 me-3"
                            icon="menu"
                            click={themeUpdate.sidebarVisibility}
                        />
                    </div>
                    <div className="nk-header-brand d-xl-none">
                        <Logo to={`${import.meta.env.BASE_URL}/copywriter`} />
                    </div>
                    <div className="nk-header-menu is-light">
                        <div className="nk-header-menu-inner">
                            <Menu menuData={copywriterheadermenu} />
                        </div>
                    </div>
                    <div className="nk-header-tools">
                        <ul className="nk-quick-nav">
                            <li className="notification-dropdown me-n1">
                                <Notification />
                            </li>
                            <li className="user-dropdown">
                                <User />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Header;