import React , {useEffect, useState} from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
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


const handleEdit = (task_id)=>{
navigate(`/update/${task_id}`)
}

const handleCreate = ()=>{
navigate('/create')
}



  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
{isAuthenticated?<div className="flex flex-col p-5 w-full mt-3"
>  <div className='flex w-10/12 justify-between mt-20'><p className='text-lg md:text-3xl'>Welcome back to your notes</p> <button className='border border-black text-md text-green md:px-1 py-1 rounded-lg
             hover:bg-purple-600 hover:text-white 
             transition duration-200' onClick={handleCreate}><Plus className=' h-3.5 md:h-6'></Plus></button></div>
{tasks.length>0?<div className='flex gap-4  w-full flex-wrap'>
  {tasks.map(task=>{
    return <NoteCard title={task.title} content={task.content} key={task._id} onDelete={()=>{deleteTask(task._id)}} onEdit={()=>{handleEdit(task._id)}}></NoteCard>
  })}
</div>:<div className='flex justify-center text-sm mt-5'>No notes yet</div>}














  
</div>

:<section className='w-full mt-16 px-5 pb-12 bg-white text-black flex justify-center'>
    <div className='w-full max-w-4xl rounded-2xl border border-black/10 shadow-md bg-white'>
      <div className='p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
        <div className='space-y-3 text-black'>
          <h2 className='text-3xl md:text-4xl font-semibold leading-tight'>A simple notes app.</h2>
          <p className='text-base md:text-lg text-black/70'>Write. Save. Come back later. Nothing else.</p>
        </div>
        <div className='flex gap-3'>
          <Link to='/signup' className='px-4 py-2.5 rounded-full bg-black text-white font-semibold shadow hover:-translate-y-0.5 transition duration-200'>Sign up free</Link>
          <Link to='/login' className='px-4 py-2.5 rounded-full border border-black/20 text-black hover:bg-black/5 transition duration-200'>Login</Link>
        </div>
      </div>
    </div>
  </section>}
      </div>

      <div className='w-full mt-10 p-12 flex justify-center items-end'>
        <div className='flex flex-col items-center gap-3 text-sm text-black/80'>
          <div className='flex items-center gap-2 footer-dots'>
            <span className='footer-dot dot-red'></span>
            <span className='footer-dot dot-blue'></span>
            <span className='footer-dot dot-yellow'></span>
            <span className='footer-dot dot-green'></span>
          </div>
          <p className='text-center text-black text-sm'>
            Made by — a student who found other notes apps confusing, so this one stays simple.
          </p>
          <p className='text-center text-black/70 text-xs'>© 2026 Yaksh. All rights reserved.</p>
        </div>
      </div>
    </div>


  )
}
