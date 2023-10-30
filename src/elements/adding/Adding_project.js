import React , {useState , useEffect , useRef} from 'react'
import plus from '../../icons/plus.svg'
import axios from 'axios';
function Adding_project({backend_url ,setUpdate,update}) {

    const [project , setProject ] = useState('')

    const handle_add_project = async ()=> {
        if (project != '') {

            const DataForm= new FormData();
            var method = 'POST'
            DataForm.append('name',project)
            
            await axios ({
              method : method , 
              url : `${backend_url}project` ,
              data :  DataForm
          })
          .then((response)=>{
                console.log(response.data) ;
                setProject('')
                setUpdate(!update)
              
          }) .catch(function (error) {
              console.log(error)
            });
        }
    }

    const handleKeyDown = (e)=> {
        if (e.key == 'Enter') {
            handle_add_project()
        }
    } 


  return (
    <div className='Adding_project center'>   
        <div className='input spacebetween'>
            <input placeholder='Taking the next project' onKeyDown={(e)=>handleKeyDown(e)} onChange={(e)=>setProject(e.target.value)} value={project} />
            <img src={plus} onClick={()=> handle_add_project()} />
        </div>
    </div>
  )
}

export default Adding_project