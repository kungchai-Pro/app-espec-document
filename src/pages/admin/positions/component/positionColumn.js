import React from "react";

import { Button } from '@mui/material';
import FetchApi from "../../../customhooks/Functionapi";
import Swal from "sweetalert2";
import Editpositions from '../editpositions';

const FetchApis = new FetchApi();


function deleteById(id){

    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {

  if (result.isConfirmed) {
        FetchApis.FethcDelete(`/position/deleteById/${id}`).then(res=>{
        if(res){
            window.location.reload();
        }
    })

    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
}

export const PositionColumns = [
    // { field: "userId", headerName: "userId", width: 70 },
    {
        field: "positionname",
        headerName: "Position Name",
        width: 200,
    },
    {
        field: "positioncode",
        headerName: "Position Code",
        width: 300,
    },
    {
        field: "isActive",
        headerName: "isActive",
        width: 200,
                renderCell: (params) => {
            return (
                <div style={{ flexDirection: 'row' }}>
                    <Editpositions positionId={params.row.positionId}/>
                    <Button variant="outlined" color='warning' onClick={()=>deleteById(params.row.positionId)}>ลบ</Button>
                    {/* <Button variant="outlined">Outlined</Button> */}
                </div>
            );
        },
    },
    
];