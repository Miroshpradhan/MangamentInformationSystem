import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartLine, faCog, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';

const AdminDashboard: React.FC = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isManagementDropdownOpen, setManagementDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ne'>('en'); // 'en' for English, 'ne' for Nepali
  const [activeLink, setActiveLink] = useState<string>(''); 
  const { logout } = useAuth();
  
  const handleLanguageChange = (lang: 'en' | 'ne') => {
    setLanguage(lang);
    setLanguageDropdownOpen(false); 
  };
 
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
const navigate= useNavigate()
  const handleLogout = () => {
    logout();
    navigate('/'); 
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="bg-gray-200 text-black flex items-center justify-between w-full p-4 shadow-md fixed top-0 left-0 z-10">
        <div className="flex flex-col items-start"> 
          <div className="font-bold text-xl">
            {language === 'en' ? 'LOCAL LEVEL PROJECT BANK' : 'व्यवस्थापन प्रणाली'}
          </div>
          <div className="text-sm text-gray-700"> 
            {language === 'en' ? 'Management Information System' : 'व्यवस्थापन जानकारी प्रणाली'}
          </div>
        </div>

        <ul className="flex-grow flex space-x-8 items-center justify-center"> {/* Centered between logo and profile picture */}
        <li className="relative group">
        <Link
        to="grants"
        className={`relative hover:text-gray-800 ${activeLink === 'grants' ? 'text-sky-500' : 'text-black'}`}
        onClick={() => handleLinkClick('grants')}
        onMouseEnter={toggleDropdown} // Show on hover
      >
        {language === 'en' ? 'Grants' : 'अनुदानहरू'}
        {activeLink === 'grants' && (
          <div className="absolute -bottom-1 left-0 h-1 w-full bg-sky-500" />
        )}
      </Link>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 space-y-2 bg-white border rounded shadow-lg z-10">
          <Link
            to="/dashboard/grants"
            className="block px-4 py-2 text-black hover:bg-gray-200"
            onClick={closeDropdown} // Close dropdown on click
          >
            {language === 'en' ? 'Project Grant' : 'परियोजना अनुदान'}
          </Link>
          <Link
            to="/dashboard/grant-proposal"
            className="block px-4 py-2 text-black hover:bg-gray-200"
            onClick={closeDropdown} // Close dropdown on click
          >
            {language === 'en' ? 'Grant Proposal' : 'अनुदान प्रस्ताव'}
          </Link>
        </div>
      )}
    </li>
          <li>
            <Link 
              to="dashboard" 
              className={`hover:text-gray-800 relative ${activeLink === 'dashboard' ? 'text-sky-500' : 'text-black'}`}
              onClick={() => handleLinkClick('dashboard')}
            >
              {language === 'en' ? 'Dashboard' : 'ड्यासबोर्ड'}
              {activeLink === '' && <div className="absolute -bottom-1 left-0 h-1 w-full bg-sky-500" />} {/* Underline */}
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

        <div className="relative flex items-center">
          <img
            src="./profile.jpg" 
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
          />
          {isProfileDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg">
              <li>
              <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200">
                  {language === 'en' ? 'Logout' : 'लगआउट'}
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-16">
     
      
       
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Outlet for nested routes */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
