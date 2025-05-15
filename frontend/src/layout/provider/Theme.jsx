import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import {ThemeContext} from './ThemeContext';
import {ThemeUpdateContext} from './ThemeUpdateContext';

const ThemeProvider = ({...props}) => {
    const defaultTheme = {
        main: "shady", //other value can be passed "clean,shady,softy"
        sidebar: "light", //other value can be passed "dark,white,theme"
        sidebarVisibility: false,
        sidebarMobile: false,
        header: "white", //other value can be passed "light,dark,theme"
        skin: "light", //other value can be passed "dark"
    }
    const [theme, setTheme] = useState(defaultTheme);

    const themeUpdate = {
        // uistyle : function(value){
        //     setTheme({...theme, main : value})
        // },
        sidebar : function(value){
            setTheme({...theme, sidebar : value})
        },
        sidebarVisibility : function(){
            setTheme({...theme, sidebarVisibility : !theme.sidebarVisibility})
        },
        // sidebarHide : function(){
        //     setTheme({...theme, sidebarVisibility : false})
        // },
        header : function(value){
            setTheme({...theme, header : value})
        },
        skin : function(value){
            setTheme({...theme, skin : value})
        },
        reset : function(){
            setTheme({...theme, main : defaultTheme.main, sidebar: defaultTheme.sidebar, header: defaultTheme.header, skin: defaultTheme.skin })
        },
    }

    const bodyClass = classNames({
        "nk-body npc-default has-sidebar no-touch ui-rounder nk-nio-theme ui-light": true,
    });

    useEffect(() => {
        const body = document.querySelector('body');
        body.className = bodyClass;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const body = document.querySelector('body');
        if(theme.main === "default"){
            body.classList.add("ui-default")
            body.classList.remove("ui-shady")
        }
        if(theme.main === "shady"){
            body.classList.add(`ui-shady`)
            body.classList.remove("ui-default")
        }
        if(theme.skin === "dark"){
            body.classList.add(`dark-mode`)
        }else{
            body.classList.remove("dark-mode")
        }
        if(theme.sidebarVisibility === true){
            body.classList.add("nav-shown")
        }else{
            body.classList.remove("nav-shown")
        }
    }, [theme]);

    useEffect(() => {
        const handleMobileSidebar = () => {
            if (window.innerWidth < 1200) {
                setTheme({...theme, sidebarMobile : true})
            } else {
                setTheme({...theme, sidebarMobile : false, sidebarVisibility : false})
            }
        }

        handleMobileSidebar();
        window.addEventListener('resize', handleMobileSidebar);
        return () => {
            window.removeEventListener('resize', handleMobileSidebar);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeContext.Provider value={theme} >
            <ThemeUpdateContext.Provider value={themeUpdate}>
                {props.children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}
export default ThemeProvider;