import { signOut } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
const Navbar = () => {
    const Logout = async ()=>{
      try {
        await signOut(auth);
        console.log("Signed Out successfully");
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className='bg-neutral-700 text-white rounded-2xl ml-[2%] mr-[2%] flex items-center justify-between px-5 py-5'>
      <div className='flex items-center gap-2'>
        <img className='h-5 w-5' src="src/assets/react.svg" alt="logo-img" />
        <h1 className='font-bold'>BudgetBuddy</h1>
      </div>  
      <div className='flex gap-5 cursor-pointer font-semibold'>
        <Link to='/'>Home</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/compare'>Compare</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/login' onClick={Logout}>Logout</Link>
      </div>
    </div>
  )
}

export default Navbar
