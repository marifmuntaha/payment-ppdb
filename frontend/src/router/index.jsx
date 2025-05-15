import React, {useLayoutEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import Layout from "../layout";
import Dashboard from "../pages/dashboard";
import NoSidebar from "../layout/noSidebar";
import Login from "../pages/auth/login";
import PrivateRoute from "./protectedRoute";
import Error404 from "../pages/error/Error404";
import ForgotPassword from "../pages/auth/forgot-password";
import ResetPassword from "../pages/auth/reset-password";
import Logout from "../pages/auth/logout";
import Institution from "../pages/master-data/intitution/index.jsx";
import Program from "../pages/master-data/program/index.jsx";
import Student from "../pages/student/index.jsx";

const Router = () => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path={`${import.meta.env.BASE_URL}`} element={<Layout/>}>
                    <Route index element={<Dashboard/>} />
                    <Route path="/master-data/lembaga" element={<Institution/>} />
                    <Route path="/master-data/program" element={<Program/>} />
                    <Route path="/data-siswa" element={<Student/>} />
                </Route>
            </Route>
            <Route path={`${import.meta.env.BASE_URL}`} element={<NoSidebar/>}>
                {/*<Route path="auth-success" element={<Success />}></Route>*/}
                <Route path="auth/lupa-sandi" element={<ForgotPassword />}></Route>
                <Route path="auth/reset-sandi/:token" element={<ResetPassword />}></Route>
                <Route path="auth/masuk" element={<Login/>}></Route>
                <Route path="auth/keluar" element={<Logout/>}></Route>

                <Route path="errors">
                    <Route path="404" element={<Error404 />}></Route>
                    {/*    <Route path="404-classic" element={<Error404Classic />}></Route>*/}
                    {/*    <Route path="504-modern" element={<Error504Modern />}></Route>*/}
                    {/*    <Route path="504-classic" element={<Error504Classic />}></Route>*/}
                </Route>
                <Route path="*" element={<Error404 />}></Route>

            </Route>
        </Routes>
    )
}

export default Router;