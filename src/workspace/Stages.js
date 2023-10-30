import React , {useState , useEffect , useRef} from 'react'
import plus from '../icons/plus.svg'
import edit from '../icons/edit.svg'
import trash from '../icons/trash.svg'
import axios from 'axios'
function Stages({backend_url,SetStep,set_ws_index , project_id , home_Update , set_home_Update }) {

    const sideRef = useRef(null)
    const [dis_bottom , set_dis_bottom ] = useState(0)
    
    useEffect(()=>{
        if (sideRef.current) {
            set_dis_bottom(sideRef.current.clientHeight);
        }
    },[sideRef.current])

    // --------- load data --------------
    const [update , setUpdate] = useState(false)
    const [data , setData] = useState()
            useEffect(()=>{
                getData();
            },[update,project_id])    
            let getData = async () => {
            
                let respons = await fetch (`${backend_url}stage?data=${project_id}`)
                let data = await respons.json()
                setData(data)
            
            }
    
    // -------------- handle stage --------------
    const [stageName , set_stageName] = useState('')

    const [editStage_id , set_editStage_id] = useState(false)
    const [editStageName , set_editStageName ] = useState('')

    const handleStage = async (method_selector)=> {  
        
        const DataForm= new FormData();
        var method
        var valid_data = false
        switch(method_selector) {
            case 0 :
                DataForm.append('name',stageName)
                DataForm.append('id',data?.['project']['id'])
                if (stageName != ''  ) {
                    valid_data = true
                }
                method = 'POST'
                break ;
            case 1 : 
                DataForm.append('name',editStageName)
                DataForm.append('id',editStage_id?.['id'])
                if (editStageName != ''  ) {
                    valid_data = true
                }
                method = 'PUT'
                break ;

        }

        if (valid_data != '') {

            

            await axios ({
              method : method , 
              url : `${backend_url}stage` ,
              data :  DataForm
          })
          .then((response)=>{
                console.log(response.data) ;
                setUpdate(!update)
                set_stageName('')
                set_editStage_id(false)
                set_editStageName('')

    
          }) .catch(function (error) {
              console.log(error)
            });

        }
}

// ------ stage key down -------------- 

    const enterStage = (e)=> {
        if (e.key == 'Enter') {
            handleStage(0)
            set_stageName('')
        }
    }

// ------- add task ----------------
    const [stage_id , set_stage_id ] = useState(-1)
    const [taskName , setTaskName] = useState('')

    const [edit_task , set_edit_task] = useState()

    

    useEffect(()=>{
        if (edit_task) {
            setTaskName(edit_task['name'])
            set_showSteps(editTask['id'])
        }
    },[edit_task])


    const handleTask = async (method , id )=> {
        const DataForm= new FormData();
        DataForm.append('name',taskName)
        DataForm.append('id', id )

       
        
        
        await axios ({
          method : method , 
          url : `${backend_url}task` ,
          data :  DataForm
      })
      .then((response)=>{
            console.log(response.data) ;
            setUpdate(!update)
            setTaskName('')
            set_stage_id(-1)
            set_edit_task()
          
      }) .catch(function (error) {
          console.log(error)
        });

    }

    const addTask =  (e)=> {  
        if (taskName != '' && stage_id != -1 && e.key == 'Enter') {

            handleTask('POST',stage_id)

        }
    }



    const editTask = (e)=> {
        if (taskName != '' && edit_task && e.key == 'Enter') {

            handleTask('PUT',edit_task?.['id'])

        }
    }

    // ---------- add steps ------------
    const [task_id , setTask_id] = useState(-1)
    const [StepName , setStepName] = useState('')
    const [edit_step , set_edit_step] = useState()

    useEffect(()=>{
        if (edit_step) {
            setStepName(edit_step['name'])
        }
    },[edit_step])

    const steps_queries = async( method , id)=> {
        
            const DataForm= new FormData();
            DataForm.append('name',StepName)
            DataForm.append('id', id )
        
            await axios ({
              method : method , 
              url : `${backend_url}step` ,
              data :  DataForm
          })
          .then((response)=>{
                // console.log(response.data) ;
                setUpdate(!update)   
                setStepName('')
                // setTask_id(-1)
                set_edit_step()
              
          }) .catch(function (error) {
              console.log(error)
            });
    }


    const handleSteps = (e)=> {  
        if (StepName != '' && task_id != -1  && e.key == 'Enter') {
            steps_queries('POST',task_id)
        }
    }

    // ----------- Edit Step ---------------

    const Handle_EditStep = (e) => {
        if (StepName != '' && edit_step&& e.key == 'Enter') {
            steps_queries('PUT',edit_step?.['id'])
        }
    }

//    --------- set step ---------
const handle_step = (obj)=> {
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
// ------ ---- calculate done tasks --------

const perc = (ob)=> {
    if (ob['done'] == 0 && ob['total'] == 0 ) {
        return 0 ;
    }else {
        
        return parseInt(ob['done'] / ob['total'] * 100)
    }
}

// ------------ edit project ---------

    const [editProject , setEditProject] = useState(false)
    const [ProjectName , set_ProjectName] = useState('')

    useEffect(()=>{
        if (editProject && data){
            set_ProjectName(data?.['project']['name'])
        }
    },[editProject])

    const handle_editProj = async (e)=> {  
        if (e.key == 'Enter') {

            const DataForm= new FormData();
            var method = 'PUT'     
            DataForm.append('name',ProjectName)
            DataForm.append('id', data?.['project']['id'] )
        
            await axios ({
              method : method , 
              url : `${backend_url}project` ,
              data :  DataForm
          })
          .then((response)=>{
                console.log(response.data) ;
                setUpdate(!update)
                setEditProject(false)
                set_home_Update(!home_Update)
              
          }) .catch(function (error) {
              console.log(error)
            });

        }
    }

    // ----------- edit stage --------------

    useEffect(()=>{
        if (editStage_id ) {
            set_editStageName(editStage_id['name'])
        }
    },[editStage_id])
     

    const handleEditStage = (e)=> {

            if (e.key == 'Enter') {
                handleStage(1)
            }
    }
  




    const Delete = async(id , table)=> {


        const DataForm= new FormData();
            var method = 'DELETE'     
            DataForm.append('id', id )
        
            await axios ({
              method : method , 
              url : backend_url + table ,
              data :  DataForm
          })
          .then((response)=>{
                console.log(response.data) ;
                setUpdate(!update)

                if (table == 'project' ) {
                    set_home_Update(!home_Update)
                    set_ws_index(0)
                }

          }) .catch(function (error) {
              console.log(error)
            });

    }

    // --------------- visual ----------------
    const [showSteps , set_showSteps] = useState(-1) 

    const handleShwoStesp = (id)=> {
        if (showSteps == id ) {
            set_showSteps(-1)
        }else {
            set_showSteps(id)
        }
    }

    // ------------ handle edit task --------
    const handleEditTask = (id)=> {
        console.log(id,'---')
        setTask_id(id)
        set_showSteps(id)
    }
       
    return (
    <div className='Stages workspaceFrame' >   
        <div className='stageHeader'>
            <div className='spacebetween'>
                {
                    editProject ? 
                        <div className=' editproject'>
                            <input value={ProjectName} onKeyDown={(e)=>handle_editProj(e)} onChange={(e)=>set_ProjectName(e.target.value)}  />
                        </div>
                    : <h1  > {data?.['project']['name']}  </h1>

                }
                
                <div className='btns'>
                    <img src={edit} onClick={()=>setEditProject(true)}  />   
                    <img src={trash} onClick={()=>Delete(data?.['project']['id'],'project')} /> 
                </div>
            </div>
            <div className='input_layer center'>
                <p className='center'>stage {parseInt(data?.['stages'].length + 1 )} : </p>
                <input onKeyDown={(e)=>enterStage(e)} onChange={(e)=>set_stageName(e.target.value)} value={stageName} />
            </div>
            <div className='spacebetween save_f'>
                        <div></div>
                        <button className='save_btn center' onClick={()=>handleStage(0)} >Save</button>
            </div>
        </div>

        <div>

               {
                    data?.['stages'].map((ob,i)=>
                            <div className='stageBox center' key={i} ref={sideRef} >
                            <li className='center'><span className='center'>{i+1}</span></li>

                                <div   className='side center'>
                                    
                                </div>
                                <div className='shows'>  
                                    <div className=' stageH2 spacebetween' >
                                        {
                                                editStage_id?.['id'] == ob['id'] ?  
                                                <input onKeyDown={(e)=>handleEditStage(e)} onChange={(e)=>set_editStageName(e.target.value)} value={editStageName}  /> 
                                                : 
                                                    
                                                    <h2 >{ob['name']}</h2>

                                            }   
                                        <div className='center' >
                                                <img src={edit} onClick={()=>set_editStage_id(ob)} />
                                                <img src={trash}  onClick={()=>Delete(ob['id'],'stage')}  />  
                                                <img src={plus} onClick={()=>set_stage_id(ob['id'])}  />
                                            </div>
                                    </div>  
                                    {
                                        ob['todo'].map((oc,c)=>
                                            <div className={c%2 ? 'task task_c ' : 'task '} key={c}>
        
                                                <div className='spacebetween' >
                                                    {
                                                        (edit_task?.['id'] == oc['task']['id'] ) ?
                                                             <input className='taskEdit' onKeyDown={(e)=>editTask(e)} onChange={(e)=>setTaskName(e.target.value)} value={taskName}  />
                                                        :
                                                            <p onClick={()=>handleShwoStesp(oc['task']['id'])} >{oc['task']['name']}</p>
                                                    }

                                                        <div className='prop'>
                                                            <p className='center' > {perc(oc['statistics'])} %</p>
                                                            <div className='center' >
                                                                <img src={edit} onClick={() => set_edit_task(oc['task'])} />-
                                                                <img src={trash} onClick={()=>Delete(oc['task']['id'],'task')} />
                                                                <img src={plus} onClick={() => handleEditTask(oc['task']['id'])}  />
                                                            </div>
                                                        </div>

                                                </div>
                                              {
                                                (oc['task']['id'] == showSteps) ?
                                                <div className='steps'  >
                                                    {
                                                        
                                                            oc['steps'].map((os,s)=>
                                                                <div key={s} className='stepBox spacebetween' >    
                                                                {
                                                                    edit_step?.['id'] == os['id'] ?      
                                                                        <input onChange={(e)=>setStepName(e.target.value)} value={StepName}  onKeyDown={(e)=>Handle_EditStep(e)}  />   
                                                                    : 
                                                                        <p className={os['done']  ? 'done' : '' } onClick={()=>handle_step(os)} >{os['name']}</p>

                                                                }
                                                                    <div className='icons' >
                                                                        <img src={edit} onClick={()=>set_edit_step(os)}  />
                                                                        <img src={trash} onClick={()=>Delete(os['id'],'step')}  />
                                                                    </div>
                                                                </div>
                                                            )
                                                 
                                                    }
                                                 
                                                    {
                                                        ( task_id == oc['task']['id'] ) ? 

                                                        <div className='input_layer'> 
                                                            <input onKeyDown={(e)=>handleSteps(e)} onChange={(e)=>setStepName(e.target.value)} value={StepName} />
                                                        </div>
                                                        : ''
                                                    }
                                                </div>
                                                : ''
                                                }

                                            </div>
                                        )
                                    }
                                
                                    {
                                        stage_id == ob['id'] ?    
                                            <div className='task inputL spacebetween'>
                                                <input onKeyDown={(e)=>addTask(e)} onChange={(e)=>setTaskName(e.target.value)} value={taskName}  />
                                            </div>
                                        : ''
                                    }

                                </div>
                            </div>
                    )
                } 

        </div>

        {/* <div className='stageBox current center' ref={sideRef} >
            <li className='center'><span className='center'>2</span></li>
            <div  style={{height :dis_bottom }} className='side center'>
                <div className='line'></div>
            </div>
            <div className='shows'>  
                <h2>Stage name</h2>
                <div className='task spacebetween'>
                    <p>Task Name</p>
                    <div className='prop'>
                        <p className='center' >50%</p>
                        <div className='center' >
                            <img src={edit} />
                            <img src={trash}  />
                        </div>
                    </div>
                </div>
                 <div className='task spacebetween'>
                    <p>Task Name</p>
                    <div className='prop'>
                        <p className='center' >50%</p>
                        <div className='center' >
                            <img src={edit} />
                            <img src={trash}  />
                        </div>
                    </div>
                </div>
                <div className='task task_c spacebetween'>
                    <p>Task Name</p>
                    <div className='prop'>
                        <p className='center' >50%</p>
                        <div className='center' >
                            <img src={edit} />
                            <img src={trash}  />
                        </div>
                    </div>
                </div>
                <div className='task spacebetween'>
                    <p>Task Name</p>
                    <div className='prop'>
                        <p className='center' >50%</p>
                        <div className='center' >
                            <img src={edit} />
                            <img src={trash}  />
                        </div>
                    </div>
                </div>

            </div>
        </div> */}
    </div>
  )
}

export default Stages