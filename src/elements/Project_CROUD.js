import React from 'react'
import CROUD from './CROUD'

function Project_CROUD({set_ws_index}) {

    const handle_add_prject = ()=> {
        set_ws_index(1.1)
    }




  return (
    <div className='Project_CROUD'>
        <CROUD H_plus={handle_add_prject} />
    </div>
  )
}

export default Project_CROUD