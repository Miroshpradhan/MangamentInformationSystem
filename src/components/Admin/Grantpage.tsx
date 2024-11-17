import React, { useState, useEffect } from 'react';
import apiClient from '@/config/axios'; // Assuming this is your API client setup
import jsPDF from 'jspdf'; // To generate PDF for printing
import AddProjectForm from '../Projects/AddProjectForm';

const GrantsPage: React.FC = () => {
  const [grantProjects, setGrantProjects] = useState<any[]>([]);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const demoProjects = [ /* demo projects here */ ];

  // Get user role from localStorage (cannot be changed from the frontend)
  const userRole = localStorage.getItem('userRole') || 'projectEditor'; // Default to 'projectEditor' if no role exists

  // Fetch grant projects when the component mounts
  useEffect(() => {
    const fetchGrantProjects = async () => {
      try {
        const storedProjects = localStorage.getItem('grantProjects');
        if (storedProjects) {
          setGrantProjects(JSON.parse(storedProjects)); // Load from localStorage
        } else {
          const response = await apiClient.get('/grantProjects');
          setGrantProjects(response.data.data); // Assuming response contains data
          localStorage.setItem('grantProjects', JSON.stringify(response.data.data)); // Save to localStorage
        }
      } catch (error) {
        console.error('Error fetching grant projects:', error);
        // Fallback to demoProjects if the API fails
        setGrantProjects(demoProjects);
      }
    };

    fetchGrantProjects();
  }, []);

  // Handle edit for projectEditor role
  const handleEdit = (project: any) => {
    if (userRole === 'projectEditor' && (project.status === 'disapproved' || project.status === 'draft')) {
      setCurrentProject(project);
      setIsFormVisible(true);
    } else {
      alert('You cannot edit this project!');
    }
  };

  // Handle approve of a project for projectApprover role
  const handleApprove = async (projectId: number) => {
    try {
      const response = await apiClient.post(`/approveProject/${projectId}`);
      const updatedProject = response.data.project;
      updatedProject.status = 'Ongoing'; // Set status to Ongoing when approved

      setGrantProjects(grantProjects.map(project =>
        project.id === updatedProject.id ? updatedProject : project
      ));

      // Update localStorage with new project data
      localStorage.setItem('grantProjects', JSON.stringify(grantProjects));

      alert('Project approved successfully!');
    } catch (error) {
      console.error('Error approving project:', error);
      alert('Failed to approve the project.');
    }
  };

  // Handle disapproval of a project for projectApprover role
  const handleDisapprove = async (projectId: number) => {
    try {
      const response = await apiClient.post(`/disapproveProject/${projectId}`);
      const updatedProject = response.data.project;

      setGrantProjects(grantProjects.map(project =>
        project.id === updatedProject.id ? updatedProject : project
      ));

      // Update localStorage with new project data
      localStorage.setItem('grantProjects', JSON.stringify(grantProjects));

      alert('Project disapproved successfully!');
    } catch (error) {
      console.error('Error disapproving project:', error);
      alert('Failed to disapprove the project.');
    }
  };

  // Handle PDF download
  const handleDownload = (project: any) => {
    const doc = new jsPDF();
    const projectData = `
      Project Name: ${project?.projectName || 'N/A'}
      Municipality: ${project?.municipality || 'N/A'}
      Phone: ${project?.phone || 'N/A'}
      Total Cost: ${project?.totalCost ? `$${project.totalCost.toLocaleString()}` : 'N/A'}
      Cost in Words: ${project?.costInWords || 'N/A'}
      Duration: ${project?.duration || 'N/A'}
      Population Benefits: ${project?.populationBenefits || 'N/A'}
      Project Status: ${project?.projectStatus || 'N/A'}
      Is Approved: ${project?.isApproved ? 'Yes' : 'No'}
      Documents:
      Document 1: ${project?.documents.document1 ? 'Available' : 'Not Available'}
      Document 2: ${project?.documents.document2 ? 'Available' : 'Not Available'}
      Document 3: ${project?.documents.document3 ? 'Available' : 'Not Available'}
      Document 4: ${project?.documents.document4 ? 'Available' : 'Not Available'}
      Document 5: ${project?.documents.document5 ? 'Available' : 'Not Available'}
      Description: ${project?.description || 'N/A'}
      Ward: ${project?.ward || 'N/A'}
      Last Updated: ${project?.lastUpdated || 'N/A'}
    `;
    doc.text(projectData, 10, 10);
    doc.save(`${project?.projectName || 'project_data'}.pdf`);
  };

  return (
    <div className="relative">
      <h3 className="text-xl font-semibold mb-4">Grant Project Proposal</h3>

      {/* Add New Project Button */}
      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="absolute top-10 right-10 transform -translate-y-1/2 bg-blue-500 text-white py-3 px-4 rounded-full shadow-lg flex items-center hover:bg-blue-700 transition duration-300"
        >
          + Add New Project
        </button>
      )}

      {/* Display AddProjectForm when the form is visible */}
      {isFormVisible && (
        <div className="relative">
          <AddProjectForm />
          <button
            onClick={() => setIsFormVisible(false)}
            className="absolute top-1/4 right-10 transform -translate-y-1/2 bg-red-500 text-white py-3 px-4 rounded-full shadow-lg flex items-center hover:bg-blue-700 transition duration-300 z-10"
          >
            Close
          </button>
        </div>
      )}

      {/* Grant Projects List */}
      {!isFormVisible && (
        <div>
        
          <div className="space-y-4">
            {grantProjects.map((project) => (
              <div key={project.id} className="border p-4 rounded shadow-md flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <p className="text-sm text-gray-600">Last updated: {project.lastUpdated}</p>
                  <p className="text-sm"><span className="font-semibold">Ward:</span> {project.ward}</p>
                </div>

                {/* Conditional rendering of buttons based on userRole */}
                <div className="flex space-x-2">
                  {userRole === 'projectEditor' && project.status !== 'pending' && (
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                  )}

                  {userRole === 'projectApprover' && project.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(project.id)}
                        className="p-2 bg-green-500 text-white rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDisapprove(project.id)}
                        className="p-2 bg-red-500 text-white rounded"
                      >
                        Disapprove
                      </button>
                    </>
                  )}

                  {/* Download button */}
                  <button
                    onClick={() => handleDownload(project)}
                    className="p-2 bg-gray-500 text-white rounded"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GrantsPage;
