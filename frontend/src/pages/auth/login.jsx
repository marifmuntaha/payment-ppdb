import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head";

import AuthFooter from "../../layout/footer/auth";
import {
    Block,
    BlockContent,
    BlockDes,
    BlockHead,
    BlockTitle,
    Button,
    Icon,
    PreviewCard,
} from "../../components";
import { Form, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../../utils/api/auth";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [passState, setPassState] = useState(false);
    const onSubmit = (data) => {
        setLoading(true);
        login(data).then(() => {
            navigate("/");
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    const {  register, handleSubmit, formState: { errors } } = useForm();

    return <>
        <Head title="Login" />
        <Block className="nk-block-middle nk-auth-body  wide-xs">
            <div className="brand-logo pb-4 text-center">
                <Link to={import.meta.env.BASE_URL} className="logo-link">
                    <img className="logo-light logo-img logo-img-lg" src={String(Logo)} alt="logo" />
                    <img className="logo-dark logo-img logo-img-lg" src={String(LogoDark)} alt="logo-dark" />
                </Link>
            </div>

            <PreviewCard bodyClass="card-inner-lg">
                <BlockHead>
                    <BlockContent>
                        <BlockTitle tag="h5">SIMADU APP</BlockTitle>
                        <BlockDes>
                            <p>Akses panel menggunakan alamat email dan kata sandi.</p>
                        </BlockDes>
                    </BlockContent>
                </BlockHead>
                <Form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="email">
                                Alamat Email
                            </label>
                        </div>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="email"
                                {...register('email', { required: "Alamat Email tidak boleh kosong." })}
                                placeholder="Masukkan alamat email anda"
                                className="form-control-lg form-control" />
                            {errors.email && <span className="invalid">{errors.email.message}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="password">
                                Kata Sandi
                            </label>
                            <Link className="link link-primary link-sm" to={import.meta.env.BASE_URL + 'auth/lupa-sandi'}>
                                Lupa Sandi?
                            </Link>
                        </div>
                        <div className="form-control-wrap">
                            <a
                                href={"#password"}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setPassState(!passState);
                                }}
                                className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                            >
                                <Icon name="eye" className="passcode-icon icon-show"></Icon>
                                <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                            </a>
                            <input
                                type={passState ? "text" : "password"}
                                id="password"
                                {...register('password', { required: "Kata Sandi tidak boleh kosong" })}
                                placeholder="Masukkan kata sandi anda"
                                className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                            {errors.password && <span className="invalid">{errors.password.message}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <Button size="lg" className="btn-block" type="submit" color="primary">
                            {loading ? <Spinner size="sm" color="light" /> : "MASUK"}
                        </Button>
                    </div>
                </Form>
            </PreviewCard>
        </Block>
        <AuthFooter />
    </>;
};
export default Login;