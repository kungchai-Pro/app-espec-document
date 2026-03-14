
export const userColumns = [
    // { field: "userId", headerName: "userId", width: 70 },
    {
        field: "name",
        headerName: "ชื่อ",
        width: 150,
    },
    {
        field: "username",
        headerName: "ชื่อเข้าใช้ระบบ",
        width: 150,
    },
    {
        field: "employeeId",
        headerName: "รหัสพนักงาน",
        width: 100,
    },
    {
        field: "departmentname",
        headerName: "แผนก",
        width: 160,
    },
    {
        field: "positionname",
        headerName: "ตำแหน่ง",
        width: 160,
    },
    // {
    //     field: "email",
    //     headerName: "email",
    //     width: 160,
    // },
    {
        field: "roles",
        headerName: "กลุ่มผู้ใช้",
        width: 160,
    },
    // {
    //     field: "menugroupId",
    //     headerName: "menugroupId",
    //     width: 160,
    // },

    {
        field: "isActive",
        headerName: "สถานะ",
        width: 100,
        renderCell: (params) => {
            return (
              <div>
                {params.row.isActive==1?<label style={{color:'green'}}>เปิดใช้งาน</label>:<label style={{color:'red'}}>ปิดใช้งาน</label>}
              </div>
            );
          },
    },
    
];