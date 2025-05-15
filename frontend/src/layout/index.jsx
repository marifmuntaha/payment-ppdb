import React from "react";
import Head from "./head";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";
import Sidebar from "./sidebar";
import Header from "./header";
import {Outlet} from "react-router-dom";
import Footer from "./footer";
import {ToastContainer} from "react-toastify";

const Layout = ({ title }) => {
    return (
        <>
            <Head title={!title && 'Loading'} />
            <AppRoot>
                <AppMain>
                    <Sidebar fixed  className="shadow"/>
                    <AppWrap>
                        <Header fixed />
                        <Outlet />
                        <Footer />
                    </AppWrap>
                </AppMain>
            </AppRoot>
            <ToastContainer />
        </>
    )
}

export default Layout;