import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaHistory, FaCog, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import Todays from './Todays';
import History from './history';
import Charts from './Charts';
import { Link } from 'react-router-dom';    
import UpdatePassword from './UpdatePassword';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeComponent, setActiveComponent] = useState(null);
    
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate]);
    const handleLogout = () => {
        // Clear any stored data
        localStorage.removeItem('token');
        localStorage.removeItem('franchiseId');
        localStorage.removeItem('isAuthenticated');
        
        // Navigate to home page
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="bg-gray-800 w-64 p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-8 text-gray-100">
                    Dashboard
                </h2>
                <nav>
                    <ul className="space-y-3">
                    <li>
    <div className="relative">
        <FaShoppingCart className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-100" />
        <input
            type="button"
            value="Today's Sale"
            onClick={() => setActiveComponent('todays')}
            className="w-full pl-10 text-left p-3 rounded-lg hover:bg-gray-700 text-gray-100 hover:text-white transition-colors duration-200 bg-transparent cursor-pointer border-none focus:outline-none"
        />
    </div>
</li>
<li>
                            <div className="relative">
                                <FaHistory className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-100" />
                                <input
                                    type="button"
                                    value="Sales History"
                                    onClick={() => setActiveComponent('history')}
                                    className="w-full pl-10 text-left p-3 rounded-lg hover:bg-gray-700 text-gray-100 hover:text-white transition-colors duration-200 bg-transparent cursor-pointer border-none focus:outline-none"
                                />
                            </div>
                        </li>
                        <li>
                            <div className="relative">
                                <FaChartLine className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-100" />
                                <input
                                    type="button"
                                    value="Charts"
                                    onClick={() => setActiveComponent('charts')}
                                    className="w-full pl-10 text-left p-3 rounded-lg hover:bg-gray-700 text-gray-100 hover:text-white transition-colors duration-200 bg-transparent cursor-pointer border-none focus:outline-none"
                                />
                            </div>
                        </li>
                        <li>
    <div className="relative">
        <FaCog className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-100" />
        <input
            type="button"
            value="Settings"
            onClick={() => setActiveComponent('settings')}
            className="w-full pl-10 text-left p-3 rounded-lg hover:bg-gray-700 text-gray-100 hover:text-white transition-colors duration-200 bg-transparent cursor-pointer border-none focus:outline-none"
        />
    </div>
</li>
<li>
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-gray-700 text-gray-100 hover:text-white transition-colors duration-200"
                    >
                        <FaSignOutAlt className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
    {activeComponent === 'todays' ? (
        <Todays />
    ) : activeComponent === 'history' ? (
        <History />
    ) : activeComponent === 'charts' ? (
        <Charts />
    ) : activeComponent === 'settings' ? (
        <UpdatePassword />
    ) : (

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600">Select an option from the sidebar to view details</p>
        </div>
    )}
</div>
        </div>
    );
};

export default Dashboard;