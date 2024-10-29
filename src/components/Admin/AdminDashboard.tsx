import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartLine, faCog, faLanguage } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard: React.FC = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isManagementDropdownOpen, setManagementDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ne'>('en'); // 'en' for English, 'ne' for Nepali
  const [activeLink, setActiveLink] = useState<string>(''); // Track active link

  const handleLanguageChange = (lang: 'en' | 'ne') => {
    setLanguage(lang);
    setLanguageDropdownOpen(false); // Close dropdown after selection
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link); // Set active link
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="bg-gray-200 text-black flex items-center justify-between w-full p-4 shadow-md fixed top-0 left-0 z-10">
        <div className="flex flex-col items-start"> {/* Wrap in flex column for stacking */}
          <div className="font-bold text-xl">
            {language === 'en' ? 'LOCAL LEVEL PROJECT BANK' : 'व्यवस्थापन प्रणाली'}
          </div>
          <div className="text-sm text-gray-700"> {/* Add styling for less bold text */}
            {language === 'en' ? 'Management Information System' : 'व्यवस्थापन जानकारी प्रणाली'}
          </div>
        </div>

        <ul className="flex-grow flex space-x-8 items-center justify-center"> {/* Centered between logo and profile picture */}
          <li>
            <Link 
              to="grants" 
              className={`hover:text-gray-800 relative ${activeLink === 'grants' ? 'text-sky-500' : 'text-black'}`}
              onClick={() => handleLinkClick('grants')}
            >
              {language === 'en' ? 'Grants' : 'अनुदानहरू'}
              {activeLink === 'grants' && <div className="absolute -bottom-1 left-0 h-1 w-full bg-sky-500" />} {/* Underline */}
            </Link>
          </li>
          <li>
            <Link 
              to="dashboard" 
              className={`hover:text-gray-800 relative ${activeLink === 'dashboard' ? 'text-sky-500' : 'text-black'}`}
              onClick={() => handleLinkClick('dashboard')}
            >
              {language === 'en' ? 'Dashboard' : 'ड्यासबोर्ड'}
              {activeLink === 'dashboard' && <div className="absolute -bottom-1 left-0 h-1 w-full bg-sky-500" />} {/* Underline */}
            </Link>
          </li>
          <li>
            <Link 
              to="programs" 
              className={`hover:text-gray-800 relative ${activeLink === 'programs' ? 'text-sky-500' : 'text-black'}`}
              onClick={() => handleLinkClick('programs')}
            >
              {language === 'en' ? 'Programs' : 'कार्यक्रमहरू'}
              {activeLink === 'programs' && <div className="absolute -bottom-1 left-0 h-1 w-full bg-sky-500" />} {/* Underline */}
            </Link>
          </li>
          <li className="relative">
            <button 
              className="hover:text-gray-800" 
              onClick={() => setManagementDropdownOpen(!isManagementDropdownOpen)}
            >
              <FontAwesomeIcon icon={faCog} className="mr-1" />
              {language === 'en' ? 'Management' : 'व्यवस्थापन'}
            </button>
            {isManagementDropdownOpen && (
              <ul className="absolute bg-white text-black rounded shadow-lg">
                <li>
                  <Link to="management/users" className="block px-4 py-2 hover:bg-gray-200">
                    <FontAwesomeIcon icon={faUsers} className="mr-1" />
                    {language === 'en' ? 'Users' : 'प्रयोगकर्ताहरू'}
                  </Link>
                </li>
                <li>
                  <Link to="management/wards" className="block px-4 py-2 hover:bg-gray-200">
                    <FontAwesomeIcon icon={faChartLine} className="mr-1" />
                    {language === 'en' ? 'Wards' : 'वार्डहरू'}
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="relative">
            <button 
              className="hover:text-gray-800" 
              onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <FontAwesomeIcon icon={faLanguage} className="mr-1" />
              {language === 'en' ? 'Language' : 'भाषा'}
            </button>
            {isLanguageDropdownOpen && (
              <ul className="absolute bg-white text-black rounded shadow-lg">
                <li>
                  <button onClick={() => handleLanguageChange('ne')} className="block px-4 py-2 hover:bg-gray-200">
                    नेपाली
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLanguageChange('en')} className="block px-4 py-2 hover:bg-gray-200">
                    English
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>

        <div className="relative flex items-center"> {/* Profile picture on the right */}
          <img
            src="./profile.jpg" 
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
          />
          {isProfileDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg">
              <li>
                <button onClick={() => { /* Handle logout */ }} className="block px-4 py-2 hover:bg-gray-200">
                  {language === 'en' ? 'Logout' : 'लगआउट'}
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-16">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'en' ? 'Welcome to the Admin Dashboard' : 'व्यवस्थापन ड्यासबोर्डमा स्वागत छ'}
        </h1>
        <p className="text-gray-600">
          {language === 'en' ? 'Manage your projects and grants effectively.' : 'तपाईंको परियोजनाहरू र अनुदानहरू प्रभावकारी रूपमा व्यवस्थापन गर्नुहोस्।'}
        </p>
        <p className="text-gray-600 mb-4">
          {language === 'en' ? 'Use the navigation to access different sections.' : 'विभिन्न खण्डहरूमा पहुँच गर्न नेविगेसन प्रयोग गर्नुहोस्।'}
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Outlet for nested routes */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
