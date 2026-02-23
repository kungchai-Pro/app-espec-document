import React from 'react'
import ViewDocuments from './component/veiwdocuments/viewDocuments';
import ViewDocumentdetail from'./component/veiwdocuments/viewDocumentdetail';
import ViewDocumentimage from './component/veiwdocuments/viewDocumentimage';
import NavbarUser from '../../components/navbar/NavbarUser';
import {
  useParams
} from "react-router-dom";

const DocmentViewAll = () => {
   let { id } = useParams();

  return (
    <div>
        <NavbarUser />
      <div>
        <ViewDocuments jourID={id}/>
      </div>
    </div>
  )
}

export default DocmentViewAll