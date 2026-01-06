import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const sub = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setText("");
  };

  const nav = async () => {
    await navigate(-1);
  };

  const aler = async () => {
    await alert("This service is under development please user E-mail to contact");
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      
   
      <div className="px-4 pt-4">
        <button
          className=" bg-slate-700 hover:bg-slate-600 active:bg-slate-700 text-slate-100 font-semibold px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 border cursor-pointer active:scale-95"
          onClick={nav}
        >
          Back
        </button>
      </div>

    
      <div className="flex flex-1 justify-center items-center px-4 py-6">
        <div className="bg-slate-800 rounded-2xl px-6 py-6 w-full max-w-4xl">

          <div className="flex flex-col md:flex-row gap-8 items-center">

            <div className="text-center md:text-left">
              <p className="font-semibold mb-2">E-mail:</p>
              <a
                href="mailto:prajapatsaurabh190@gmail.com"
                className="text-slate-300 break-all"
              >
                prajapatsaurabh190@gmail.com
              </a>
            </div>

        
            <div className="hidden md:block w-px bg-gray-500 h-40" />

        
            <form
              onSubmit={sub}
              className="flex flex-col gap-3 w-full md:w-1/2"
            >
              <label>Name</label>
              <input
                className="border-2 border-slate-500 h-10 rounded px-3 text-slate-100"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>E-mail</label>
              <input
                className="border-2 border-slate-500 h-10 rounded px-3 text-slate-100"
                type="email"
                placeholder="Your E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Message</label>
              <textarea
                className="border-2 border-slate-500 rounded px-3 py-2 h-28 text-slate-100 resize-none"
                placeholder="Message / Feedback"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <button
                type="submit"
                className=" bg-slate-900 hover:bg-slate-600 active:bg-slate-700 text-slate-100 font-semibold px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 mt-2 border-2 border-slate-500 h-11 active:scale-95 cursor-pointer"
                onClick={aler}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
