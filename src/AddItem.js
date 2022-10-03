import React, { useRef } from 'react'
import {IoMdSend} from "react-icons/io"
const AddItem = ({   newItem,   setNewItem,handleSubmit}) => {
    const inputRef=useRef()
  return (
    <form className='addForm' onSubmit={handleSubmit}>
      <label htmlFor="addForm"></label>
      <input type="text"
      placeholder='Add item'
      autoFocus
      ref={inputRef}
      id='additem'
      required
      value={newItem}
      onChange={(e)=>setNewItem(e.target.value)}
      />
      <button type='submit' onClick={()=>inputRef.current.focus()} aria-label=''  >
         <IoMdSend/>
      </button>
    </form>

  )
}

export default AddItem
