import React from 'react'
import plus from '../icons/plus.svg'
import trash from '../icons/trash.svg'
import edit from '../icons/edit.svg'
export default function CROUD({H_plus,H_trash,H_edit}) {

  


  return (
    <div className='CROUD'>
        <img src={plus} onClick={()=>H_plus()}  />
        <img src={trash}  onClick={()=>H_trash()}  />
        <img src={edit} onClick={()=>H_edit()}  />
    </div>
  )
}
