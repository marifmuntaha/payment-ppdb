import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import {BlockBetween, BlockDes, BlockHead, BlockHeadContent, BlockTitle, Icon, PreviewCard, ReactDataTable} from "../../../components";
import {Button, ButtonGroup, Spinner} from "reactstrap";
import {get as getInstitution, destroy as destroyInstitution} from "../../../utils/api/institution"
import Partial from "./partial.jsx";


const Institution = () => {
    const [sm, updateSm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(true);
    const [modal, setModal] = useState(false);
    const [institutions, setInstitutions] = useState([]);
    const [institution, setInstitution] = useState(null);
    const Column = [
        {
            name: "#",
            selector: (row) => row.id,
            sortable: false,
        },
        {
            name: "Nama Lembaga",
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
                        setInstitution(row);
                        setModal(true);
                    }}><Icon name="pen"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id)
                        destroyInstitution(row.id).then(() => {
                            setLoading(false);
                            setDataRefresh(true);
                        }).catch(() => setLoading(false))
                    }}>{loading === row.id ? <Spinner size="sm" /> : <Icon name="trash" /> }</Button>
                </ButtonGroup>
            )
        },
    ];
    const getData = () => {
        getInstitution().then(result => {
            setInstitutions(result);
            setDataRefresh(false);
        }).catch(() => setDataRefresh(false));
    }

    useEffect(() => {
        dataRefresh && getData()
    }, [dataRefresh]);

    return (
        <>
            <Head title='Data Lembaga'/>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h3" page>
                                Daftar Lembaga
                            </BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Anda mempunyai {institutions.length} lembaga</p>
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
                    <ReactDataTable data={institutions} columns={Column} pagination />
                </PreviewCard>
            </Content>
            <Partial modal={modal} setModal={setModal} institution={institution} setInstitution={setInstitution} setDataRefresh={setDataRefresh} />
        </>
    )
}

export default Institution;