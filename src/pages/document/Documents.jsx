import React,{useState,useEffect} from 'react'
import NavbarUser from '../../components/navbar/NavbarUser'
import ListDocument from './component/document/ListDocument';
import PupUpNewDocument from './component/popupbom/PupUpNewDocument';

function Documents() {
  useEffect(()=>{
  const userId=  sessionStorage.getItem("userId")
 
  },[])

  return (
    <div>
      <NavbarUser />
      <main className="container mx-auto px-4 py-8" style={{ padding: 10, backgroundColor: '#f7f7f7' }}>
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center" style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex'}}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Document List All</h1>
              <p className="text-gray-600 mt-2">Journal list all and manage document workflow</p>
            </div>
            <div style={{
               width: 250,
              flexDirection: 'column',
              justifyContent: 'center', display: 'flex'
            }}>
              <PupUpNewDocument />
              
            </div>
          </div>
        </div>
        <div>
          <ListDocument />
        </div>
      </main>
    </div>
  )
}

export default Documents