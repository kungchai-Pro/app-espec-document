import React from "react";
import { Button } from "@mui/material";
import FetchApi from "../../../customhooks/Functionapi";
import Swal from "sweetalert2";
import Edittypedocument from "../edittypedocument";

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
        FetchApis.FethcDelete(`/typedocument/deleteById/${id}`).then(res=>{
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
    
    // FetchApis.FethcDelete(`/typedocument/deleteById/${id}`).then(res=>{
    //     if(res){
    //         window.location.reload();
    //     }
    // })
}

export const typedocumentColumns = [
    // { field: "userId", headerName: "userId", width: 70 },
    {
        field: "typename",
        headerName: "Type name",
        width: 200,
    },
    {
        field: "typedetail",
        headerName: "Detail",
        width: 300,
    },
    {
        field: "isActive",
        headerName: "isActive",
        width: 200,
                renderCell: (params) => {
            return (
                <div style={{ flexDirection: 'row' }}>
                    <Edittypedocument typeId={params.row.typeId}/>
                    <Button variant="outlined" color='warning' onClick={()=>deleteById(params.row.typeId)}>ลบ</Button>
                </div>
            );
        },
    },
    
];