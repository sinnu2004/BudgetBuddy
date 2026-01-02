import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const Logout = async () => {
    try {
      await signOut(auth);
      console.log("Signed Out successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-neutral-700 text-white rounded-2xl mx-[2%] px-5 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img className="h-6 w-6" src="src/assets/react.svg" alt="logo" />
          <h1 className="font-bold text-lg">BudgetBuddy</h1>
        </div>

        <div className="hidden md:flex gap-6 font-semibold">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/compare">Compare</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" onClick={Logout}>Logout</Link>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 font-semibold bg-neutral-800 rounded-xl p-4">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/compare" onClick={() => setIsOpen(false)}>Compare</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/login" onClick={Logout}>Logout</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
