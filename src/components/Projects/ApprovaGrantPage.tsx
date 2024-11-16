import { useState, useEffect } from "react";
import ProjectItem from "./ProjectItem";

const ApproveGrantPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isBackendUp, setIsBackendUp] = useState(true); // Track if backend is up

  useEffect(() => {
    // Fetch the list of projects that need approval
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects?status=pending");

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setProjects(data);
        setIsBackendUp(true); // Backend is up, projects fetched
      } catch (error) {
        console.error("Failed to fetch projects", error);
        setIsBackendUp(false); // Backend is down
      }
    };

    fetchProjects();
  }, []);

  const handleStatusChange = (id: number, newStatus: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, project_status: newStatus } : project
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Approve/Disapprove Projects</h1>

      {isBackendUp ? (
        // When backend is up, show the list of projects
        projects.length > 0 ? (
          projects.map((project) => (
            <ProjectItem
              key={project.id}
              id={project.id}
              name={project.project_name} // Assuming project_name is used for the project title
              description={project.project_details?.description || "No description available."}
              status={project.isSubmitted ? "submitted" : "not submitted"} // Show submission status
              onStatusChange={(newStatus) => handleStatusChange(project.id, newStatus)} // For project approval/disapproval
              canEdit={false} // This can be based on userRole
              isBackendUp={isBackendUp} // Pass backend status as prop
            />
          ))
        ) : (
          <p className="text-lg text-gray-600">No projects available for approval.</p>
        )
      ) : (
        // When backend is down, show a placeholder or demo content
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Project Demo (Backend is down)</h2>
          <p className="text-lg text-gray-600 mb-4">The backend is currently unavailable. Please try again later.</p>
          {/* Demo Content */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-800">Demo Project 1</h3>
            <p className="text-gray-600 mb-4">This is a demo project description. The backend is currently unavailable, but you can see the demo content here.</p>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm cursor-not-allowed"
                disabled
              >
                Approve
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm cursor-not-allowed"
                disabled
              >
                Disapprove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveGrantPage;
