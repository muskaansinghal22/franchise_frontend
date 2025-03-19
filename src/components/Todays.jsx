import React, { useState } from 'react';
import axios from 'axios';
import { FaCalendar, FaRupeeSign, FaUsers, FaEnvelope } from 'react-icons/fa';

const Todays = () => {
    const [salesData, setSalesData] = useState({
        date: new Date().toISOString().split('T')[0],
        email: '',
        totalSales: '',
        totalCustomers: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalesData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            // Validate inputs
            if (!salesData.email || !salesData.date || !salesData.totalSales || !salesData.totalCustomers) {
                alert('Please fill all fields');
                return;
            }

            const response = await axios.post('http://franchisebackend-production-d8f2.up.railway.app/api/sales/today', {
                email: salesData.email,
                date: new Date(salesData.date).toISOString(),
                totalSales: Number(salesData.totalSales),
                totalCustomers: Number(salesData.totalCustomers)
            });

            if (response.status === 201) {
                alert('Sales data saved successfully!');
                // Reset form
                setSalesData({
                    date: new Date().toISOString().split('T')[0],
                    email: '',
                    totalSales: '',
                    totalCustomers: ''
                });
            }
        } catch (error) {
            console.error('Error saving sales data:', error);
            alert('Failed to save sales data: ' + error.message);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Today's Sales Entry</h2>
                    <p className="text-sm text-gray-500 mt-1">Enter your daily sales information</p>
                </div>

                <div className="space-y-6">
                    {/* Email Input */}
                    <div className="relative">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaEnvelope className="mr-2 text-purple-500" />
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={salesData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                        />
                    </div>
                    {/* Date Input */}
<div className="relative">
    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
        <FaCalendar className="mr-2 text-blue-500" />
        Date
    </label>
    <input
        type="date"
        name="date"
        value={salesData.date}
        onChange={handleChange}
        max={today}  // Add this line to restrict future dates
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
    />
</div>

                    {/* Total Sales Input */}
                    <div className="relative">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaRupeeSign className="mr-2 text-green-500" />
                            Total Sales
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                            <input
                                type="number"
                                name="totalSales"
                                value={salesData.totalSales}
                                onChange={handleChange}
                                placeholder="Enter total sales amount"
                                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                            />
                        </div>
                    </div>

                    {/* Total Customers Input */}
                    <div className="relative">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaUsers className="mr-2 text-purple-500" />
                            Total Customers Visited
                        </label>
                        <input
                            type="number"
                            name="totalCustomers"
                            value={salesData.totalCustomers}
                            onChange={handleChange}
                            placeholder="Enter number of customers"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <input
                            type="button"
                            value="Publish Sales Data"
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:from-gray-900 hover:to-black transition-all duration-200 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todays;