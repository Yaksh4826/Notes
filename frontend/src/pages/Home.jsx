import React , {useEffect, useState} from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { Link ,useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import NoteCard from '../components/NoteCard'
import api from '../api/axios'



export const Home = () => {
const {user , isAuthenticated} = useContext(AuthContext);
const [tasks ,setTasks] = useState([]);
const  navigate = useNavigate();


const getTasks = async () => {
  let response = await api.get("/tasks");
  if(response.data?.success){
    console.log(response.data)
    setTasks(response.data.tasks.reverse());
    
  }
}




const deleteTask = async (task_id)=>{

const filtered_tasks = tasks.filter(task=>task._id!=task_id)
setTasks(filtered_tasks);
let response= await api.delete(`/tasks/${task_id}`);

}


useEffect(()=>{

getTasks();

}, []);


const handleCreate = ()=>{
navigate('/create')
}



  return (
   
<div>
{isAuthenticated?<div className="flex flex-col p-5 w-full mt-3"
>  <div className='flex w-10/12 justify-between mt-20'><p className='text-lg md:text-3xl'>Welcome back to your notes</p> <button className='border border-black text-md text-green md:px-1 py-1 rounded-lg
             hover:bg-purple-600 hover:text-white 
             transition duration-200' onClick={handleCreate}><Plus className=' h-3.5 md:h-6'></Plus></button></div>
{tasks.length>0?<div className='flex gap-4  w-full flex-wrap'>
  {tasks.map(task=>{
    return <NoteCard title={task.title} content={task.content} key={task._id} onDelete={()=>{deleteTask(task._id)}}></NoteCard>
  })}
</div>:<div className='flex justify-center text-sm'>No notes yet</div>}
















  
</div>

:<div className='flex flex-col justify-center items-center w-full mt-3  gap-5'>
  <img src="/bg_home.png" alt="" className='w-full max-w-md h-auto border-1 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1'/>
  <p className='text-3xl'>Welcome to the notes</p>
  <p className='text-lg'>New here ?  <Link className='border p-1 rounded-md text-lg bg-black text-white' to='/signup'> Sign up</Link></p> 
  <p className='text-lg'>Already have an account?  <Link className='border p-1 rounded-md text-lg bg-blue-800 text-white' to='/login'> Login</Link></p>
  </div>}

</div>


  )
}
