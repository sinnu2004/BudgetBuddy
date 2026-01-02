import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase';

import {
    Chart as ChartJs,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

ChartJs.register(
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
);

const months = [
    "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const Compare = () => {

    const email = auth.currentUser.email;
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedMonths, setSelectedMonths] = useState([]);
    
    const year = new Date().getFullYear();

    useEffect(()=> {
        const q = query(
            collection(db, "user", email, "expense"),
            orderBy("createdAt", "desc")
        );

        const unsub = onSnapshot(q, (snap) => {
            const list = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().createdAt.toDate(),
            }));

            setExpenses(list);
            setLoading(false);
        });
        return unsub;
    }, [email]);

    if(loading) return <p>Loading... </p>

    const toggleMonth = (index) => {
        setSelectedMonths((prev) => prev.includes(index) ? prev.filter((m) => m!== index): [...prev, index])
    }

    const monthTotals = selectedMonths.map((monthIndex) => {
        const total = expenses.filter(
            (e) => e.date.getMonth() === monthIndex && e.date.getFullYear() === year
        ).reduce((sum,e) => sum + Number(e.amount || 0), 0);

        return {
            month: months[monthIndex],
            total,
        };
    });

    const barData = {
        labels: monthTotals.map((m) => m.month),
        datasets: [
            {
                label: "Monthly Comparison",
                data: monthTotals.map((m) => m.total),
                backgroundColor: "red",
                borderRadius: 5,
                barThickness: 30,
            },
        ],
    };
 return (
  <div className="bg-black text-white min-h-screen">
    <Navbar />


    <div className="flex flex-col lg:flex-row gap-5 mt-5 mx-[2%]">

      <div className="bg-neutral-700 rounded-xl px-5 py-5 lg:w-1/2">
        <h1 className="font-bold text-center pb-5 text-red-400 text-lg sm:text-xl">
          Compare Monthly Expenses
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => toggleMonth(index)}
              className={`py-2 px-2 rounded font-semibold text-sm transition active:scale-95
                ${
                  selectedMonths.includes(index)
                    ? "bg-red-400 text-white"
                    : "bg-gray-500 text-black"
                }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>


      <div className="bg-neutral-700 rounded-xl lg:w-1/2 flex flex-col px-4 py-4 max-h-55 overflow-y-auto">
        {selectedMonths.length === 0 ? (
          <p className="text-center mt-10">
            Select one or more months to compare
          </p>
        ) : (
          <ul className="space-y-2">
            {monthTotals.map((m) => (
              <li
                key={m.month}
                className="flex justify-between items-center px-4 py-2 rounded bg-red-400 text-black font-semibold"
              >
                <span>{m.month}</span>
                <span>₹{m.total}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>


    <div className="bg-neutral-700 rounded-xl mx-[2%] mt-5 px-4 py-5 flex justify-center">
      {selectedMonths.length === 0 ? (
        <p>No data to display</p>
      ) : (
        <div className="w-full max-w-4xl">
          <Bar data={barData} />
        </div>
      )}
    </div>

    <Footer />
  </div>
);

}

export default Compare
