import React, { useState, useEffect } from 'react';
import apiClient from '@/config/axios';
import jsPDF from 'jspdf';
import AddProjectForm from '../Projects/AddProjectForm';
import { toast } from 'sonner'; // Import the toast function from sonner
import { useAuth } from '../AuthContext';


const GrantsPage: React.FC = () => {
  const [grantProjects, setGrantProjects] = useState<any[]>([]);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const demoProjects = [
    {
      id: 1,
      name: 'Community Health Project',
      description: 'A project focused on improving community health services.',
      status: 'pending',
      ward: 'Ward 5',
      lastUpdated: '2024-10-15',
      municipality: 'Municipality Name',
      phone: '123-456-7890',
      projectName: 'Community Health Project',
      totalCost: 1000000,
      costInWords: 'One million dollars',
      projectStatus: 'Ongoing',
      duration: '12 Months',
      populationBenefits: '2000',
      isApproved: true,
      documents: { document1: null, document2: null, document3: null, document4: null, document5: null },
    },
    {
      id: 2,
      name: 'Education for All',
      description: 'A project providing free education materials to underprivileged areas.',
      status: 'Pending',
      ward: 'Ward 7',
      lastUpdated: '2024-10-10',
      municipality: 'Municipality Name',
      phone: '123-456-7890',
      projectName: 'Education for All',
      totalCost: 500000,
      costInWords: 'Five hundred thousand dollars',
      projectStatus: 'Pending',
      duration: '6 Months',
      populationBenefits: '5000',
      isApproved: false,
      documents: { document1: null, document2: null, document3: null, document4: null, document5: null },
    },
  ];

  // const userRole = localStorage.getItem('role') || 'projectEditor';
  const {role} = useAuth()
  console.log(role);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchGrantProjects = async () => {
      try {
        // const storedProjects = localStorage.getItem('grantProjects');
        // if (storedProjects) {
        //   setGrantProjects(JSON.parse(storedProjects));
        // } else {
          const response = await apiClient.get('/grantProject', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token, // Add the token if required
            }})
          console.log(response);
          setGrantProjects(response.data.data.project);
          localStorage.setItem('grantProjects', JSON.stringify(response.data.data));
        // }
      } catch (error) {
        console.error('Error fetching grant projects:', error);
        setGrantProjects(demoProjects);
        toast.error('Failed to fetch projects. Using demo data.');
      }
    };

    fetchGrantProjects();
  }, []);

  const handleEdit = (project: any) => {
    if (role === 'projectEntry' && (project.status === 'disapproved' || project.status === 'draft')) {
      setCurrentProject(project);
      setIsFormVisible(true);
    } else {
      toast.error('You cannot edit this project!');
    }
  };

  const handleApprove = async (projectId: number) => {
    try {
      const response = await apiClient.post(`/approveProject/${projectId}`);
      const updatedProject = response.data.project;
      updatedProject.status = 'Ongoing';

      setGrantProjects(grantProjects.map((project) => (project.id === updatedProject.id ? updatedProject : project)));
      localStorage.setItem('grantProjects', JSON.stringify(grantProjects));

      toast.success('Project approved successfully!');
    } catch (error) {
      console.error('Error approving project:', error);
      toast.error('Failed to approve the project.');
    }
  };

  const handleDisapprove = async (projectId: number) => {
    try {
      const response = await apiClient.post(`/disapproveProject/${projectId}`);
      const updatedProject = response.data.project;

      setGrantProjects(grantProjects.filter((project) => project.id !== projectId)); // Remove for approver
      localStorage.setItem('grantProjects', JSON.stringify(grantProjects));

      toast.success('Project disapproved successfully!');
    } catch (error) {
      console.error('Error disapproving project:', error);
      toast.error('Failed to disapprove the project.');
    }
  };

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
  
  className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center group"
>
  <span className="text-2xl">+</span> {/* Plus sign */}
  <span className="ml-2 hidden group-hover:inline-block transition-all duration-300 whitespace-nowrap">
    Add New Project {/* Show text on hover */}
  </span>
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
                  <h3 className="font-bold text-lg">{project.project_name}</h3>
                  <p className="text-sm text-gray-600">Last updated: {project.updated_at}</p>
                  <p className="text-sm">
                    <span className="font-semibold">Ward:</span> {project.ward}
                  </p>
                </div>

                {/* Conditional rendering of buttons based on userRole */}
                <div className="flex space-x-2">
                  {role === 'projectEditor' && project.status !== 'pending' && (
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                  )}

                  {role === 'projectApprover' && project.status === 'pending' && (
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
