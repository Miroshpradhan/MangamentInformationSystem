import React, { useState } from 'react';
import AddProjectForm from '../Projects/AddProjectForm';

const GrantsPage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="relative">
     <h3 className="text-xl font-semibold mb-4">Grant Project Proposal</h3>
      {isFormVisible && (
        <div >
      
          <AddProjectForm />
       

          {/* "Back" Button when form is visible */}
          <button
            onClick={() => setIsFormVisible(false)}
            className="absolute top-1/3 right-10 transform -translate-y-1/2 bg-red-500 text-white py-3 px-4 rounded-full shadow-lg flex items-center hover:bg-blue-700 transition duration-300 z-10"
          >
            
            Close 
          </button>
        </div>
      )}

      {/* Show the page content only when the form is not visible */}
      {!isFormVisible && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Grants Project Proposal</h2>
          <p className="text-gray-600 mb-4">
            Select a project to propose for a grant or create a new project.
          </p>

          <button
            onClick={() => setIsFormVisible(true)}
            className="fixed bottom-6 right-6 bg-blue-500 text-white py-3 px-4 rounded-full shadow-lg flex items-center hover:bg-blue-700 transition duration-300"
          >
            <span className="text-2xl mr-2">+</span>
            <span className="hidden md:block">Add Project</span>
          </button>
        
        </div>
      )}
    </div>
  );
};

export default GrantsPage;
