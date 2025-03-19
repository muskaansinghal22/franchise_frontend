import React, { useState } from 'react';
import axios from 'axios';
import { FaChartBar, FaChartPie, FaChartLine, FaCalendar } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const getCurrentMonthDates = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
        start: firstDay.toISOString().split('T')[0],
        end: lastDay.toISOString().split('T')[0]
    };
};

const Charts = () => {
    const [dateRange, setDateRange] = useState({
        fromDate: '',
        toDate: ''
    });
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const today = new Date().toISOString().split('T')[0];

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDateRange(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDisplay = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://https://franchisebackend-production-d8f2.up.railway.app/api/sales/history', {
                params: {
                    fromDate: dateRange.fromDate,
                    toDate: dateRange.toDate
                }
            });
            setSalesData(response.data);
        } catch (error) {
            console.error('Error fetching sales data:', error);
            alert('Failed to fetch sales data');
        } finally {
            setLoading(false);
        }
    };

    // Prepare data for charts
    const chartData = {
        labels: salesData.map(sale => new Date(sale.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short'
        })),
        datasets: [
            {
                label: 'Daily Sales (₹)',
                data: salesData.map(sale => sale.totalSales),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: 'rgb(75, 192, 192)'
            }
        ]
    };

    const handleMonthlyClick = async () => {
        try {
            setLoading(true);
            const monthDates = getCurrentMonthDates();
            const response = await axios.get('http://franchisebackend-production-d8f2.up.railway.app/api/sales/history', {
                params: {
                    fromDate: monthDates.start,
                    toDate: monthDates.end
                }
            });
            setSalesData(response.data);
        } catch (error) {
            console.error('Error fetching monthly sales:', error);
            alert('Failed to fetch monthly sales data');
        } finally {
            setLoading(false);
        }
    };

    const customerChartData = {
        labels: salesData.map(sale => new Date(sale.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short'
        })),
        datasets: [
            {
                label: 'Daily Customers',
                data: salesData.map(sale => sale.totalCustomers),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgb(53, 162, 235)',
                borderWidth: 1,
                borderRadius: 5,
                hoverBackgroundColor: 'rgba(53, 162, 235, 0.7)'
            }
        ]
    };

    // Add chart options configurations
const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    size: 14
                }
            }
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function(context) {
                    return `Sales: ₹${context.parsed.y.toLocaleString('en-IN')}`;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            ticks: {
                font: {
                    size: 12
                }
            }
        },
        y: {
            beginAtZero: true,
            ticks: {
                callback: function(value) {
                    return '₹' + value.toLocaleString('en-IN');
                },
                font: {
                    size: 12
                }
            }
        }
    }
};

const barChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    size: 14
                }
            }
        },
        tooltip: {
            mode: 'index',
            intersect: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            ticks: {
                font: {
                    size: 12
                }
            }
        },
        y: {
            beginAtZero: true,
            ticks: {
                font: {
                    size: 12
                }
            }
        }
    }
};
    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Sales Analytics</h2>
                    <p className="text-sm text-gray-500 mt-1">View your sales statistics and trends</p>
                </div>

                <div className="mb-6">
    {/* Date Filter Header */}
    <h3 className="text-md font-medium text-gray-700 mb-3">Select Date Range</h3>
    
    <div className="flex items-end gap-4">
                   {/* Date Range Inputs */}
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
                max={dateRange.toDate || today}
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
                min={dateRange.fromDate}
                max={today}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
        </div>

                    {/* Action Buttons */}
        <div className="flex gap-3">
            <input
                type="button"
                value="Display"
                onClick={handleDisplay}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 cursor-pointer"
            />
            <input
                type="button"
                value="Monthly Sales"
                onClick={handleMonthlyClick}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
            />
        </div>
    </div>
</div>

                {loading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : salesData.length > 0 ? (
                    <div className="space-y-8">
    {/* Sales Trend Chart */}
    <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
        <div className="h-[400px]"> {/* Fixed height container */}
            <Line data={chartData} options={lineChartOptions} />
        </div>
    </div>

    {/* Customer Visits Chart */}
    <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Customer Visits</h3>
        <div className="h-[400px]"> {/* Fixed height container */}
            <Bar data={customerChartData} options={barChartOptions} />
        </div>
    </div>


                        {/* Summary Stats */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
                                
                                <p className="text-3xl font-bold text-gray-800">
                                    ₹{salesData.reduce((sum, sale) => sum + sale.totalSales, 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">Total Customers</h3>
                                <p className="text-3xl font-bold text-gray-800">
                                    {salesData.reduce((sum, sale) => sum + sale.totalCustomers, 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4 text-gray-500">
                        Select a date range and click Display to view charts
                    </div>
                )}
            </div>
        </div>
    );
};

export default Charts;