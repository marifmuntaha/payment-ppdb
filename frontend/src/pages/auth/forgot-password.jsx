import React, {useState} from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head";
import {Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, PreviewCard} from "../../components";
import { Link } from "react-router-dom";
import AuthFooter from "../../layout/footer/auth.jsx";
import {Spinner} from "reactstrap";
import {useForm} from "react-hook-form";
import {forgotPassword} from "../../utils/api/auth.jsx"

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const onSubmit = (data) => {
        setLoading(true);
        forgotPassword(data).then(() => setLoading(false)).catch(() => setLoading(false))
    }

    return (
        <>
            <Head title="Lupa Kata Sandi" />
            <Block className="nk-block-middle nk-auth-body  wide-xs">
                <div className="brand-logo pb-4 text-center">
                    <Link to={import.meta.env.BASE_URL} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
                        <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
                    </Link>
                </div>
                <PreviewCard bodyClass="card-inner-lg">
                    <BlockHead>
                        <BlockContent>
                            <BlockTitle tag="h5">LUPA SANDI</BlockTitle>
                            <BlockDes>
                                <p>Jika Anda lupa kata sandi, kami akan mengirimkan email berisi petunjuk untuk mengatur ulang kata sandi Anda.</p>
                            </BlockDes>
                        </BlockContent>
                    </BlockHead>
                    <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="email">Alamat Email</label>
                            </div>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                id="email"
                                placeholder="Masukkan alamat email anda."
                                {...register("email", {required: 'Alamat Email tidak boleh kosong.'})}
                            />
                            {errors.email && <span className="invalid">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <Button color="primary" size="lg" className="btn-block">
                                {loading ? <Spinner size="sm"/> : 'KIRIM LINK RESET'}
                            </Button>
                        </div>
                    </form>
                    <div className="form-note-s2 text-center pt-4">
                        <Link to={import.meta.env.BASE_URL + 'auth/masuk'}>
                            <strong>Kembali Kehalaman Masuk</strong>
                        </Link>
                    </div>
                </PreviewCard>
            </Block>
            <AuthFooter />
        </>
    );
};
export default ForgotPassword;