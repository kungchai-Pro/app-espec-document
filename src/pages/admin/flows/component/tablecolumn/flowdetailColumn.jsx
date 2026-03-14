let idCounter = 0;

 const countrow=()=>{
   return (idCounter += 1)
 }
export const flowDetailColumns = [
    // { field: "num", headerName: "NO", width: 70 },
    {
        field: "stateflow",
        headerName: "ลำดับอนุมัติ",
        width: 250,
    },
    {
        field: "typename",
        headerName: "กลุ่มอนุมัติ",
        width: 250,
    },
    {
        field: "departmentname",
        headerName: "กลุ่มแผนก",
        width: 250,
    },

    
];