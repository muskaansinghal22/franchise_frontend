import React from 'react';
import { Link } from 'react-router-dom';

const TeamMember = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center">
              <img 
                src="/muskaan.jpeg"
                alt="Muskaan Singhal"
                className="w-40 h-40 rounded-full mx-auto ring-4 ring-blue-600 object-cover"
              />
              <h1 className="mt-4 text-3xl font-bold text-gray-900">Muskaan Singhal</h1>
              <p className="mt-2 text-xl text-blue-600">Full Stack Developer</p>
            </div>
            
            <div className="mt-8 prose prose-blue mx-auto">
              <p className="text-gray-600 leading-relaxed">
                Full-stack developer specializing in creating efficient and user-friendly franchise management solutions.
              </p>
              
              <div className="mt-6 flex justify-center space-x-6">
                <Link to="/" className="text-blue-600 hover:text-blue-800">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;