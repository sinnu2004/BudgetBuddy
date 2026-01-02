import { collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase';
import { db } from '../../firebase';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

import { Bar, Line, Pie } from 'react-chartjs-2';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

ChartJS.register(
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const Dashboard = () => {

  const email = auth.currentUser.email;

  const [item, setItems] = useState([]);
  const [loading, setLoading] = useState(true);


  const [selectMonth, setSelectMonth] = useState(
    new Date().getMonth()
  );

  const [seletedYear] = useState(new Date().getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  console.log("Welcome to Dashboard")
  useEffect(()=>{
    const q = query(collection(db, "user", email, "expense" ),
  orderBy("createdAt", "desc"));
 
  const unsubscribe = onSnapshot(q, (querySnapshot)=>{
    const itemList = []; 
    querySnapshot.forEach((doc)=>{
      itemList.push({id: doc.id, ...doc.data()}); 
    });
    setItems(itemList);
    setLoading(false);
  },(error) => {
    console.error("Error fetching data: ", error);
    setLoading(false);
  });


  return () => unsubscribe();
  },[email]);

  if(loading) {
    return <p>Loading items...</p>
  }

  const itemsWithDate = item.map((exp)=>({
    ...exp,
    date: exp.createdAt.toDate(),
  }));

  const monthlyExpenses = itemsWithDate.filter((exp)=>
  exp.date.getMonth()=== selectMonth && exp.date.getFullYear()=== seletedYear
);

const totatAmount = monthlyExpenses.reduce((sum,exp)=>{
  const amount = Number(exp.amount);
  return sum + (isNaN(amount) ? 0 : amount);
}, 0);

const now = new Date();
const sevenDaysAgo = new Date(now);
sevenDaysAgo.setDate(now.getDate() - 6);
sevenDaysAgo.setHours(0,0,0,0);

const last7Days = itemsWithDate.filter(
  exp => exp.date >= sevenDaysAgo
);

const last7DaysMap = {};
last7Days.forEach(exp => {
  const dayKey = exp.date.toLocaleDateString("en-GB");

  last7DaysMap[dayKey] = (last7DaysMap[dayKey] || 0) + Number(exp.amount || 0);
});

const last7Data = {
  labels: Object.keys(last7DaysMap),
  datasets: [
    {
      label: "Last 7 Day Expenses",
      data: Object.values(last7DaysMap),
      fill: false,
      backgroundColor:'red',
      borderColor: 'black',
      tension: 0.4,
    },
  ],
};

const curr = new Date();
curr.setHours(curr.getHours() - 24);

const last = itemsWithDate.filter(
  exp => exp.date >= curr
);

const lastDayCategoryMap = {};

last.forEach(exp => {
  lastDayCategoryMap[exp.category] = (lastDayCategoryMap[exp.category] || 0) + Number(exp.amount || 0);
});
const lastDayExpense = last.reduce((sum,exp) => sum + Number(exp.amount || 0), 0);

const last7DayExpense = last7Days.reduce((sum,exp) => sum + Number(exp.amount || 0), 0);
const lastData = {
  labels: Object.keys(lastDayCategoryMap),
  datasets: [
    {
      label: "Last Day Expenses",
      data: Object.values(lastDayCategoryMap),
      backgroundColor: [
        "#06b6d4",
        "#22c55e",
        "#f97316",
        "#a855f7",
        "#ef4444",
      ],
      borderWidth: 1,
    }
  ]
}
  const chartLabels = monthlyExpenses.map(exp => exp.category);
  const chartAmounts = monthlyExpenses.map(exp=> 
    exp.amount
  );

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: `${months[selectMonth]} Expenses`,
        data: chartAmounts,
        backgroundColor: 'red',
        borderColor: 'black',
        borderWidth: 1,
        barThickness: 35,
      },
    ]
  }

  const options = {
 
  }

  const categoryMap = {};

monthlyExpenses.forEach(exp => {
  categoryMap[exp.category] =
    (categoryMap[exp.category] || 0) + Number(exp.amount || 0);
});


  return ( 
  <div className="bg-neutral-900 min-h-screen pt-5 text-white flex flex-col gap-5">
    <Navbar />

  
    <div className="flex flex-col lg:flex-row gap-5 mx-[2%]">

    
      <div className="bg-neutral-700 rounded-2xl p-4 lg:w-1/2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => setSelectMonth(index)}
              className={`py-2 px-2 font-semibold rounded active:scale-95 text-sm
                ${selectMonth === index 
                  ? "bg-red-400 text-white" 
                  : "bg-gray-600 text-black"}`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

  
      <div className="bg-neutral-700 rounded-2xl flex flex-col lg:w-1/2">
        <h1 className="font-extrabold text-xl sm:text-2xl text-red-400 text-center mt-4">
          {months[selectMonth]} Expenses
        </h1>

        <div className="flex-1 overflow-y-auto px-4 mt-4">
          {monthlyExpenses.length === 0 ? (
            <p className="text-center">No Expenses for this month</p>
          ) : (
            <ul className="space-y-2">
              {monthlyExpenses.map((exp) => (
                <li
                  key={exp.id}
                  className="flex justify-between items-center px-4 py-2 rounded bg-red-400 font-semibold"
                >
                  <span className="uppercase">{exp.category}</span>
                  <span>₹{exp.amount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="py-3 flex justify-center font-bold">
          <span className="border px-3 py-1 rounded bg-red-400">
            TOTAL: ₹{totatAmount}
          </span>
        </div>
      </div>
    </div>


    <div className="flex flex-col lg:flex-row gap-5 mx-[2%]">

    
      <div className="flex flex-col gap-5 lg:w-1/2">

      
        <div className="bg-neutral-700 rounded-xl p-4 flex flex-col items-center">
          <div className="w-full max-w-sm">
            <Pie data={lastData} />
          </div>
          <p className="mt-3 font-semibold text-red-500">
            Last Day Expense: ₹{lastDayExpense}
          </p>
        </div>

      
        <div className="bg-neutral-700 rounded-xl p-4 flex flex-col items-center">
          <div className="w-full">
            <Line data={last7Data} />
          </div>
          <p className="mt-3 font-semibold text-red-500">
            Last 7 Days Expense: ₹{last7DayExpense}
          </p>
        </div>
      </div>

    
      <div className="bg-neutral-700 rounded-xl p-4 lg:w-1/2 flex items-center justify-center">
        <div className="w-full">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>

    <Footer />
  </div>
);
};

export default Dashboard


