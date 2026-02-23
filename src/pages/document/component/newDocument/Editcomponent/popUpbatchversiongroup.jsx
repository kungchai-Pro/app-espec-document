import React, { useState, useEffect } from 'react'
import FetchApi from '../../../../customhooks/Functionapi'
import { Button } from '@mui/material'
import { MdAssignmentAdd } from "react-icons/md";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DataTable from 'react-data-table-component';
import { UpdateDetailList } from '../../../../customhooks/Functiondocument';
// import'../newdocument.scss';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const PopUpbatchversiongroup = (props) => {
    const FetchApis = new FetchApi()

    const [open, setOpen] = React.useState(false);
    const [batchlist, setBatchlist] = useState([])

    useEffect(() => {
        getbatchlist()
        //  console.log(props.JournalCode);
    }, [])

    const getbatchlistbygroupnumber = (groupnumber) => {
        FetchApis.FethcGet(`/batchversion/batchversionByNumber/${groupnumber}`).then(res => {
            setBatchlist(res.data)
        })
    }

    const getbatchlist = () => {
        FetchApis.FethcGet(`/batchversion/batchversionListall`).then(res => {
            if (res) {
                setBatchlist(res.data)
            }
        })
    }

    const handleClickOpen = () => {
    //    props.getjourDetailList()
    console.log(props.valDateail)
        ischeckBatchNo()
    };

    const handleClose = () => {
        setOpen(false);
    };

    const ischeckBatchNo = () => {
        if (props.index == 0 || props.JournalCode == '') {
            getbatchlist()
             setOpen(true);
        } else {
            FetchApis.FethcGet(`/document/DocumentDetailByCode/${props.JournalCode}`).then(res => {
                if (res) {
                    // console.log(res.data)
                    if(res.data[0].BatchNo==""){
                            alert('กรุณาเลือกข้อมูล Batch ดำดับแรกก่อน แรกก่อน')
                    }else{
                        setOpen(true);
                    getbatchlistbygroupnumber(res.data[0].BatchNo)
                    }
                    
                }
            })
        }
    }

    const isSelectbatc = (id) => {
        // UpdateDetailList(props.valDateail)

        FetchApis.FethcGet(`/batchversion/batchversionByNumber/${id}`).then(res => {
            if (res) {
                console.log(res.data)
                props.getBatchproduct(props.index, res.data)
            }
        })
        setOpen(false);
    }

    const columns = [
        {
            name: 'รูปแบบที่',
            selector: row => <div>
                <div>
                    <center> {row.numbers}</center>
                </div>
                <div>
                    <center>  {row.TypeBatch == '1' ? <label style={{ color: '#F24524' }}>ยิงบนบรรจุภัณฑ์</label> : <label style={{ color: '#196E1A' }}>ยิงบนกล่องนอก</label>}</center>

                </div>
            </div>,
            sortable: true,
            grow: 0.5,
        },
        {
            name: 'รูปแบบการยิง',
            selector: row => <div>
                <div>
                    <div>

                        <div>{row.batchName1}</div>
                    </div>
                </div>
                <div>

                    <div>{row.batchName2}</div>
                </div>
            </div>,
            sortable: true,
            grow: 1,
        },
        {
            name: 'ความหมายของการยิง',
            selector: row => <div>
                <div>
                    <div>
                        <div>{row.batchDetail1}</div>
                    </div>
                </div>
                <div>

                    <div>{row.batchDetail2}</div>
                </div>
            </div>,
            sortable: true,
            grow: 2.0,
        },
        {
            name: 'ตัวอย่าง',
            selector: row => <div>
                <div>
                    <div>{row.batchExample1}</div>
                </div>
                <div>
                    <div>{row.batchExample2}</div>
                </div>
            </div>,
            sortable: true,
            grow: 1,
        },

        {
            name: 'ACTION',
            selector: row =>
                <div>
                    <Button variant="outlined" onClick={() => isSelectbatc(row.numbers)}>เลือก</Button>
                  
                </div>,
            sortable: true,
            grow: 0.5,
        },

    ];

    const customStyles = {

        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                // borderTopColor: defaultThemes.default.divider.default,
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    // borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: 'rgb(230, 244, 244)',
                borderBottomColor: '#FFFFFF',
                borderRadius: '25px',
                outline: '1px solid #FFFFFF',
            }
        },

        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    // borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },
    };

    const conditionalRowStyles = [{

        when: row => row.TypeBatch == '1',
        style: {
            backgroundColor: '#EBECF2',
            color: '',
            '&:hover': {
                cursor: 'pointer',
            },
        },

    }]


    return (
        <div>
            <div style={{ marginLeft: 20, backgroundColor: '#F0A448', padding: 3, borderRadius: 5 }}>
                <label style={{ cursor: 'pointer', alignContent: 'center', display: 'flex', color: '#ffff' }}
                    onClick={handleClickOpen}><MdAssignmentAdd size={20} />เพิ่มข้อมูล</label>
            </div>

            <React.Fragment>

                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="xl"
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{ backgroundColor: '#4160D9', color: '#ffff' }}>
                        เลือกรูปแบบ BATCH
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <div style={{ width: 1150, height: 'auto', fontSize: 12 }}>
                            <DataTable columns={columns}
                                data={batchlist}
                                customStyles={customStyles}
                                conditionalRowStyles={conditionalRowStyles}
                                defaultSortFieldId={1}
                                highlightOnHover
                                pointerOnHover
                                pagination />
                        </div>
                        
                    </DialogContent>
                    <DialogActions>
                        {/* <Button autoFocus onClick={handleClose}>
                            Save changes
                        </Button> */}
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>
        </div>
    )
}

export default PopUpbatchversiongroup