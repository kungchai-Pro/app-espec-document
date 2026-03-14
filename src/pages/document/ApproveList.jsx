import React from 'react'
import Approvedlist from './component/approvedList/approvedlist'
import NavbarUser from '../../components/navbar/NavbarUser'
function ApproveList() {
  return (
    <div>
      <NavbarUser />
      <main className="container mx-auto px-4 py-8" style={{ padding: 10, backgroundColor: '#f7f7f7' }}>
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center" style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Workflow Pre Approved List</h1>
              <p className="text-gray-600 mt-2">Manage document workflow</p>
            </div>
            <div style={{
               width: 400,
              flexDirection: 'column',
              justifyContent: 'center', display: 'flex'
            }}>
            
            </div>
          </div>
        </div>
        <div>
          <Approvedlist />
        </div>
      </main>
    </div>
  )
}

export default ApproveList