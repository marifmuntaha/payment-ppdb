import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import {BlockBetween, BlockDes, BlockHead, BlockHeadContent, BlockTitle, Icon, PreviewCard, ReactDataTable} from "../../../components";
import {Button, ButtonGroup, Spinner} from "reactstrap";
import {get as getProgram, destroy as destroyProgram} from "../../../utils/api/program"
import Partial from "./partial.jsx";


const Program = () => {
    const [sm, updateSm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(true);
    const [modal, setModal] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [program, setProgram] = useState(null);
    const Column = [
        {
            name: "Lembaga",
            selector: (row) => row.institution.name,
            sortable: false,
            // hide: 370,
        },
        {
            name: "Kode",
            selector: (row) => row.code,
            sortable: false,
            // hide: 370,
        },
        {
            name: "Nama Program",
            selector: (row) => row.name,
            sortable: false,
            // hide: 370,
        },
        {
            name: "Diskripsi",
            selector: (row) => row.description,
            sortable: false,
            // hide: 370,
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            // hide: "md",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        setProgram(row);
                        setModal(true);
                    }}><Icon name="pen"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id)
                        destroyProgram(row.id).then(() => {
                            setLoading(false);
                            setDataRefresh(true);
                        }).catch(() => setLoading(false))
                    }}>{loading === row.id ? <Spinner size="sm" /> : <Icon name="trash" /> }</Button>
                </ButtonGroup>
            )
        },
    ];
    const getData = () => {
        getProgram().then(result => {
            setPrograms(result);
            setDataRefresh(false);
        }).catch(() => setDataRefresh(false));
    }

    useEffect(() => {
        dataRefresh && getData()
    }, [dataRefresh]);

    return (
        <>
            <Head title='Data Program'/>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h3" page>
                                Daftar Program
                            </BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Anda mempunyai {programs.length} Program</p>
                            </BlockDes>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <Button
                                    className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                                    onClick={() => updateSm(!sm)}
                                >
                                    <Icon name="menu-alt-r"></Icon>
                                </Button>
                                <div className="toggle-expand-content" style={{display: sm ? "block" : "none"}}>
                                    <ul className="nk-block-tools g-3">
                                        <li>
                                            <Button color="primary" outline className="btn-white"
                                                    onClick={() => setModal(true)}>
                                                <Icon name="plus"></Icon>
                                                <span>TAMBAH</span>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <PreviewCard>
                    <ReactDataTable data={programs} columns={Column} pagination />
                </PreviewCard>
            </Content>
            <Partial modal={modal} setModal={setModal} program={program} setProgram={setProgram} setDataRefresh={setDataRefresh} />
        </>
    )
}

export default Program;