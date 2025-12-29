import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const [name, setName] = useState(" ");
    const [email, setEmail] = useState("");
    const [text,setText] = useState("");
    const navigate = useNavigate();
    const sub = (e) => {
        e.preventDefault();
        setName("");
        setEmail("");
        setText("");
    }
    const nav = async () => {
        await navigate(-1);
    }
  return (
    <div className='h-screen bg-black text-white flex flex-col justify-center items-center'>
        <div className='flex ml-[45%]'>
            <button className='border rounded w-15 font-bold cursor-pointer bg-red-700 text-black' onClick={nav}>Back</button>
        </div>
        <div className='flex bg-neutral-700 text-white justify-center items-center gap-20 rounded-2xl px-10 py-10 font-semibold'>
        <div>
            <span>E-mail:</span><br />
            <a href="mailto:">prajapatsaurabh190@gmail.com</a>
        </div><hr />
        <div className='flex flex-col gap-2'>
            <label htmlFor="name">Name:
            </label>
            <input className='border-2 w-70 h-10 rounded' type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
            <label htmlFor="email">E-mail:</label>
            <input className='border-2 h-10 w-70 rounded' type="email" placeholder='Your E-mail' onChange={(e)=> setEmail(e.target.value)} value={email} />
            <label htmlFor="message">Message:</label>
            <textarea className='border-2 rounded' placeholder='Message/FeedBack' name="message" id="message" onChange={(e) => setText(e.target.value)} value={text}>Write Your Message</textarea>
            <button className='border-2 rounded-xl h-13 cursor-pointer bg-red-400 active:scale-95 text-black font-bold' onClick={sub} type='submit'>Submit</button>
        </div>
        </div>
    </div>
  )
}

export default Contact
