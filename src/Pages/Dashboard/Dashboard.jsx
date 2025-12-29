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
    <div className='bg-neutral-900 pt-5 text-white flex flex-col gap-5'>
      <Navbar />
      <div className='flex gap-10 h-80 ml-[5%] mr-[5%]'>
      <div className='bg-neutral-700 grid grid-cols-3 gap-5 px-5 py-5 rounded-2xl w-1/2 h-full'>
        {months.map((month, index) => (
          <button key={month} onClick={() => setSelectMonth(index)} className={`px-4 py-2 w-40 font-bold text-white rounded cursor-pointer active:scale-95 ${selectMonth===index ? "bg-blue-500 text-white": "bg-gray-500 text-black"}`}>
            {month}
          </button>
        ))}
      </div>
      <div className='bg-neutral-700 rounded-2xl flex flex-col items-center gap-2 w-1/2 h-full'>
        <h1 className='font-extrabold text-2xl text-red-500 mt-5'>{months[selectMonth]} Expenses</h1>
        <div className='flex-1 overflow-y-auto'>
        {monthlyExpenses.length===0 ? (
          <p>No Expenses for this month</p>
        ): (
          <ul>
            <div className='flex flex-col'>
              <div className='flex font-bold text-xl gap-50'>
                <span className=''>Category</span>
                <span className=''>Amount</span>
              </div>
              <div className='flex flex-col w-full'>
              {monthlyExpenses.map((exp)=>(
                <li key={exp.id} className='flex gap-30'>
                  <span className='px-3 uppercase font-semibold w-40'>{exp.category}</span> 
                  <span className='flex px-5 w-20'>₹{exp.amount}</span></li>
              ))}
              </div>
            </div>
          </ul>
        )}
        <div className='pt-3 flex justify-center'>
          TOTAL: ₹{totatAmount}
        </div>
      </div>
      </div>
      </div>
      <div className='flex gap-5 h-90 ml-[5%] mr-[5%]'>
        <div className='flex gap-5 flex-col h-full w-1/2 pb-3'>
          <div className='bg-neutral-700 flex flex-col w-full justify-center items-center rounded-xl h-35 px-5 py-5'>
            <Pie data={lastData} />
            <div className='flex font-semibold'>
              <span>Last Day Expense: </span>
              <h1 className='pl-1'>{lastDayExpense}</h1>
            </div>
          </div>
          <div className='bg-neutral-700 flex justify-center flex-col pt-5 items-center rounded-xl pb-5 h-50'>
            <Line data={last7Data} />
            <div className='flex gap-2 font-semibold'>
              <span>Last 7 Days Expense: </span>
            <h1 className=''>{last7DayExpense}</h1></div>
          </div>
        </div> 
        <div className=' bg-neutral-700 w-1/2 flex justify-center rounded-xl' >
              <Bar data={data} options={options} />
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard


