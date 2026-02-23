import { Button } from "@mui/material";
import FetchApi from "../../../customhooks/Functionapi";
const FetchApis =new FetchApi();

function DeleteMenu(){
  alert('');

}

export const Columns = [
    // { field: "userId", headerName: "userId", width: 70 },
    {
        field: "name",
        headerName: "ชื่อเมนู",
        width: 300,
    },
        {
        field: "Details",
        headerName: "Details",
        width: 300,
    },

    {
        field: "isActive",
        headerName: "Add Munu",
        width: 100,

        renderCell: (params) => {
            return (
                <div style={{ flexDirection: 'row' }}>
                  <Button variant="contained" color="warning" onClick={()=>''}>ลบ</Button>
                </div>
            );
        },
    },

];