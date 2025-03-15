import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const contactRef = useRef(null);
    const aboutRef = useRef(null);
    const stepsRef = useRef(null);
  
    const scrollToSection = (ref) => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });

  const handleApply = () => {
    navigate('/apply');
    
  };
};

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">NexBranch</div>
            <div className="hidden md:flex space-x-8">
              
  <a href="#" 
     onClick={(e) => {
       e.preventDefault();
       window.scrollTo({ top: 0, behavior: 'smooth' });
     }}
     className="text-gray-700 hover:text-blue-600">
    Home
  </a>
  <a href="#about" 
     onClick={(e) => {
       e.preventDefault();
       scrollToSection(aboutRef);
     }}
     className="text-gray-700 hover:text-blue-600">
    About
  </a>
  <a href="#guidelines"
     onClick={(e) => {
       e.preventDefault();
       scrollToSection(stepsRef);
     }}
     className="text-gray-700 hover:text-blue-600">
    Guidelines
  </a>
  <a href="#contact"
     onClick={(e) => {
       e.preventDefault();
       scrollToSection(contactRef);
     }}
     className="text-gray-700 hover:text-blue-600">
    Contact
  </a>
  <div className="flex space-x-4">
                <Link 
                  to="/apply" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Apply
                </Link>
                <Link 
                  to="/login" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-34">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in-left">
                Transform Your Dreams <br/>
                <span className="text-yellow-300">Into Reality</span>
              </h1>
              <p className="text-xl mb-8 animate-fade-in">
                Join the fastest growing franchise network and unlock your entrepreneurial potential
              </p>
              <Link 
                to="/apply"
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 hover:text-blue-800 transform hover:scale-105 transition duration-300"
              >
                Start Your Journey <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="" className="w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
<div className="bg-white py-16">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { number: "500+", label: "Franchises" },
        { number: "1000+", label: "Happy Partners" },
        { number: "50+", label: "Cities" },
        { number: "95%", label: "Success Rate" }
      ].map((stat, index) => (
        <div key={index} className="text-center group hover:transform hover:scale-105 transition duration-300">
          <div className="text-4xl font-bold text-blue-600 group-hover:text-blue-800">
            {stat.number}
          </div>
          <div className="text-gray-600 mt-2">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
</div>

        {/* About Section - New */}
      <div ref={aboutRef} className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                FranchiseConnect is your trusted partner in franchise allocation, bringing together ambitious entrepreneurs 
                and successful franchise opportunities. Our platform streamlines the franchise application and 
                allocation process, making it easier than ever to start your entrepreneurial journey.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With years of experience in the franchise industry, our team understands the challenges and 
                opportunities that come with franchise ownership. We're committed to helping you find the 
                perfect match for your business goals.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Expert franchise matching system</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Streamlined application process</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Dedicated support team</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Vast network of opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      {/* Process Steps */}
<div ref={stepsRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-16">
      Your Journey to Success
      <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
    </h2>
    <div className="grid md:grid-cols-4 gap-6">
      {[
        { title: "Apply", desc: "Submit details", icon: "📝" },
        { title: "Review", desc: "Expert evaluation", icon: "👥" },
        { title: "Allocation", desc: "Franchise Allocated", icon: "🎯" },
        // { title: "Connect", desc: "Meet partners", icon: "🤝" },
        { title: "Launch", desc: "Start business", icon: "🚀" }
      ].map((step, index) => (
        <div key={index} 
          className="bg-white p-6 rounded-lg shadow-lg text-center transform 
          hover:scale-105 transition duration-300 hover:shadow-xl">
          <div className="text-4xl mb-4">{step.icon}</div>
          <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center 
          justify-center mx-auto mb-4 text-xl font-bold">
            {index + 1}
          </div>
          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
          <p className="text-gray-600">{step.desc}</p>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-16">
      Meet Our Experts
      <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
    </h2>
    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
      {[
        { 
          name: "Rajesh Bansal", 
          image: "/rajesh.jpeg",
          role: "Mentor"
        },
        { 
          name: "Muskaan Singhal", 
          image: "/muskaan.jpeg",
          role: "Developer"
        }
      ].map((member, index) => (
        <div key={index} 
          className="bg-white rounded-xl shadow-lg p-8 text-center transform 
          hover:scale-105 transition duration-300 min-h-[400px] flex flex-col justify-between"
        >
          <img 
              src={member.image} 
              alt={member.name} 
              className="w-40 h-40 rounded-full mx-auto mb-6 object-cover ring-4 ring-blue-600" 
            />
          <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
            <p className="text-blue-600 font-semibold text-xl mb-4">{member.role}</p>
            <p className="text-gray-600 text-lg leading-relaxed">{member.desc}</p>
          </div>
      ))}
    </div>
  </div>
</div>

      {/* Footer */}
      <footer ref={contactRef} className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="mb-2">Email: singhal123muskaan@gmail.com</p>
              <p>Phone: +91 87997-37902</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/about" className="block hover:text-blue-400">About Us</Link>
                <Link to="/apply" className="block hover:text-blue-400">Apply Now</Link>
                <Link to="/contact" className="block hover:text-blue-400">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400"><FaLinkedin size={24} /></a>
                <a href="#" className="hover:text-blue-400"><FaTwitter size={24} /></a>
                <a href="#" className="hover:text-blue-400"><FaGithub size={24} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2025 FranchiseConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;