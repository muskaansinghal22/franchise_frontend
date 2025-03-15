import React, { useState } from 'react';
import axios from 'axios';
// import { Image, CloudinaryContext } from 'cloudinary-react';
// import { Cloudinary } from "@cloudinary/url-gen";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const ApplicantForm = () => {
    const navigate = useNavigate();
    // At the beginning of your component
const [formData, setFormData] = useState({
    valid_id: '',
    namee: '',
    email: '',
    mobile: '',
    address: '',
    existingBusiness: '',
    businessSince: '',
    siteInfo: '',
    siteAddress: '',
    city: '',
    totalArea: '',
    floor: '',
    ownership: 'owned',
    imageUrl: ''
});

    // const cld = new Cloudinary({
    //     cloud: {
    //         cloudName: 'dhhu49b01'
    //     }
    // });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageUpload = async () => {
        if (!image) return '';
        
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'ml_default'); // Make sure this matches your Cloudinary upload preset
    
        try {
            // Create a separate axios instance for Cloudinary without auth headers
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dhhu49b01/image/upload',
                {
                    method: 'POST',
                    body: formData
                }
            );
            
            const data = await response.json();
        
        if (data && data.secure_url) {
            console.log('Image uploaded successfully:', data.secure_url);
            return data.secure_url;
        }
        throw new Error('Upload failed');
    } catch (error) {
        console.error('Upload error:', error);
        throw new Error('Image upload failed');
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            let imageUrl = '';
            if (image) {
                try {
                    imageUrl = await handleImageUpload();
                    console.log('Uploaded image URL:', imageUrl); // Debug log
                    if (!imageUrl) {
                        throw new Error('Failed to get image URL');
                    }
                } catch (uploadError) {
                    alert(uploadError.message);
                    setLoading(false);
                    return;
                }
            }
            // Create the correct data structure matching your backend model
            const submissionData = {
                valid_id: formData.valid_id,
                namee: formData.namee, // Using namee instead of name
                email: formData.email,
                mobile: formData.mobile, // Using mobile instead of phone
                address: formData.address,
                existingBusiness: formData.existingBusiness,
                businessSince: formData.businessSince,
                siteInfo: formData.siteInfo,
                siteAddress: formData.siteAddress,
                city: formData.city,
                totalArea: formData.totalArea,
                floor: formData.floor,
                ownership: formData.ownership,
                imageUrl: imageUrl // Add the Cloudinary URL
            };

            console.log('Submitting data:', submissionData); // Debug log

            const token = localStorage.getItem('token');
            
            try {
                const response = await axiosInstance.post('/api/applicant/submit', submissionData);
                
    
            if (response.data.success) {
                alert('Application submitted successfully!');
                // Reset form
                setFormData({
                    valid_id: '',
                    namee: '',
                    email: '',
                    mobile: '',
                    address: '',
                    existingBusiness: '',
                    businessSince: '',
                    siteInfo: '',
                    siteAddress: '',
                    city: '',
                    totalArea: '',
                    floor: '',
                    ownership: 'owned',
                    imageUrl: ''
                });
                setImage(null);
                setImagePreview(null);
                navigate('/'); 
            }
        } catch (submitError) {
            if (submitError.response?.status === 401) {
                alert('Please login to submit an application');
                navigate('/login');
            } else {
                throw submitError;
            }
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting application: ' + (error.response?.data?.message || 'Please try again. Server might be down.'));
    } finally {
        setLoading(false);
    }
    };
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Franchise Application Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
          
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">ID:</label>
                        <input
                            type="text"
                            name="valid_id"
                            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                            required onChange={handleChange}
                        />
                    </div>
                    
                    
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Valid ID (Aadhaar Card)*
                    </label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        accept="image/*"
                        required
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-32 h-32 object-cover rounded-lg"
                            />
                        </div>
                    )}
                </div>

                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Name:</label>
                        <input
    type="text"
    name="namee"  // Changed from name to namee
    value={formData.namee}
    className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
    required
    onChange={handleChange}
/>
                    </div>
                </div>
                
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">Email:</label>
                            <input
                                type="email"
                                name="email"
                                className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                                required onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">Mobile:</label>
                            <input
    type="tel"
    name="mobile"  // Changed from phone to mobile
    value={formData.mobile}
    className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
    required
    onChange={handleChange}
/>
                        </div>
                    </div>
    
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Address:</label>
                        <input
                            type="text"
                            name="address"
                            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                            required onChange={handleChange}
                        />
                    </div>
    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">Existing Business:</label>
                            <input
                                type="text"
                                name="existingBusiness"
                                className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
    <label className="text-gray-600 font-medium">Business Since:</label>
    <input
        type="date"
        name="businessSince"
        max={today}
        value={formData.businessSince}
        className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        onChange={handleChange}
    />
</div>
                    </div>
    
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Site Info:</label>
                        <input
                            type="text"
                            name="siteInfo"
                            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange}
                        />
                    </div>
    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">Site Address:</label>
                            <input
                                type="text"
                                name="siteAddress"
                                className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">City:</label>
                            <input
                                type="text"
                                name="city"
                                className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange}
                            />
                        </div>
                    </div>
    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">Total Area:</label>
                            <input
                                type="text"
                                name="totalArea"
                                className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">Floor:</label>
                            <input
                                type="text"
                                name="floor"
                                className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange}
                            />
                        </div>
                    </div>
    
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-2">Ownership:</label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="ownership"
                                    value="owned"
                                    className="w-4 h-4 text-blue-600"
                                />
                                Owned
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="ownership"
                                    value="rented"
                                    className="w-4 h-4 text-blue-600"
                                />
                                Rented
                            </label>
                        </div>
                    </div>
    
                    <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </div>
    );
}

export default ApplicantForm;