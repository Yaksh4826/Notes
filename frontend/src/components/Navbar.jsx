import React , {useContext, useEffect} from 'react'
import { AuthContext } from '../context/authContext'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const {isAuthenticated , user, logout}   = useContext(AuthContext);
const handleLogout = (e)=>{
logout()
}



useEffect(()=>{
console.log(user)
console.log(isAuthenticated)
}, [])


  return (
    <div className='w-full h-13 bg-black text-white font-rl-madena flex justify-around items-center fixed z-10'>
<Link to='/'>Notes</Link>
<div className='flex gap-4'>




{isAuthenticated?<div className='flex gap-2 justify-center items-center'><Link to={`/profile/${user?.id}`}>Profile</Link>
   <button className="border border-white text-md text-white px-2 py-1 rounded-md 
             hover:bg-white hover:text-red-500 
             transition duration-200" onClick={handleLogout}>Logout</button>
</div>:
 <div className='flex gap-2 justify-center items-center'><Link to='/signup'>SignUp</Link>
 <Link to='/login'>Login</Link></div>
}




</div>
    </div>
  )
}
