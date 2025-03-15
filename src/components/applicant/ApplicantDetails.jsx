import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import axiosInstance from '../../utils/axiosInstance';

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }
});

function ApplicantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const renderImage = (imageUrl) => {
    if (!imageUrl) return null;

    // Check if it's a full URL or just a public ID
    const isFullUrl = imageUrl.startsWith('http');
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">ID Proof</h3>
        <img 
          src={imageUrl}
          alt="ID Proof"
          className="w-64 h-64 object-cover rounded-md mx-auto"
          onError={(e) => {
            console.error('Image load error:', imageUrl);
            e.target.src = 'path/to/fallback/image.jpg'; // Add a fallback image
          }}
        />
      </div>
    );
  };
  useEffect(() => {
    const fetchApplicantDetails = async () => {
      try {
        const response = await axiosInstance.get(`api/applicant/${id}`);
        if (response.data.success) {
          setApplicant(response.data.data);
        } else {
          setError('Failed to fetch applicant details');
        }
      } catch (error) {
        console.error("Error fetching applicant details:", error);
        setError(error.response?.data?.message || 'Error fetching applicant details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplicantDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  if (!applicant) {
    return <div className="text-center mt-8">Applicant not found</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Applicant Details
          </h2>
          <button
            onClick={() => navigate('/applicants')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to List
          </button>
        </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {applicant.namee}</p>
              <p><span className="font-medium">Contact:</span> {applicant.mobile}</p>
              <p><span className="font-medium">Email:</span> {applicant.email}</p>
              <p><span className="font-medium">Date of Application:</span> {new Date(applicant.applicationDate).toLocaleDateString()}</p>
              <p><span className="font-medium">Address:</span> {applicant.address}</p>

            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Business Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Existing Business:</span> {applicant.existingBusiness}</p>
              <p><span className="font-medium">Business Since:</span> {applicant.businessSince}</p>
              <p><span className="font-medium">Site Info:</span> {applicant.siteInfo}</p>
              <p><span className="font-medium">Site Address:</span> {applicant.siteAddress}</p>
              <p><span className="font-medium">City:</span> {applicant.city}</p>
              <p><span className="font-medium">Total Area:</span> {applicant.totalArea}</p>
              <p><span className="font-medium">Floor:</span> {applicant.floor}</p>
              <p><span className="font-medium">Ownership:</span> {applicant.ownership}</p>

            </div>
          </div>
        </div>

        {applicant.imageUrl && renderImage(applicant.imageUrl)}

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/applicants')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Back to Applicants List
            </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ApplicantDetails;
