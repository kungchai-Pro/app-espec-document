import React from 'react'
import NavbarUser from '../../components/navbar/NavbarUser'
import ViewDocuments from './component/veiwdocuments/viewDocuments'
import Approvedstatusall from './component/aprovedStatusAll/approvedstatusall'
// import ViewDocuments from './component/veiwdocuments/viewDocuments'

import {
    useParams
  } from "react-router-dom";

function ViewDocument() {
      let { id ,status} = useParams();
      const userId = sessionStorage.getItem("userId")
    return (
        <div>
            <div>
                <NavbarUser />
            </div>
            <div>
                <Approvedstatusall Id={id} statusAction={status} userId={userId}/>
            </div>
            <div>
                <ViewDocuments jourID={id}/>
            </div>
        </div>
    )
}

export default ViewDocument