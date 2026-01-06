import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const BudgetInsights = () => {
  const uid = auth.currentUser?.email;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  const [limits, setLimits] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const addLimit = async (e) => {
    e.preventDefault();
    if (!category || !limit) return;

    await addDoc(collection(db, "user", uid, "limit"), {
      category: category.toLowerCase(),
      limit: Number(limit),
      month: currentMonth,
      year: currentYear,
      createdAt: serverTimestamp(),
    });

    setCategory("");
    setLimit("");
  };

  useEffect(() => {
    if (!uid) return;

    const q = query(
      collection(db, "user", uid, "limit"),
      where("month", "==", currentMonth),
      where("year", "==", currentYear),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLimits(list);
    });

    return () => unsub();
  }, [uid, currentMonth, currentYear]);

  useEffect(() => {
    if (!uid) return;

    const q = query(collection(db, "user", uid, "expense"));

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({
        ...doc.data(),
        date: doc.data().createdAt.toDate(),
      }));
      setExpenses(list);
    });

    return () => unsub();
  }, [uid]);


  const deleteLimit = async (id) => {
    await deleteDoc(doc(db, "user", uid, "limit", id));
  };

  const categories = [...new Set(limits.map(l => l.category))];


  const comparison = limits.map((l) => {
    const spent = expenses
      .filter(
        (e) =>
          e.category === l.category &&
          e.date.getMonth() === currentMonth &&
          e.date.getFullYear() === currentYear
      )
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);

    return {
      category: l.category,
      limit: l.limit,
      spent,
      savings: Math.max(l.limit - spent, 0),
      exceeded: spent > l.limit,
    };
  });

  const filtered = selectedCategory
    ? comparison.filter(c => c.category === selectedCategory)
    : comparison;

  const chartData = {
    labels: filtered.map(c => c.category.toUpperCase()),
    datasets: [
      {
        label: "Spent",
        data: filtered.map(c => c.spent),
        backgroundColor: "#ef4444",
        barThickness: 35,
      },
      {
        label: "Limit",
        data: filtered.map(c => c.limit),
        backgroundColor: "#22c55e",
        barThickness: 35,
      },
    ],
  };

  const totalLimit = limits.reduce(
    (sum, l) => sum + Number(l.limit || 0),
    0
  );

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100">
  <Navbar />

  <div className="px-4 sm:px-6 md:px-8 lg:px-10 mx-auto mt-6 space-y-8">

    <div className="bg-slate-800 p-4 sm:p-6 rounded-xl">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-slate-400">
        Add Monthly Category Limit ({MONTHS[currentMonth]})
      </h2>

      <form
        onSubmit={addLimit}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4"
      >
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category" required
          className="w-full sm:flex-1 p-2 rounded border-2 border-slate-400 text-slate-100"
        />

        <input
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          type="number" required
          placeholder="Limit ₹"
          className="w-full sm:w-40 p-2 rounded border-2 border-slate-400 text-slate-100"
        />

        <button className="bg-slate-900 hover:bg-slate-600 active:bg-slate-700 text-slate-100 font-semibold px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer">
          Add
        </button>
      </form>
    </div>

    <div className="bg-slate-800 p-4 sm:p-6 rounded-xl">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-slate-400">
        Current Month Limits
      </h2>

      {limits.length === 0 ? (
        <p className="text-slate-100">No limits set</p>
      ) : (
        <ul className="space-y-3">
          {limits.map((l) => (
            <li
              key={l.id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-slate-500 p-3 rounded"
            >
              <span className="font-semibold">
                {l.category.toUpperCase()}
              </span>

              <div className="flex justify-between sm:justify-end items-center gap-4">
                <span>₹{l.limit}</span>
                <button
                  onClick={() => deleteLimit(l.id)}
                  className="bg-slate-900 hover:bg-slate-600 active:bg-slate-700 text-slate-100 cursor-pointer font-semibold px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 font-bold text-slate-300 text-base sm:text-lg">
        Total Monthly Budget: ₹{totalLimit}
      </div>
    </div>


    <div className="bg-slate-800 p-4 sm:p-6 rounded-xl">
      <h2 className="font-bold mb-3 text-slate-400">Filter by Category</h2>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full sm:w-64 p-2 rounded text-slate-100 border border-slate-500 bg-slate-800"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c} className="uppercase">
            {c}
          </option>
        ))}
      </select>
    </div>

    {filtered.length > 0 && (
      <div className="bg-slate-800 p-4 sm:p-6 rounded-xl">
        <h2 className="font-bold mb-4 text-slate-400">
          Expense vs Limit ({MONTHS[currentMonth]})
        </h2>

        <div className="w-full overflow-x-auto">
          <div className="flex justify-center min-w-[320px] sm:min-w-full">
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    )}

    <div className="bg-slate-800 p-4 sm:p-6 rounded-xl">
      <h2 className="font-bold mb-4 text-slate-400">Insights</h2>

      <div className="space-y-2 text-slate-100 text-sm sm:text-base">
        {filtered.map((c) => (
          <p key={c.category}>
            <span className="font-semibold">
              {c.category.toUpperCase()}:
            </span>{" "}
            {c.exceeded
              ? `Exceeded by ₹${c.spent - c.limit}`
              : `Saved ₹${c.savings}`}
          </p>
        ))}
      </div>
    </div>

  </div>

  <Footer />
</div>
  );
}
export default BudgetInsights;
