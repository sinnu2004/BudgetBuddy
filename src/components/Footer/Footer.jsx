import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-100 rounded-2xl mx-[2%] mt-5 px-4 py-6">
      
      <div className=" mx-auto flex flex-col items-center gap-6">

       
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-center">
         
          <ul className="space-y-2 font-semibold">
            <li className="cursor-pointer hover:text-slate-400">Home</li>
            <li className="cursor-pointer hover:text-slate-400">Dashboard</li>
            <li className="cursor-pointer hover:text-slate-400">Compare</li>
          </ul>

          
          <ul className="space-y-2 font-semibold">
            <li className="cursor-pointer hover:text-slate-400">Instagram</li>
            <li className="cursor-pointer hover:text-slate-400">Facebook</li>
            <li className="cursor-pointer hover:text-slate-400">GitHub</li>
          </ul>
        </div>

        <p className="text-sm sm:text-base text-center opacity-90">
          © {new Date().getFullYear()} BudgetBuddy. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;

