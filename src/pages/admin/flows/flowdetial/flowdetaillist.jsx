import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { flowDetailColumns } from '../component/tablecolumn/flowdetailColumn';
import CreateFlow from './createFlow';
import PopUpEditflowdetail from './component/popUpEditflowdetail';
// import FetchApi from '../../../customhooks/Functionapi';
// import { Link } from "react-router-dom";
import { Button } from '@mui/material';

function Flowdetaillist({ dataresult, isRemove }) {

    const [data, setData] = useState(dataresult)

    const handleDelete = (id) => {
        // isRemove
        isRemove(id)
        // setData(data.filter((item) => item.flowdetailId !== id));
    }

    const getRowId = (row) => {
        return row.flowdetailId;
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {/* <Link to={`/admin/Flow/flowdetail/${params.row.flowdetailId}`} style={{ textDecoration: "none" }}>
                      <div className="viewButton">จัดการผู้อนุมัติ</div>
                    </Link> */}
                        <div >
                            <CreateFlow
                                detailId={params.row.flowdetailId}
                                flowStatus={params.row.typename}
                                flowstate={params.row.stateflow}
                                department={params.row.departmentname}
                                departcode={params.row.departmentType}
                            />
                        </div>
                        <div>
                            <PopUpEditflowdetail Id={params.row.flowdetailId} />
                        </div>

                        <div>
                            <Button variant="outlined" color='error' size='small'
                                onClick={() => handleDelete(params.row.flowdetailId)}
                            >
                                Delete
                            </Button>
                        </div>


                    </div>
                );
            },
        },
    ];

    return (
        <DataGrid
            className="datagrid"
            getRowId={getRowId}
            rows={dataresult}
            columns={flowDetailColumns.concat(actionColumn)}
            // columns={userColumns}
            pageSize={9}
            rowsPerPageOptions={[9]}
        //    checkboxSelection
        />
    )
}

export default Flowdetaillist