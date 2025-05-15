import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon, RSelect} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {get as getInstitution} from "../../../utils/api/institution"
import {store as storeProgram, update as updateProgram} from "../../../utils/api/program"

const Partial = ({modal, setModal, program, setProgram, setDataRefresh}) => {
    const [loading, setLoading] = useState(false);
    const [institutionOptions, setInstitutionOptions] = useState([])
    const {register, control, handleSubmit, setValue, reset, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        program === null ? handleStore(data) : handleUpdate(data)
    }
    const handleStore = (data) => {
        storeProgram(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const handleUpdate = (data) => {
        updateProgram(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setProgram(null);
        reset();
    };

    useEffect(() => {
        getInstitution({type: 'select'}).then(result => setInstitutionOptions(result));
        setValue('id', program?.id)
        setValue('institutionId', program?.institution.id)
        setValue('code', program?.code)
        setValue('name', program?.name)
        setValue('description', program?.description)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [program])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross" />
                </button>
            }
            >
                {program ? 'UBAH' : 'TAMBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="institutionId">Lembaga</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                className="form-control"
                                name="institutionId"
                                render={({field: {onChange, value, ref}}) => (
                                    <RSelect
                                        inputRef={ref}
                                        options={institutionOptions}
                                        value={institutionOptions.find((c) => c.value === value)}
                                        onChange={(val) => onChange(val.value)}
                                        placeholder="Pilih Lembaga"
                                    />
                                )}/>
                            <input type="hidden" id="institutionId" className="form-control" />
                            {errors.institutionId && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="code">Kode Program</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="code"
                                placeholder="Ex. TFZ"
                                {...register("code", { required: true })}
                            />
                            {errors.code && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nama Program</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. Tahfidz"
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