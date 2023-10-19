import React from 'react'
import error_network from '../icons/error_network.svg'
import reload from '../icons/reload.svg'

function ErrorPage() {
    const reloadP = ()=> {
        window.location.reload();
    }
  return (
    <div className='ErrorPage center'>
        <div className='errormsg center'>
            <p>404</p>
            <img src={error_network} />
        </div>
        <p className='er_msg'>Error</p>
        <button className='center' onClick={()=>reloadP()}><p>Reload</p> <img src={reload}/></button>



  
    </div>
  )
}

export default ErrorPage