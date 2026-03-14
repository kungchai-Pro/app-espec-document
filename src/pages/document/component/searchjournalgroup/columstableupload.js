
import { BsExclamationCircle } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export const columns = [
    {
        field: 'JournalCode',
        headerName: 'Journal Number',
        width: 150,
        editable: true,
    },
    {
        field: 'TransDate',
        headerName: 'TransDate',
        width: 150,
        editable: true,
    },
    {
        field: 'CustID',
        headerName: 'CustID',
        // type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'CustName',
        headerName: 'CustName',
        // type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'ItemID',
        headerName: 'ItemID',
        // type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'ItemName',
        headerName: 'ItemName',
        // type: 'number',
        width: 200,
        editable: true,
    },
    {
        field: 'Update',
        headerName: 'สถานะ อัพเดทข้อมูล',
        // type: 'number',
        width: 200,
        editable: true,
        renderCell: (params) => {
            return (
                <div style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <div>
                        {params.row.Update == '1' ? <IoCheckmarkCircleOutline color="green" size={20}/> : <BsExclamationCircle color="red" size={20}/>}
                    </div>
                </div>
            )

        }
    },
];