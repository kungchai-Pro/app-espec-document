import React, { use, useEffect, useState } from 'react'
import NavbarUser from '../../components/navbar/NavbarUser';
import { Button, Container } from '@mui/material';
import '../document/component/searchjournalgroup/searchjournal.scss';
import SearchIcon from '@mui/icons-material/Search';
import PopUpcuEditSlot from './component/newDocument/popupcomponent/popUpcuEditSlot';
// import PopUpdetailitem from './component/newDocument/popupcomponent/popUpdetailitem';
import PopUpdetailitemSearch from './component/newDocument/popupcomponent/popUpdetailitemSearch';
import FetchApi from '../customhooks/Functionapi';
// import { useDemoData } from '@mui/x-data-grid-generator';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { columns } from './component/searchjournalgroup/columntable';
import PopUpUpdateJournal from './component/searchjournalgroup/PopUpUpdateJournal';
import PopUpbatchversion from './component/newDocument/Editcomponent/popUpbatchversion';
import { MdAssignmentAdd } from "react-icons/md";
import Swal from 'sweetalert2';
import './component/searchjournalgroup/searchjournal.scss';

const objectDetial = {
    pkdescription: "",
    ItemID: "",//รหัสสินค้า
    ItemName: "",
    Batch1: "",
    Batch2: "",
    coloabgroupId: ""
}

function SearchJournalgroup() {
    const FetchApis = new FetchApi();
    const [dataitem, setDataItem] = useState(objectDetial);
    const [journalList, setJournalList] = useState([]);
    const [selectRowData, setSelectRowData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typeEdit, setTypeEdit] = useState("0");

    useEffect(() => {

    }, [dataitem])

    function inDataAddsolt(PKDESCRIPTION, COLABGROUPID, index) {

        setDataItem({
            ...dataitem,
            pkdescription: PKDESCRIPTION,
            coloabgroupId: COLABGROUPID
        })
    }

    const inDetailItemId = (Itemid, ItemName) => {
        setDataItem({
            ...dataitem,
            ItemID: Itemid,
            ItemName: ItemName,
        })
    }

    const onSearchJournal = () => {

        if (typeEdit == "0") {
            Swal.fire({
                title: "แจ้งเตื่อน!",
                text: "คุณยังไม่ได้เลือกกลุ่มการแก้ไข!",
                icon: "warning"
            });
        } else {


            setLoading(true)
            var object = {
                ItemID: dataitem.ItemID,
                BatchNo: dataitem.BatchNo,
                TypeBatch: dataitem.TypeBatch
            }
            if (typeEdit == "1") {
                FetchApis.FethcPost('/document/searchJournalByfieldItemId', object).then(res => {
                    // console.log(res)
                    if (res) {
                        setJournalList(res.data);
                        setLoading(false)
                    }
                })

            } else if (typeEdit == "2") {
                FetchApis.FethcPost('/document/searchJournalByfieldBatch', object).then(res => {
                    // console.log(res)
                    if (res) {
                        setJournalList(res.data);
                        setLoading(false)
                    }
                })
            }

        }
    }

    function getRowId(row) {
        return row.JournalID;
    }

    const handleRowSelection = (ids) => {
        setSelectRowData(ids);

    };

    const handleRowClick = (params) => {
        // console.log(params.row)

    };

    const refreshform = () => {
        window.location.reload();
    }


    const getBatchproduct = (index, val) => {

        setDataItem({
            ...dataitem,
            Batch1: val.batchName1,
            Batch2: val.batchName2,
            BatchDetail1: val.batchDetail1,
            BatchDetail2: val.batchDetail2,
            BatchExample1: val.batchExample1,
            BatchExample2: val.batchExample2,
            BatchNo: val.numbers,
            TypeBatch: val.TypeBatch
        })

    }

    const warningCheck = () => {
        Swal.fire({
            title: "แจ้งเตื่อน!",
            text: "คุณยังไม่ได้เลือกรายการเอกสาร!",
            icon: "warning"
        });
    }

    function handleChangeText(e) {
        var input = e.target.value;
        const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:";,=\-&@$<>+*/?!]/g, "");
        setDataItem({ ...dataitem, [e.target.name]: cleanInput });

    }

    function TextTypchang(e) {
        const { name, value } = e.target

        if (value == '1') {
            setTypeEdit('1')
            setDataItem({
                ...dataitem,
                Batch1: '',
                Batch2: '',
                BatchDetail1: '',
                BatchDetail2: '',
                BatchExample1: '',
                BatchExample2: '',
                BatchNo: '',
                TypeBatch: ''
            })
        } else if (value == '2') {
            setTypeEdit('2')
            setDataItem({
                ...dataitem,
                ItemID: '',
                ItemName: '',
                pkdescription: '',
                coloabgroupId: ''
            })
        }
    }


    return (
        <div style={{ fontSize: 14 }}>
            <div>
                <NavbarUser />
            </div>
            <Container >

                <div style={{ padding: 10, marginTop: 1, backgroundColor: '#e6e7e8' }}>

                    <div style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', display: 'flex' }}>
                        <label style={{ color: '#2f90d3', padding: 10 }}>ค้นหาโดยระบุเงื่อนไข</label>
                        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', width: "50%" }}>

                            <div className='layout-flex-line'>

                                <select id="TypeEdit" name="TypeEdit" onChange={(e) => TextTypchang(e)} style={{ width: 200, height: 30 }}>
                                    <option value="0">เลือกกลุ่ม แก้ไข</option>
                                    <option value="1">แก้ไข item</option>
                                    <option value="2">แก้ไข batch</option>
                                </select>
                            </div>
                            <div className='layout-flex-line'>
                                <Button variant="outlined" startIcon={<SearchIcon />} onClick={() => onSearchJournal()}>ค้นหา</Button>
                                <Button variant="outlined" color='warning' onClick={() => refreshform()} style={{ marginLeft: 5 }}>ยกเลิก</Button>
                            </div>
                        </div>
                    </div>
                    <div className='layout-margintop-5'>
                        <div className='layout-margintop-5'>
                            <div style={{ width: 150 }}>
                                <label>ประเภทบรรจุภัณฑ์</label>
                            </div>
                            <div>
                                <input type='text' className='input-box'
                                    name='pkdescription'
                                    value={dataitem.pkdescription}
                                    onChange={(e) => handleChangeText(e)}

                                    style={{ marginRight: 0 }} disabled={typeEdit == '2' ? true : false} />
                            </div>
                            <div style={{ marginRight: 10 }}>
                                {typeEdit == '1' ? <PopUpcuEditSlot inDataAddsolt={inDataAddsolt} index={1} /> : <SearchIcon onClick={() => alert('คุณยังไม่ได้เลือก กลุ่มแก้ไข')} style={{ cursor: 'pointer' }} />}
                            </div>
                        </div>
                        <div className='layout-margintop-5'>
                            <div style={{ width: 60 }}>
                                <label>รหัสสินค้า</label>
                            </div>
                            <div>
                                <input type='text' className='input-box'
                                    name='ItemID'
                                    value={dataitem.ItemID}
                                    onChange={(e) => handleChangeText(e)}

                                    style={{ marginRight: 1 }} disabled={typeEdit == '2' ? true : false} />
                            </div>
                            <div style={{ marginRight: 10 }}>
                                {dataitem.coloabgroupId !== "" && <PopUpdetailitemSearch inDetailItemId={inDetailItemId} ColabgroupId={dataitem.coloabgroupId} index={1} />}
                            </div>
                        </div>
                        <div className='layout-margintop-5'>
                            <div style={{ width: 60 }}>
                                <label>ชื่อสินค้า</label>
                            </div>
                            <div >
                                <input type='text'
                                    name='ItemName'
                                    value={dataitem.ItemName}

                                    onChange={(e) => handleChangeText(e)}
                                    className='input-box' style={{ marginRight: 10, width: 320 }} disabled={typeEdit == '2' ? true : false} />
                            </div>
                        </div>
                    </div>
                    <div style={{ width: 120 }}>
                        {typeEdit == '2' ?
                            <PopUpbatchversion getBatchproduct={getBatchproduct} index={''} /> :
                            <div style={{ marginLeft: 20, backgroundColor: '#F0A448', padding: 3, borderRadius: 5 }}>
                                <label style={{ cursor: 'pointer', alignContent: 'center', display: 'flex', color: '#ffff' }}>
                                    <MdAssignmentAdd size={20} />เพิ่มข้อมูล</label>
                            </div>}
                    </div>
                    <div>
                        {dataitem.BatchNo && <label>รูปแบบที่ batch : {dataitem.BatchNo}</label>}
                        {dataitem.TypeBatch == '1' && <label> ( ยิงบนบรรจุภัณฑ์ )</label>}
                        {dataitem.TypeBatch == '2' && <label> ( ยิงบนกล่องนอก )</label>}
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex', marginTop: 1 }}>
                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                            <div style={{ width: 150 }}>
                                <label>Batch 2</label>
                            </div>
                            <div>
                                <textarea
                                    name='Batch1'
                                    value={dataitem.Batch1}
                                    onChange={(e) => handleChangeText(e)}

                                    style={{ marginRight: 10, width: 300, marginTop: 3 }}
                                    disabled
                                />
                            </div>
                        </div>

                        <div style={{ flexDirection: 'row', display: 'flex', marginLeft: 25 }}>
                            <div style={{ width: 150 }}>Batch 1</div>
                            <div>
                                <textarea
                                    name='Batch2'
                                    value={dataitem.Batch2}
                                    onChange={(e) => handleChangeText(e)}

                                    style={{ marginRight: 10, width: 300, marginTop: 3 }}
                                    disabled
                                />

                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ flex: 'row', justifyContent: 'flex-end', display: 'flex', width: '100%' }}>
                        {selectRowData.length > 0 ? <div>
                            <PopUpUpdateJournal RowData={selectRowData} journalData={journalList} dataitem={dataitem} typeEdit={typeEdit} />
                        </div> : <div>
                            <Button variant="contained" color='warning' onClick={() => warningCheck()}
                                startIcon={<UpgradeIcon />} >อัพเดทข้อมูล</Button>
                        </div>}

                    </div>
                    <DataGrid
                        rows={journalList}
                        getRowId={getRowId}
                        columns={columns}
                        loading={loading}
                        slots={{ toolbar: GridToolbar }}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        onRowClick={handleRowClick}
                        onRowSelectionModelChange={handleRowSelection}
                    />
                </div>
            </Container>
        </div>
    )
}

export default SearchJournalgroup