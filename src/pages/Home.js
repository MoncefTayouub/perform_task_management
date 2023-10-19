import React , {useState , useRef , useEffect} from 'react'
import edit from '../icons/edit.svg'
import trash from '../icons/trash.svg'
import Colors from '../elements/editing/Colors'
import Adding_project from '../elements/adding/Adding_project'
import Add_project from '../workspace/Add_project'
import Stages from '../workspace/Stages'
import ErrorPage from '../elements/ErrorPage'
import axios from 'axios'
function Home({backend_url}) {

    // ---------- load data ------------ 
        const [data , setData] = useState()
        const [update , setUpdate] = useState(false)
            useEffect(()=>{
                getData();
            },[update])          
            let getData = async () => {
            
                let respons = await fetch (`${backend_url}`)
                let data = await respons.json()
                setData(data)
            
            }
    // ----------- sidebare ------------
        const [side_hover , set_side_hover] = useState(false)
        const [ws_index , set_ws_index] = useState(0)

    // -------------- handle quote ---------
        const quote_ref = useRef(null)
        const [quote_dis_top , set_quote_dis_top] = useState(0) 
        useEffect(()=> {
            if (quote_ref.current) {
                set_quote_dis_top(quote_ref.current.getBoundingClientRect().top)
            }
        },[quote_ref])


    // -------- select project -----------------
    const [project_id , set_project_id ] = useState(-1)
    const handle_show_project = (id)=> {
        set_project_id(id)
        set_ws_index(1.1)
    }
       

    // -------- workspace switch----------

    // Set data in Local Storage


    
        // Get data from Local Storage
        // const user = JSON.parse(localStorage.getItem('user'));

        var workspace = <div></div> 
    // -------- set step -----------

    const SetStep = async (obj,done)=> {  
      

            const DataForm= new FormData();
            var method = 'PUT'     
            DataForm.append('name',obj['name'])
            DataForm.append('id', obj['id'] )
            DataForm.append('done', done )
        
            await axios ({
              method : method , 
              url : `${backend_url}step` ,
              data :  DataForm
          })
          .then((response)=>{
                console.log(response.data) ;
                return 1 
              
          }) .catch(function (error) {
              console.log(error)
            });

        
    }
       

    
    switch (ws_index) {   
        case 0 : 
            workspace = <div className='null center'>
                <img 
                src={edit} 
                style={{top : quote_dis_top == 0 ? 300 : quote_dis_top-10 }}  
                className='edit_btn' 
                onClick={()=>set_ws_index(0.1)}
                />
                <p ref = {quote_ref} >
                    {
                        data?.['general']['quote'] == '' ? 
                         'the world belongs to the risk-takers , who bet on themselves when no one else will '
                         : data?.['general']['quote']
                        }
                     
                 </p>
            </div> 
            break ;
            case 0.1 : 
                workspace = <Colors update={update} setUpdate={setUpdate}  set_ws_index={set_ws_index} backend_url={backend_url} />
            break ;
            
            case 1.1 : 
                workspace = <Add_project SetStep={SetStep} set_ws_index={set_ws_index} backend_url={backend_url} project_id={project_id} />
            break ;
            
            case 2.1 : 
                workspace = <Stages home_Update={update} set_home_Update={setUpdate} SetStep={SetStep} set_ws_index={set_ws_index} backend_url={backend_url} project_id={project_id} />
            break ;

            case 404 : 
                workspace = <ErrorPage />
            break ;
            }


    // ---------- network connections -------------

    const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnlineStatusChange() {
      setIsOnline(navigator.onLine);
    }

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  useEffect(()=>{
        if(!isOnline) {
            set_ws_index(404)
        }
  },[isOnline])

  console.log(isOnline)


    return (
    <div className='Home center'>
        <div className={side_hover ? 'sideBare scrollingDiv' : 'sideBare '}
            onMouseEnter={()=>set_side_hover(true)}
            onMouseLeave={()=>set_side_hover(false)}
        >
            
            <div className='navbar spacebetween'>
               
                    <Adding_project backend_url={backend_url} update={update} setUpdate={setUpdate} />   
             
            </div>
            {
                data?.['projects'].map((ob,i)=>
                    <div className='project center' key={i}  >
                        <p className={(project_id == ob['id']) ? 'p_current' : ''} onClick={()=>handle_show_project(ob['id'])}>{ob['name']}</p>
                    </div>
                )
            }
           

        </div>
        <div className='workspace scrollingDiv'>
            {workspace}
        </div>
        <div ></div>
    </div>
  )
}

export default Home