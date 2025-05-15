import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon} from "../../../components";
import {useForm} from "react-hook-form";
import {store as storeInstitution, update as updateInstitution} from "../../../utils/api/institution"

const Partial = ({modal, setModal, institution, setInstitution, setDataRefresh}) => {
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        institution === null ? handleStore(data) : handleUpdate(data)
    }
    const handleStore = (data) => {
        storeInstitution(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const handleUpdate = (data) => {
        updateInstitution(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setInstitution(null);
        reset();
    };

    useEffect(() => {
        setValue('id', institution?.id)
        setValue('name', institution?.name)
        setValue('description', institution?.description)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [institution])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross" />
                </button>
            }
            >
                {institution ? 'UBAH' : 'TAMBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nama Lembaga</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. MA Darul Hikmah"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="description">Diskripsi Singkat</label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="description"
                                {...register("description")}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Button color="primary" type="submit" size="md">
                            { loading ? <Spinner size="sm" /> : 'SIMPAN' }
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default Partial;