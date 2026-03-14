import React, { useState, useEffect } from 'react'
import Headercomponent from './componentPreview/Headercomponent'
import Detailcomponent from './componentPreview/Detailcomponent'
import Imagescomponent from './componentPreview/Imagescomponent'
import Approvecomponent from './componentPreview/Approvecomponent'
const PreViewdocument = () => {
  return (
    <div>
      <div style={{backgroundColor:'#373938'}}>
        <label style={{fontSize:18,padding:10,color:'#fff'}}> ตัวอย่างเอกสาร </label>
      </div>
      <div>
        <div>
          <Headercomponent />
        </div>
        <div>
          <Detailcomponent />
        </div>
        <div>
          <Imagescomponent />
        </div>
        <div>
          <Approvecomponent />
        </div>
      </div>
    </div>
  )
}

export default PreViewdocument