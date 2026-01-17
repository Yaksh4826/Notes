import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext)
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  const toggleMenu = () => setOpen((prev) => !prev)
  const closeMenu = () => setOpen(false)

  return (
    <div className='w-full bg-black text-white font-rl-madena fixed z-10 shadow'>
      <div className='max-w-6xl mx-auto px-4 h-14 flex items-center justify-between'>
        <Link to='/' className='text-lg font-semibold' onClick={closeMenu}>Notes</Link>

        <button className='md:hidden p-2 rounded-md hover:bg-white/10 transition' onClick={toggleMenu} aria-label='Toggle menu'>
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>

        <div className='hidden md:flex gap-4 items-center'>
          {isAuthenticated ? (
            <div className='flex gap-2 items-center'>
              <Link to={`/profile/${user?.id}`}>Profile</Link>
              <button className="border border-white text-md text-white px-2 py-1 rounded-md 
             hover:bg-white hover:text-red-500 
             transition duration-200" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className='flex gap-2 items-center'>
              <Link to='/signup'>SignUp</Link>
              <Link to='/login'>Login</Link>
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className='md:hidden bg-black/95 border-t border-white/10'>
          <div className='flex flex-col px-4 py-3 gap-3'>
            {isAuthenticated ? (
              <>
                <Link to={`/profile/${user?.id}`} onClick={closeMenu}>Profile</Link>
                <button className="border border-white text-md text-white px-2 py-2 rounded-md 
             hover:bg-white hover:text-red-500 
             transition duration-200 text-left" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to='/signup' onClick={closeMenu}>SignUp</Link>
                <Link to='/login' onClick={closeMenu}>Login</Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
