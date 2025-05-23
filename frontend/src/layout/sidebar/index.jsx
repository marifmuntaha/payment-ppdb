import React from "react";
import classNames from "classnames";
import SimpleBar from "simplebar-react";
import Logo from "../logo";
import Menu from "../menu";
import Toggle from "./Toggle";
import {copywriterMenu} from "../menu/MenuData";

import {useTheme} from "../provider/ThemeContext";
import {useThemeUpdate} from "../provider/ThemeUpdateContext";

const Sidebar = ({ fixed, className }) => {


    const theme = useTheme();
    const themeUpdate = useThemeUpdate();

    const classes = classNames({
        "nk-sidebar": true,
        "nk-sidebar-fixed": fixed,
        "nk-sidebar-active": theme.sidebarVisibility,
        "nk-sidebar-mobile": theme.sidebarMobile,
        [`is-light`]: theme.sidebar === "white",
        [`is-${theme.sidebar}`]: theme.sidebar !== "white" && theme.sidebar !== "light",
        [`${className}`]: className,
    });

    return (
        <>
            <div className={classes}>
                <div className="nk-sidebar-element nk-sidebar-head">
                    <div className="nk-sidebar-brand">
                        <Logo to={`${import.meta.env.BASE_URL}`} />
                    </div>
                    <div className="nk-menu-trigger me-n2">
                        <Toggle className="nk-nav-toggle nk-quick-nav-icon d-xl-none" icon="arrow-left" click={themeUpdate.sidebarVisibility} />
                    </div>
                </div>
                <SimpleBar className="nk-sidebar-body">
                    <div className="nk-sidebar-content">
                        <div className="nk-sidebar-menu">
                            <Menu menuData={copywriterMenu} />
                        </div>
                    </div>
                </SimpleBar>
            </div>
            {theme.sidebarVisibility && <div
                onClick={themeUpdate.sidebarVisibility}
                className="nk-sidebar-overlay"></div>}
        </>
    );
};
export default Sidebar;