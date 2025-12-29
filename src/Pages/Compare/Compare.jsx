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
                backgroundColor: ["#06b6d4"],
                borderRadius: 5,
            },
        ],
    };
  return (
    <div className='bg-black text-white'>
        <div className=''>
            <Navbar />
            <div className='flex gap-10 h-60 mt-5 mr-[5%] ml-[5%]'>
                <div className='bg-neutral-700 rounded-xl px-5 py-5'>
                    <h1 className='font-bold flex justify-center pb-5'>Compare Monthly Expenses</h1>
                    <div className='grid grid-cols-4 gap-5 px-5 w-full'>
                        {months.map((month,index) => (
                            <button key={month} onClick={() => toggleMonth(index)} className={`px-4 py-2 rounded font-semibold transition cursor-pointer ${
                                selectedMonths.includes(index) ? "bg-cyan-600 text-white": "bg-gray-500 text-black"}`}>
                                    {month}
                                </button>
                        ))}
                    </div>
                </div>

                <div className='bg-neutral-700 rounded-xl px-40 py-5 overflow-y-auto'>
                <div className='flex justify-center gap-20'>
                    <span className='font-semibold'>Month</span>
                    <span className='font-semibold'>Total Expense</span>
                </div>
                {selectedMonths.length=== 0 ? (
                    <p>Select one or more months to compare</p>
                ): (
                    monthTotals.map((m) => (
                        <p className='flex justify-center gap-20' key={m.month}>
                            <span className='w-1/2'>{m.month}</span><span className='w-1/2'>₹{m.total}</span></p>
                    ))
                )}
                </div>
            </div>

            <div className='flex justify-center bg-neutral-700 rounded-xl mr-[5%] ml-[5%] mt-5 px-5 py-5'>
                {selectedMonths.length===0 ? (
                    <p>No data to display</p>
                ): (
                    <Bar data={barData} />
                )}
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Compare
