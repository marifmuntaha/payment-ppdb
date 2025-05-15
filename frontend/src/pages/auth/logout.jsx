import React, {useEffect} from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button} from "../../components";
import {Link, useNavigate} from "react-router-dom";
import AuthFooter from "../../layout/footer/auth.jsx";
import {logout} from "../../utils/api/auth.jsx";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        logout().catch(() => navigate("/"))

    }, [navigate]);
    return (
        <>
            <Head title="Logout" />
            <Block className="nk-block-middle nk-auth-body">
                <div className="brand-logo pb-5">
                    <Link to={import.meta.env.BASE_URL} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={String(Logo)} alt="logo" />
                        <img className="logo-dark logo-img logo-img-lg" src={String(LogoDark)} alt="logo-dark" />
                    </Link>
                </div>
                <BlockHead>
                    <BlockContent>
                        <BlockTitle tag="h4">Anda berhasil keluar</BlockTitle>
                        <BlockDes className="text-success">
                            <p>Anda bisa meninggalkan halaman ini dengan aman sekarang.</p>
                            <Link to={import.meta.env.BASE_URL + 'auth/masuk'}>
                                <Button color="primary" size="lg">
                                    Masuk Kembali
                                </Button>
                            </Link>
                        </BlockDes>
                    </BlockContent>
                </BlockHead>
            </Block>
            <AuthFooter />
        </>
    );
};
export default Logout;