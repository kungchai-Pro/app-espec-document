import React, { useState, useEffect } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
const Stepflow = (props) => {

    let endflownumber = parseInt(props.endstateflow)
    let stateflownumber = parseInt(props.stateflow)
    

    const [endflow, setEndflow] = useState({ dataend: [], datastate:stateflownumber });
    const[colorstype,setColorstype]=useState('')

    const dataflowend = [];
    const datatStateflow = [];
    for (let index = 0; index < endflownumber; index++) {
        // const element = array[index];

        dataflowend.push(`${index}`)
    }

    useEffect(() => {

        listallEndflow()
        // setEndflow(dataflowend)

    }, [])

    function listallEndflow() {
        const { dataend } = endflow;
        setEndflow({...endflow,dataend:dataflowend})
    }




    return (
        <div>
                {/* {JSON.stringify(endflow.dataend)} */}
                {endflow.dataend.map((item,i)=>(
                    <spen style={{flexDirection:'row'}}>
                         {stateflownumber > i?<spen>
                           <CheckCircleOutlineIcon style={{color:'#08a22b',height:20,width:20}}/>
                         </spen>:<spen >
                            <RadioButtonUncheckedIcon  style={{color:'#e74c3c',height:20,width:20}}/>
                            </spen>}   
                    </spen>
                ))}
                {/* ({stateflownumber}) */}
        </div>
    )
}

export default Stepflow