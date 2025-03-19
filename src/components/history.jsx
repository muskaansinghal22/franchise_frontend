import React, { useState } from 'react';
import axios from 'axios';
import { FaCalendar, FaRupeeSign, FaUsers, FaSearch, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
const History = () => {
    const [dateRange, setDateRange] = useState({
        fromDate: '',
        toDate: ''
    });
    const [salesHistory, setSalesHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleExportToExcel = () => {
        if (salesHistory.length === 0) {
            alert('No data to export');
            return;
        }

        // Format the data for export
        const exportData = salesHistory.map(sale => ({
            'Date': new Date(sale.date).toLocaleDateString(),
            'Email': sale.email,
            'Total Sales': `₹${sale.totalSales.toLocaleString()}`,
            'Total Customers': sale.totalCustomers
        }));

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sales History');

        // Generate filename with current date
        const fileName = `sales_history_${new Date().toISOString().split('T')[0]}.xlsx`;

        // Save file
        XLSX.writeFile(wb, fileName);
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDateRange(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://franchisebackend-production-d8f2.up.railway.app/api/sales/history', {
                params: {
                    fromDate: dateRange.fromDate,
                    toDate: dateRange.toDate
                }
            });
            setSalesHistory(response.data);
        } catch (error) {
            console.error('Error fetching sales history:', error);
            alert('Failed to fetch sales data');
        } finally {
            setLoading(false);
        }
    };

    // Add this function after the handleSearch function
const calculateTotalSales = () => {
    return salesHistory.reduce((total, sale) => total + sale.totalSales, 0);
};

// Add this JSX after the table div and before the closing div of bg-white
const today = new Date().toISOString().split('T')[0];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Sales History</h2>
                    <p className="text-sm text-gray-500 mt-1">View sales records by date range</p>
                </div>

                {/* Date Range Filter */}
                <div className="flex gap-4 mb-6">
    <div className="flex-1">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FaCalendar className="mr-2 text-blue-500" />
            From Date
        </label>
        <input
            type="date"
            name="fromDate"
            value={dateRange.fromDate}
            onChange={handleDateChange}
            max={dateRange.toDate || today} // Can't be later than toDate or today
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
    </div>
    <div className="flex-1">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FaCalendar className="mr-2 text-blue-500" />
            To Date
        </label>
        <input
            type="date"
            name="toDate"
            value={dateRange.toDate}
            onChange={handleDateChange}
            min={dateRange.fromDate} // Can't be earlier than fromDate
            max={today} // Can't be later than today
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
    </div>
    <div className="flex items-end gap-2">
                        <button
                            onClick={handleSearch}
                            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
                        >
                            Search
                        </button>
                        {salesHistory.length > 0 && (
                            <button
                                onClick={handleExportToExcel}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                            >
                                <FaFileExcel />
                                Export to Excel
                            </button>
                        )}
                    </div>
                </div>

                {/* Results Table */}
                {loading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        <div className="flex items-center">
                                            <FaRupeeSign className="mr-1" />
                                            Total Sales
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        <div className="flex items-center">
                                            <FaUsers className="mr-1" />
                                            Customers
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {salesHistory.map((sale) => (
                                    <tr key={sale._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(sale.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {sale.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            ₹{sale.totalSales.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {sale.totalCustomers}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {salesHistory.length > 0 && (
    <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex justify-end items-center">
            <div className="flex items-center">
                <div className="text-gray-700 font-medium">Total Sales:</div>
                <div className="ml-4 text-xl font-bold text-gray-900">
                    ₹{calculateTotalSales().toLocaleString()}
                </div>
            </div>
        </div>
    </div>
)}
            </div>
        </div>
    );
};

export default History;