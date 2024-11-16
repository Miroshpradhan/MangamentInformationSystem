import { useState, useEffect, ChangeEvent } from 'react';
import EditProjectForm from '../Projects/editProject';// Import the EditProjectForm
import AddInitialProjectForm from '../Projects/draftproject';
import { useAuth } from '../AuthContext';
import apiClient from "@/config/axios";
interface Project {
  id: number;
  name: string;
  ward: string;
  lastUpdated: string;
  status: string;
}

const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]); // Projects array
  const userRole = useAuth();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]); // Filtered projects
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query string
 
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false); // State to control form visibility
  const [editProjectData, setEditProjectData] = useState<Project | null>(null); // State for editing project

  const exampleProjects: Project[] = [
    { id: 1, name: 'Yashok WSSP', ward: 'Ward 1', lastUpdated: 'Jun 16, 2022', status: 'Draft' },
    { id: 2, name: 'Panchthar WSSP', ward: 'Ward 3', lastUpdated: 'Jun 16, 2022', status: 'Ongoing' },
  ];

  useEffect(() => {
    setProjects(exampleProjects); // Set initial projects on mount only
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // useEffect(() => {
  //   setFilteredProjects(userRole === 'user' ? exampleProjects.filter(p => p.ward === 'Ward 1') : exampleProjects);
  // }, [userRole]);  // This handles only filtering based on role
  
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredProjects(projects.filter(project => project.name.toLowerCase().includes(query)));
  };

  const handleEdit = (project: Project) => {
    setEditProjectData(project); // Set the project data for editing
    setIsFormOpen(true); // Open the form in edit mode
  };
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await apiClient.get('/grantProject', {
          headers: {
            'Content-Type': 'application/json',
            // add authorization header if needed
            Authorization: token
          },
        });
        console.log(response);
        if (response.status == 200) {
          setProjects(response.data.data.project); // Assuming your API returns an array of projects in `data`
        } else {
          console.error('Failed to fetch projects:', response.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjects();
  }, []);
  
  const handleFormSubmit = (newProject: Project) => {
    if (editProjectData) {
      // Update the existing project
      setProjects(projects.map(p => (p.id === newProject.id ? newProject : p)));
    } else {
      // Add a new project
      setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
    }
    setIsFormOpen(false);
    setEditProjectData(null); // Reset edit state after form submission
  };

  const cancelForm = () => {
    setIsFormOpen(false); // Close the form when cancel button is clicked
    setEditProjectData(null); // Reset the edit project data
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div>
          <span>Total projects submitted: 7185</span> |{' '}
          <span>Project Selected: 1380</span> |{' '}
          <span>Implemented Projects: 5808</span>
        </div>
      </header>

      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by project name..."
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 rounded w-full"
        />
        <div className="ml-4">
          <span className="font-semibold">Total Projects Cost: </span>
          <span className="text-xl font-bold">NPR 474,301,116,272</span>
        </div>
      </div>

      <div className="space-y-4">
        {filteredProjects.map(project => (
          <div key={project.id} className="border p-4 rounded shadow-md flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{project.name}</h3>
              <p className="text-sm text-gray-600">Last updated: {project.lastUpdated}</p>
              <p className="text-sm">
                <span className="font-semibold">Ward:</span> {project.ward}
              </p>
              <p className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-orange-500 rounded">
                {project.status}
              </p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(project)} className="p-2 bg-blue-500 text-white rounded">
                Edit
              </button>
              <button className="p-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <button
  onClick={() => {
    setEditProjectData(null); 
    setIsFormOpen(true);
  }}
  className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center group"
>
  <span className="text-2xl">+</span>
  <span className="ml-2 hidden group-hover:inline-block transition-all duration-300 whitespace-nowrap">
    Add New Project
  </span>
</button>


      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative p-6 rounded-lg w-full h-full max-h-screen overflow-y-auto shadow-lg">
            <button
              onClick={cancelForm}
              className="absolute top-[10px] right-[10px] bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
            >
              Cancel
            </button>
            {/* Conditionally render EditProjectForm if we are in edit mode */}
            {editProjectData ? (
              <EditProjectForm
              setIsFormOpen={setIsFormOpen}
              setProjects={handleFormSubmit}
              userRole={userRole}
              cancelForm={cancelForm}
                projectData={editProjectData} // Pass the project to be edited
              />
            ) : (
              // Add the form for creating a new project if not editing
              <AddInitialProjectForm
                setIsFormOpen={setIsFormOpen}
                setProjects={handleFormSubmit}
                userRole={userRole}
                cancelForm={cancelForm}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
