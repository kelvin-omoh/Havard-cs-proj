import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
const Line_item  = ({handleClick,handleDelete ,item}) => {
  return (
    <li key={item.id}>
    <input onChange={()=>handleClick(item.id)} type="checkbox" checked={item.checked} name="" id="" /> 
    <label className='label' htmlFor=""
    style={(item.checked) ? {textDecoration:"line-through"}:null}
    onDoubleClick={()=>handleClick(item.id)} type="checkbox" checked={item.checked}
    
    >{item.item} </label>
    < FaTrashAlt 
         onClick={()=>handleDelete(item.id)}
       role="button"
       tabIndex="0"
    />
   
   

       
  </li>
  )
}

export default Line_item 
