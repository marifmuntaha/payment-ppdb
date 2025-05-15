import React, {forwardRef, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Icon, Row, RSelect} from "../../components";
import {Controller, useForm} from "react-hook-form";
import {get as getInstitution} from "../../utils/api/institution"
import {store as storeStudent, update as updateStudent} from "../../utils/api/student"

const Partial = ({modal, setModal, student, setStudent, setDataRefresh}) => {
    const [loading, setLoading] = useState(false);
    const [institutionOptions, setInstitutionOptions] = useState([])
    const [programOptions, setProgramOptions] = useState([])
    const boardingOptions = [
        {value: '1', label: 'Tahfidz'},
        {value: '2', label: 'Kitab'},
    ]
    const genderOptions = [
        {value: "L", label: "Laki-laki"},
        {value: "P", label: "Perempuan"},
    ]
    const {register, control, handleSubmit, setValue, reset, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        student === null ? handleStore(data) : handleUpdate(data)
    }
    const handleStore = (data) => {
        storeStudent(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const handleUpdate = (data) => {
        updateStudent(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setStudent(null);
        reset();
    };
    const CustomDateInput = forwardRef(({ value, onClick, onChange }, ref) => (
        <div onClick={onClick} ref={ref}>
            <div className="form-icon form-icon-left">
                <Icon name="calendar"></Icon>
            </div>
            <input className="form-control date-picker" type="text" value={value} onChange={onChange} />
        </div>
    ));

    useEffect(() => {
        getInstitution({type: 'select'}).then(result => setInstitutionOptions(result));
        setValue('id', student?.id)
        setValue('institutionId', student?.institution.id)
        setValue('registerNumber', student?.registerNumber)
        setValue('nik', student?.nik)
        setValue('name', student?.name)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [student])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross" />
                </button>
            }
            >
                {student ? 'UBAH' : 'TAMBAH'}
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
                    <Row className="form-group">
                        <Col md={6}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="registerNumber">Nomor Pendaftaran</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="registerNumber"
                                        placeholder="Ex. 200001"
                                        {...register("registerNumber", { required: true })}
                                    />
                                    {errors.registerNumber && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="nik">NIK</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nik"
                                        placeholder="Ex. 1234512345123456"
                                        {...register("nik", { required: true })}
                                    />
                                    {errors.nik && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nama Lengkap</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. Muhammad Arif Muntaha"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <Row className="form-group">
                        <Col md={6}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="phone">Nomor HP</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        placeholder="Ex. 08229366500"
                                        {...register("phone", { required: true })}
                                    />
                                    {errors.phone && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Alamat Email</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="Ex. marifmuntaha@gmail.com"
                                        {...register("email", { required: true })}
                                    />
                                    {errors.email && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={4}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="gender">Jenis Kelamin</label>
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        className="form-control"
                                        name="gender"
                                        render={({field: {onChange, value, ref}}) => (
                                            <RSelect
                                                inputRef={ref}
                                                options={genderOptions}
                                                value={genderOptions.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                                placeholder="Pilih Kelamin"
                                            />
                                        )}/>
                                    <input type="hidden" id="gender" className="form-control" />
                                    {errors.gender && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="birthPlace">Tempat Lahir</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="birthPlace"
                                        placeholder="Ex. Jepara"
                                        {...register("birthPlace", { required: true })}
                                    />
                                    {errors.birthPlace && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="form-group">
                                <Label>Tanggal</Label>
                                <div className="form-control-wrap">
                                    <div className="form-icon form-icon-left">
                                        <Icon name="calendar"></Icon>
                                    </div>
                                    <Controller
                                        control={control}
                                        name="birthDay"
                                        className="form-control"
                                        rules={{required: true}}
                                        render={({field: {onChange, value, ref}}) => (
                                            <DatePicker
                                                inputRef={ref}
                                                selected={value ? value : new Date()}
                                                className="form-control date-picker"
                                                onChange={val => onChange(val)}
                                                dateFormat="dd/MM/yyyy"
                                                customInput={<CustomDateInput/>}
                                            />
                                        )}>
                                    </Controller>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="form-group">
                        <label className="form-label" htmlFor="address">Alamat</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="Ex. Menganti Kedung Jepara"
                                {...register("address", { required: true })}
                            />
                            {errors.address && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <Row className="form-group">
                        <Col md={6}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="fatherName">Nama Ayah</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fatherName"
                                        placeholder="Ex. Jumairi"
                                        {...register("fatherName", { required: true })}
                                    />
                                    {errors.fatherName && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="motherName">Nama Ibu</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="motherName"
                                        placeholder="Ex. Siti Turipah"
                                        {...register("motherName", { required: true })}
                                    />
                                    {errors.motherName && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={6}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="program">Program Sekolah</label>
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        className="form-control"
                                        name="gender"
                                        render={({field: {onChange, value, ref}}) => (
                                            <RSelect
                                                inputRef={ref}
                                                options={genderOptions}
                                                value={genderOptions.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                                placeholder="Pilih Kelamin"
                                            />
                                        )}/>
                                    <input type="hidden" id="gender" className="form-control" />
                                    {errors.gender && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="motherName">Nama Ibu</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="motherName"
                                        placeholder="Ex. Siti Turipah"
                                        {...register("motherName", { required: true })}
                                    />
                                    {errors.motherName && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                    </Row>
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