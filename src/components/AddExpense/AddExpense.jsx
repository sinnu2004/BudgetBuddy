import React, { useState } from 'react'
import { auth, db } from '../../firebase'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { serverTimestamp  } from 'firebase/firestore'
import { useAuth } from '../../context/AuthContext'


const AddExpense = () => {

  const [amount, setAmount] = useState("");
  const [cate, setCategory] = useState(""); 
  const [desc, setDesc] = useState("");

  const {user, loading} = useAuth();
  if(loading) return <p>Loading...</p>;
  if(!user) return <p>Please Login</p>;
  
  const username = user.displayName || user.email;
  const uid = auth.currentUser.email; 

  const data = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "user", uid, "expense"), {
        category: cate,
        amount: Number(amount),
        desc: desc,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding document:", error); 
    }
    setCategory("");
    setAmount("");
  };

  return ( 
    <div className='bg-neutral-700 text-white mt-5 rounded-4xl ml-[2%] mr-[2%] flex flex-col items-center '>
      <div className='font-extrabold text-2xl pt-5'>
        <h1 className=''>Welcome {username}</h1>
      </div>
      <form onSubmit={data} className='pt-10'>
        <h1 className='font-bold pb-2'>Add Expense</h1><hr className='' />
        <div className='flex flex-col gap-10 pt-5'>
          <div className='flex gap-10'>
              <div className='flex  items-center gap-5'>
              <input id='category' name='category' className='w-120 border-2 border-white rounded h-12 px-2' type="text" placeholder='Category' required value={cate} onChange={(e)=>{
                setCategory(e.target.value);
              }}/>
              </div>
              <div className='flex items-center gap-2'> 
                <input id='amount' name='amount' className='w-120 border-2 rounded h-12 ml-6 px-2' type="number" placeholder='Amount' required value={amount} onChange={(e)=>{
                  setAmount(e.target.value);
                }} />
                <span className='font-bold text-xl'>₹</span>
              </div> 
          </div>
          <div>
              <textarea name="desc" id="desc" placeholder='Description (optional)' className='text-white w-full border-2 h-30 rounded-xl px-5 py-2' value={desc} onChange={(e)=>{
                setDesc(e.target.value);
              }}></textarea>
          </div>
          <div className='flex justify-center'>
              <button className='bg-blue-500 h-10 w-40 rounded flex justify-center items-center mb-4 cursor-pointer font-semibold uppercase active:scale-95' type='submit'>Add Expense</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddExpense
