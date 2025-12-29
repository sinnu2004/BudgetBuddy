
import { signInWithPopup } from 'firebase/auth'
import { auth, authProvider } from '../../firebase'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const navigate = useNavigate();
  async function signIn(){
    try {
      await signInWithPopup(auth ,authProvider);
      console.log("user authentication", auth);
      setSignState("Sign In");
      navigate('/');
    } catch (error) {
      console.log(error);
      alert(error);
    } 
  } 


  
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-[#2C5364] via-[#203A43] to-[#0F2027]'>
      <div className='font-bold text-2xl text-emerald-100 mb-5'>Welcome To The BudgetBuddy!</div>
      <div>
        <h1 className='mb-5 font-bold text-xl text-emerald-100'>{signState} with Google</h1>
      </div>
      <div>
        <img className='h-20 rounded-full w-30 cursor-pointer active:scale-95' src="src/assets/googleLogo.png" alt="" onClick={signIn} />
      </div>
    </div>
  ) 
} 

export default Login 
