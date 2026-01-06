import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [cate, setCategory] = useState("");
  const [desc, setDesc] = useState("");

  const { user, loading } = useAuth();
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">Please Login</p>;

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
    setDesc("");
  };

  return (
    <div className="bg-slate-800 text-white mt-5 rounded-2xl mx-[2%] px-4 py-6">
      
      
      <h1 className="text-center font-extrabold text-xl sm:text-2xl text-slate-100">
        Welcome {username}
      </h1>

      <form onSubmit={data} className="mt-8 max-w-4xl mx-auto">
        <h2 className="font-bold text-slate-400 text-lg mb-2">Add Expense</h2>
        <hr className="border-slate-500 mb-6" />

        <div className="flex flex-col gap-6">

          <div className="flex flex-col md:flex-row gap-6">
    
            <input
              id="category"
              name="category"
              type="text"
              placeholder="Category"
              required
              value={cate}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-1/2 h-12 border-2 border-slate-400 bg-transparent rounded px-3 outline-none"
            />

        
            <div className="flex items-center gap-2 w-full md:w-1/2">
              <input
                id="amount"
                name="amount"
                type="number"
                placeholder="Amount"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-12 border-2 border-slate-400 bg-transparent rounded px-3 outline-none"
              />
              <span className="font-bold text-xl">₹</span>
            </div>
          </div>

  
          <textarea
            name="desc"
            id="desc"
            placeholder="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full h-28 border-2 border-slate-400 bg-transparent rounded-xl px-4 py-2 resize-none outline-none"
          />

    
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-slate-700 hover:bg-slate-600 active:bg-slate-700 text-slate-100 h-11 w-44 rounded-lg focus: outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer font-semibold uppercase 
              active:scale-95 transition-transform border-slate-500 border-2"
            >
              Add Expense
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddExpense;

