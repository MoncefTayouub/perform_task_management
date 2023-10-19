import React ,{useState , useEffect , useRef} from 'react'
import plus from '../icons/plus.svg'
import edit from '../icons/edit.svg'
import trash from '../icons/trash.svg'
function Add_project({project_id,backend_url , set_ws_index,SetStep}) {

    const [update , setUpdate] = useState(false)
    const [data , setData] = useState()
            useEffect(()=>{
                getData();
            },[update,project_id])    
            let getData = async () => {
            
                let respons = await fetch (`${backend_url}project?data=${project_id}`)
                let data = await respons.json()
                setData(data)
            
            }


            const perc = (ob)=> {
                
                if (ob['done'] == 0 && ob['total'] == 0 ) {
                    return 0 ;
                }else {
                    
                    return parseInt(ob['done'] / ob['total'] * 100)
                }
            }

            // ---------------- show steps ----------------

            const [showSteps , set_showSteps] = useState(-1)

            const handle_shwostesp = (id)=> {
                if (showSteps == id) {
                    set_showSteps(-1)
                }else {
                    set_showSteps(id)
                }
            }

            // ----- set Step --------- 

            const handleStep = (obj)=> {
                var rt 
                if( obj['done'] ) {
                    rt = SetStep(obj,'False')
                }else {
                    rt = SetStep(obj,'True')
                }
                if (rt) {
                    setUpdate(!update)
                } 
            }

            useEffect(()=>{
                if (data) {
                   if (data?.['stage'] == null) {
                    set_ws_index(2.1)
                   }
                }

            },[data])

            return (
    <div className='Add_project'>
        <div className='spacebetween c90 the_top'>
            <h1>{data?.['project']['name']}</h1>
            <div className='cr_icons center'>
              
            </div>
        </div>
            
                <div className='spacebetween stageHeader c90'>
                    <h2>{data?.['stage']?.['stage']['name']}</h2>
                    <p>{data?.['stage']?.['currentStage']}/{data?.['stage']?.['totalStages']} | <span onClick={()=>set_ws_index(2.1)}>ALL</span> </p>
                </div>
        {
            (data?.['stage'] != null ) ?
            <>
                {
                    data?.['stage']['tasks'].map((ob,i)=>
                        <div className={i%2 ? 'task_small  task_small_bg ' : 'task_small '} key={i}>
                            <div className='spacebetween' >
        
                                        <p onClick={()=>handle_shwostesp(ob['task']['id'])}  className='tn'>{ob['task']['name']}</p>
        
                                        <div className='data center'>
                                            <div className='btns'>
                                                <p className='center' >{perc(ob['statistics'])}%</p>
                                                
                                        </div>
                                        </div>
                            </div>
                            {
                                showSteps == ob['task']['id'] ?
        
                                        <div className='steps'>
                                            {
                                                ob['steps'].map((oc,c)=>
                                                    <p onClick={()=>handleStep(oc)} className={oc['done']? 'done':'' } key={c}>{oc['name']}</p>
                                                )
                                            }
                                        
                                        </div>
                                : ''
                            }
        
                        </div>
                    )
                }
            </> 
            : ''
        }
       
    </div>
  )
}

export default Add_project