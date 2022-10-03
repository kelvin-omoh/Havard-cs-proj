import React from 'react'
import Listitems from './Listitems'

const Content = ({items,handleClick,handleDelete }) => {
   
  return (
    <main>
      
      {items.length ? (

              <Listitems
              items={items}
              handleClick={handleClick}
              handleDelete={handleDelete}
              />

                ) : 

            <p style={{color:"red" 
              , background:'rgb(230, 230, 230)'
              ,padding:"4rem",
              margin:"auto 0",
              textTransform:"capitalize",
            
              }} >Your list is empty.</p>}
              
    </main>
  )
}

export default Content
