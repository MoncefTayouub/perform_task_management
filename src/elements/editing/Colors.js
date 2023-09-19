import React , {useEffect , useState , useRef} from 'react'
import arrow_back from '../../icons/arrow_back.svg'
import axios from 'axios'



function Colors({set_ws_index,backend_url,setUpdate,update}) { 

    const [quote , set_quote ] = useState('')
    
         // --------- load data ------------------ 

         const save_change = async ()=> {
            const DataForm= new FormData();
            var method = 'PUT'
            DataForm.append('quote',quote)
        
            await axios ({
              method : method , 
              url : `${backend_url}general` ,
              data :  DataForm
          })
          .then((response)=>{
                console.log(response.data) ;
                setUpdate(!update)
                set_ws_index(0)
              
          }) .catch(function (error) {
              console.log(error)
            });
   
          
    }
  return (
    <div className='null_input'>
                    <img src={arrow_back} className='back_btn' onClick={()=>set_ws_index(0)} />
                    <h2 className='mb'>Favorite quote</h2>
                    <textarea onChange={(e)=>set_quote(e.target.value)}  /> 
                    <div className='center'>
                        <div className='input_box center'>
                            <div className='galerie'></div>
                            <h2 >BGC </h2>
                            <input />
                        </div>
                        <div className='input_box spacebetween'>
                           <div className='galerie'></div>
                            <h2>Secondary BGC </h2>
                            <input />
                        </div>
                        <div className='input_box spacebetween'>
                            <div className='galerie'></div>
                            <h2>Text color  </h2>
                            <input />
                        </div>
                        
                        </div>     
                    <div className='spacebetween save_f'>
                        <div></div>
                        <button className='save_btn center' onClick={()=>save_change()}>Save</button>
                    </div>
                </div>
  )
}

export default Colors