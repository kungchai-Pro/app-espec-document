import React, { useState, useEffect } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
const Stepflow = (props) => {

    let endflownumber = parseInt(props.endstateflow)
    let stateflownumber = parseInt(props.stateflow)
    

    const [endflow, setEndflow] = useState({ dataend: [], datastate:stateflownumber });
    const[colorstype,setColorstype]=useState('')

    const dataflowend = [];
    const datatStateflow = [];
    for (let index = 0; index < endflownumber; index++) {
     
        dataflowend.push(`${index}`)
    }

    useEffect(() => {

        listallEndflow()
     
    }, [])

    function listallEndflow() {
        const { dataend } = endflow;
        setEndflow({...endflow,dataend:dataflowend})
    }
    
    return (
        <div>
                {endflow.dataend.map((item,i)=>(
                    <spen style={{flexDirection:'row'}}>
                         {stateflownumber > i?<spen>
                          {i+1==stateflownumber?
                          <CheckCircleOutlineIcon style={{color:props.activeapproved==1?'#08a22b':'#e74c3c',height:20,width:20}}/>:
                          <CheckCircleOutlineIcon style={{color:'#08a22b',height:20,width:20}}/>}
                         </spen>:<spen >
                            <RadioButtonUncheckedIcon  style={{color:'#e74c3c',height:20,width:20}}/>
                            </spen>}   
                    </spen>
                ))}
               
        </div>
    )
}

export default Stepflow