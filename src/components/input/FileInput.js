import React, { useState } from 'react'
import './styles.css'

function FileInput({accept, id, fileHandle, text}) {

    const [fileSelected, setFileSelected] = useState("" )

    const onChange = (e)=>{
        console.log(e.target.files)
        setFileSelected(e.target.files[0].name)
        fileHandle(e.target.files[0])
    }

  return (
    <>
    <label htmlFor={id} className={`custom-input ${!fileSelected ? "label-input" : "active"}`}  style={{cursor: "pointer"}} >{fileSelected ? `${fileSelected} is selected ` : text}</label>
    <input type='file' accept={accept} id={id} style={{display : "none"}} onChange={onChange} />
    </>
  )
}

export default FileInput
