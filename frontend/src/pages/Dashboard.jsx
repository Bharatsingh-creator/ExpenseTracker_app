import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AddTransactionModal from "../components/AddTransactionsModal";
import ScrollIndicator from "../components/ScrollIndicator"; // progress bar for scrollable areas
import AnalyticsChart from "../components/AnalyticsChart";
const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const transactionsContainerRef = useRef(null); // ref for scrollable div
  const [scrollProgress, setScrollProgress] = useState(0);

  // read stored preference once
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") setIsDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("darkMode", next);
      return next;
    });
  };

  const handleContainerScroll = (e) => {
    const target = e.target;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const maxScroll = scrollHeight - clientHeight;
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setScrollProgress(progress);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (error) {
      console.log("Error fetching transactions:", error);
    }
  };

 useEffect(() => {
    const data = localStorage.getItem("userInfo");
    
    if (data && data !== "undefined") {
      try {
        const userInfo = JSON.parse(data);
        // This covers both { name: "..." } and { user: { name: "..." } }
        const name = userInfo.name || userInfo.user?.name || "User";
        setUserName(name);
      } catch (err) {
        console.error("Error parsing userInfo", err);
      }
    }
    fetchTransaction();
  }, []);
  // --- Dynamic Calculations for your Cards ---
  const income = transactions
    .filter((t) => t.type?.toLowerCase() === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const expense = transactions
    .filter((t) => t.type?.toLowerCase() === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalBalance = income - expense;

  // aggregate expenses by category for chart
  const categoryData = transactions.reduce((acc, t) => {
    if (t.category) {
      const key = t.category;
      acc[key] = (acc[key] || 0) + Number(t.amount);
    }
    return acc;
  }, {});

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {isModalOpen && (
        <AddTransactionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSuccess={fetchTransaction}
          isDarkMode={isDarkMode}
        />
      )}

      {/* section1 */}
      <div className={`section1 p-5 flex justify-between items-center ${isDarkMode ? 'bg-neutral-800' : 'bg-primary-200'}`}>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
          <p className={`${isDarkMode ? 'text-neutral-300' : 'text-neutral-500'}`}>
            It is the best time to manage your finances!
          </p>
        </div>
        
        <button 
          onClick={openModal} 
          className="bg-primary-600 text-white rounded-2xl px-8 py-3 outline-0 hover:cursor-pointer transition duration-700 hover:scale-[1.05] font-extrabold text-xl flex items-center gap-2"
        >
          <img src="./src/assets/money-bag.png" alt="add" className="w-6 h-6 invert"/>
          ADD
        </button>

        <div className="darkmode">
          <div
            className="border rounded-full p-2 flex items-center justify-center cursor-pointer"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <img
                src="./src/assets/sun (1).png"
                alt="light"
                className="w-6 h-6"
              />
            ) : (
              <img
                src="./src/assets/moon.png"
                alt="dark"
                className="w-5 h-5"
              />
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 p-6 gap-6 overflow-hidden">
        
        {/* Left Column (Section 2) */}
        <div className="flex flex-col w-[65%] gap-6">
          
          {/* Section 2.1 - Statistics Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className={`border-2 rounded-4xl p-6 text-center transition duration-700 hover:scale-[1.05] ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'bg-white border-neutral-200 shadow-md'}`}>
              <p className={`${isDarkMode ? 'text-neutral-300' : 'text-neutral-500'} text-sm`}>Total balance</p>
              <p className="text-2xl font-bold">${totalBalance.toLocaleString()}</p>
            </div>
            <div className={`border-2 rounded-4xl p-6 text-center transition duration-700 hover:scale-[1.05] ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'bg-white border-neutral-200 shadow-md'}`}>
              <p className={`${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'} text-sm`}>Income</p>
              <p className="text-2xl font-bold text-green-600">+${income.toLocaleString()}</p>
            </div>
            <div className={`border-2 rounded-4xl p-6 text-center transition duration-700 hover:scale-[1.05] ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'bg-white border-neutral-200 shadow-md'}`}>
              <p className={`${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'} text-sm`}>Expense</p>
              <p className="text-2xl font-bold text-red-600">-${expense.toLocaleString()}</p>
            </div>
          </div>

          {/* Section 2.2 - Recent Transactions */}
          <div className={`border-2 rounded-4xl p-6 flex-1 overflow-hidden flex flex-col relative ${isDarkMode ? 'bg-neutral-800 border-neutral-600' : 'bg-white border-neutral-200 shadow-md'}`}>
            {/* scroll progress bar for this section */}
            <ScrollIndicator progress={scrollProgress} />

            <h1 className="text-xl font-bold mb-4">Recent Transactions</h1>
            <div
              ref={transactionsContainerRef}
              onScroll={handleContainerScroll}
              className="flex-1 space-y-3 overflow-y-auto pr-2 hide-scrollbar"
            >
              {transactions.length > 0 ? (
                transactions.map((t) => (
                  <div key={t._id} className={`flex justify-between items-center p-4 rounded-2xl border ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'bg-neutral-100 border-neutral-200'}`}>
                    <div className="flex flex-col">
                      <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.name}</p>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-400'} text-xs`}>{new Date(t.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${t.type.toLowerCase() === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                        {t.type.toLowerCase() === 'expense' ? '-' : '+'} ${t.amount}
                      </p>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-400'} text-xs italic`}>{t.category}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 mt-10">No transactions found. Add one to get started!</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Section 3 - Analytics/Budget) */}
        <div className={`w-[35%] rounded-4xl p-6 transition duration-700 hover:scale-[1.02] ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-2 border-[#d0d0d4] shadow-md'}`}>
           <h1 className="text-xl font-bold mb-4">Analytics</h1>
           <div className="h-60">
             <AnalyticsChart categoryData={categoryData} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;