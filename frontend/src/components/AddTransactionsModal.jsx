
import React, { useState } from 'react';
import axios from 'axios';

// these are base styles; dark mode classes appended dynamically below
const baseInputClasses = "w-full px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7B61FF]/20 focus:border-[#7B61FF] transition-all";
const baseLabelClasses = "block text-sm font-medium mb-1.5";

const AddTransactionModal = ({ isOpen, onClose, onSuccess, isDarkMode = false }) => {
  // compute classes that depend on theme
  const inputClasses = `${baseInputClasses} border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-200 bg-white text-gray-900'}`;
  const labelClasses = `${baseLabelClasses} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  const [formData, setFormData] = useState({
    type: 'Expense', 
    currency: 'USD', 
    amount: '',
    name: '',
    method: '', 
    category: '', 
    date: '',
    status: '', 
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



 

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSaving(true);
  try {
    // 1. Get the raw token string
    const token = localStorage.getItem("token");

    // 2. Add a check to see if the token actually exists
    if (!token) {
      alert("Session expired. Please login again.");
      return;
    }

    // Normalize fields to match backend schema enums
    const payload = {
      ...formData,
      type: formData.type.toLowerCase(),
      amount: Number(formData.amount),
    };

    await axios.post(
      "http://localhost:5000/api/transactions",
      payload,
      {
        // 3. Ensure this header is exactly like this
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      }
    );

    if (onSuccess) onSuccess();
    onClose();
  } catch (error) {
    console.error("Token failed details:", error.response?.data);
    alert(error.response?.data?.message || "Token failed. Please try logging in again.");
  } finally {
    setIsSaving(false);
  }
};

 

  if (!isOpen) return null; 

  return (
   
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      {/* Modal Container */}
      <div className={`relative w-full max-w-2xl rounded-3xl shadow-2xl p-8 md:p-10 border ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-100'}`} onClick={(e) => e.stopPropagation()}>
      

        <h2 className={`text-3xl font-extrabold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Adding a new transaction</h2>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'} mb-10`}>Please fill in the form below</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type, Currency, Amount Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="type" className={labelClasses}>Type</label>
              <select name="type" id="type" value={formData.type} onChange={handleInputChange} className={inputClasses}>
                <option>Income</option>
                <option>Expense</option>
              </select>
            </div>
            <div>
              <label htmlFor="currency" className={labelClasses}>Currency</label>
              <select name="currency" id="currency" value={formData.currency} onChange={handleInputChange} className={inputClasses}>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                 <option>INR</option>
              </select>
            </div>
            <div>
              <label htmlFor="amount" className={labelClasses}>Amount</label>
              <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleInputChange} placeholder="$10,500.00" className={inputClasses} required />
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClasses}>Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} placeholder="Name of transaction or short description" className={inputClasses} required />
          </div>

          {/* Method, Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="method" className={labelClasses}>Method</label>
              <input type="text" name="method" id="method" value={formData.method} onChange={handleInputChange} placeholder="Mastercard **2154" className={inputClasses} />
            </div>
            <div>
              <label htmlFor="category" className={labelClasses}>Category</label>
              <select name="category" id="category" value={formData.category} onChange={handleInputChange} className={inputClasses}>
                <option value="">Select a category</option>
                <option>Cafe & Restaurants</option>
                <option>Shopping</option>
                <option>Subscription</option>
               
              </select>
            </div>
          </div>

          {/* Date, Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className={labelClasses}>Date</label>
              <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} className={inputClasses} required />
            </div>
            <div>
              <label htmlFor="status" className={labelClasses}>Status</label>
              <select name="status" id="status" value={formData.status} onChange={handleInputChange} className={inputClasses}>
                <option value="">Select a status</option>
                <option>Successful</option>
                <option>Processing</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition duration-700 hover:scale-[1.05] hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-10 py-3 rounded-xl font-semibold transition duration-700 hover:scale-[1.05] hover:cursor-pointer ${isSaving ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-[#7B61FF] text-white hover:bg-[#6850E5]'}`}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;