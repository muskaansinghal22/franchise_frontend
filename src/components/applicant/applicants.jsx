import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { nanoid } from 'nanoid';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import axiosInstance from '../../utils/axiosInstance';

const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }
});

function Applicants() {
    const [applicants, setApplicants] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add error state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axiosInstance.get("/api/applicant/");
                
                if (response.data) {
                    const applicantsWithImages = response.data.map(applicant => ({
                        ...applicant,
                        imageUrl: applicant.imageUrl || applicant.valid_id
                    }));
                    
                    setApplicants(applicantsWithImages);
                }
            } catch (error) {
                console.error("Error fetching applicants data:", error);
                setError(error.message);
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchApplicants();
    }, [navigate]);

    const handleFranchiseClick = async (id, email) => {
        try {
            // Generate credentials
            const username = email;
            const password = nanoid(10); // Generate random password
    
            console.log('Creating franchise user with:', {
                applicationId: id,
                username: username,
                password: password
            });
    
            // Create franchise user
            const response = await axios.post('http://franchisebackend-production-d8f2.up.railway.app/api/create-franchise-user', {
                applicationId: id,
                username: username,
                password: password
            });
    
            if (response.data.success) {
                // Find the applicant details
                const applicant = applicants.find(a => a._id === id);
                
                // Prepare email parameters
                const emailParams = {
                    to_email: email,
                    to_name: applicant.namee,
                    user_email: username,
                    user_password: password,
                    franchise_id: id,
                    business_name: applicant.existingBusiness,
                    location: applicant.siteAddress,
                    city: applicant.city,
                    application_date:applicant.applicationDate
                };
    
                try {
                    // Send email using EmailJS
                    await emailjs.send(
                        import.meta.env.VITE_EMAILJS_SERVICE_ID,
                        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                        emailParams,
                        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                    );
                    
                    // Update the applicant status
                    await updateStatus(id, 2);
                    
                    alert('Franchise created successfully! Login credentials have been sent to the email.');
                } catch (emailError) {
                    console.error('Detailed email error:', {
                        message: emailError.message,
                        text: emailError.text,
                        name: emailError.name
                    });
                    alert('Franchise created but failed to send email with credentials. Error: ' + emailError.message);
                }
            }
        } catch (error) {
            console.error('Error in franchise creation:', error);
            alert('Failed to create franchise. Please try again.');
        }
    };
            
    const updateStatus = async (id, status) => {
        try {
            const response = await axiosInstance.put("/api/applicant/status", { id, status });
            
            if (response.data.success) {
                setApplicants(prevApplicants => 
                    prevApplicants.map(applicant => 
                    applicant._id === id ? { ...applicant, status } : applicant
                ));
                // Show appropriate message
            const messages = {
                1: 'Application accepted successfully!',
                '-1': 'Application declined.',
                2: 'Franchise status updated successfully!'
            };
            alert(messages[status] || 'Status updated');
            }
        } catch (error) {
            console.error("Error updating applicant status:", error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };
    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-600">Error: {error}</div>;
    }

    const filteredApplicants = applicants.filter(applicant => {
        if (filter === "all") return true;
        if (filter === "accepted") return applicant.status === 1;
        if (filter === "declined") return applicant.status === -1;
        if (filter === "franchise") return applicant.status === 2;
        return true;
    });

    // In your Applicants component, before the return statement
console.log('Current applicants state:', applicants);
console.log('Filtered applicants:', filteredApplicants);

    return (
        <div className="container mx-auto mt-10 p-4">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
                Applicants List
            </h2>
            <div className="mb-4 flex justify-center">
                <label className="mr-2 text-lg font-medium">Filter:</label>
                <select value={filter} onChange={handleFilterChange} className="p-2 border rounded-md">
                    <option value="all">Display All</option>
                    <option value="accepted">Display Accepted</option>
                    <option value="declined">Display Declined</option>
                    <option value="franchise">Display Franchise</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Sr. No.</th>
                            <th className="py-3 px-4 text-left">ID Proof</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Date of Application</th>
                            <th className="py-3 px-4 text-left">Contact</th>
                            <th className="py-3 px-4 text-left">Existing Business</th>
                            <th className="py-3 px-4 text-left">Location</th>
                            <th className="py-3 px-4 text-left">City</th>
                            <th className="py-3 px-4 text-left">Dimensions</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplicants.map((applicant, index) => (
                            <tr key={applicant._id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">
    {console.log('Rendering applicant:', applicant)} {/* Debug log */}
    {applicant.imageUrl ? (
        <div className="relative w-16 h-16">
            <img 
                src={applicant.imageUrl}
                alt="ID"
                className="w-16 h-16 object-cover rounded-md cursor-pointer"
                onClick={() => window.open(applicant.imageUrl, '_blank')}
                onError={(e) => {
                    console.error('Image load error for:', applicant.imageUrl);
                    e.target.onerror = null;
                }}
                loading="lazy"
            />
        </div>
    ) : (
        <span className="text-gray-400">No ID uploaded</span>
    )}
</td>
                                <td className="py-3 px-4">{applicant.namee}</td>
                                <td className="py-3 px-4">{new Date(applicant.applicationDate).toLocaleDateString()}</td>
                                <td className="py-3 px-4">{applicant.mobile}</td>
                                <td className="py-3 px-4">{applicant.existingBusiness}</td>
                                <td className="py-3 px-4">{applicant.siteAddress}</td>
                                <td className="py-3 px-4">{applicant.city}</td>
                                <td className="py-3 px-4">{applicant.totalArea}</td>
                                <td className="py-3 px-4 flex space-x-2">
    <button 
        className="bg-green-500 text-white px-3 py-1 rounded mr-1 hover:bg-green-600 transition duration-200"
        onClick={() => updateStatus(applicant._id, 1)}
        disabled={applicant.status === 1}
    >
        {applicant.status === 1 ? 'Accepted' : 'Accept'}
    </button>
    <button 
        className="bg-red-500 text-white px-3 py-1 rounded mr-1 hover:bg-red-600 transition duration-200"
        onClick={() => updateStatus(applicant._id, -1)}
        disabled={applicant.status === -1}
    >
        {applicant.status === -1 ? 'Declined' : 'Decline'}
    </button>
    <button 
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
        onClick={() => {
            updateStatus(applicant._id, 2);
            handleFranchiseClick(applicant._id, applicant.email);
        }}
        disabled={applicant.status === 2}
    >
        {applicant.status === 2 ? 'Franchised' : 'Franchise'}
    </button>
    <button 
    className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition duration-200"
    onClick={() => {
        console.log('Navigating to applicant details:', applicant._id); // Debug log
        navigate(`/applicant/${applicant._id}`);
    }}
>
    Details
</button>
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Applicants;