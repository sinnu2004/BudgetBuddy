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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
   
      <div className="px-4 pt-4">
        <button
          className="border cursor-pointer rounded px-4 py-1 font-bold bg-red-700 text-black active:scale-95"
          onClick={nav}
        >
          Back
        </button>
      </div>

    
      <div className="flex flex-1 justify-center items-center px-4 py-6">
        <div className="bg-neutral-700 rounded-2xl px-6 py-6 w-full max-w-4xl">

          <div className="flex flex-col md:flex-row gap-8 items-center">

            <div className="text-center md:text-left">
              <p className="font-semibold mb-2">E-mail:</p>
              <a
                href="mailto:prajapatsaurabh190@gmail.com"
                className="text-red-400 break-all"
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
                className="border-2 h-10 rounded px-3 text-black"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>E-mail</label>
              <input
                className="border-2 h-10 rounded px-3 text-black"
                type="email"
                placeholder="Your E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Message</label>
              <textarea
                className="border-2 rounded px-3 py-2 h-28 text-black resize-none"
                placeholder="Message / Feedback"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <button
                type="submit"
                className="mt-2 border-2 rounded-xl h-11 bg-red-400 text-black font-bold active:scale-95"
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
