import React from 'react'
import Line_item from './Line_item '

const Listitems = ({handleClick,handleDelete,items}) => {
  return (
    <ul>
    {/* <div className="k">
      ol
    </div> */}
  {items.map((item)=>(
      
     <Line_item 
     key={item.id}
     handleClick={handleClick}
     handleDelete={handleDelete}
     item={item} />
  ))}

</ul>
  )
}

export default Listitems
