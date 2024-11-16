import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";
import axios from "axios";

// Demo data in case the backend is down
const demoProjects = [
  {
    id: 1,
    name: "Demo Project 1",
    description: "This is a demo project description.",
    status: "pending",
    canEdit: true,
    isBackendUp: false,
  },
  {
    id: 2,
    name: "Demo Project 2",
    description: "Another demo project description.",
    status: "approved",
    canEdit: false,
    isBackendUp: false,
  },
  {
    id: 3,
    name: "Demo Project 3",
    description: "This project is for testing purposes.",
    status: "disapproved",
    canEdit: true,
    isBackendUp: false,
  },
];

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  canEdit: boolean;
  isBackendUp: boolean;
}

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBackendUp, setIsBackendUp] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/projects");
        setProjects(response.data);
        setIsBackendUp(true);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsBackendUp(false);
        setProjects(demoProjects); // Use demo data if backend is down
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [isBackendUp]);
//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get("/projects"); // Replace with the correct endpoint
//       setProjects(response.data);
//       setIsBackendUp(true); // Backend is available
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//       setIsBackendUp(false); // Backend is down, fallback to demo data
//       setProjects(demoProjects); // Use demo data if the backend is down
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isBackendUp) {
//     fetchProjects();
//   } else {
//     setLoading(false); // If backend is down, stop loading
//   }
// }, [isBackendUp]);

// const handleStatusChange = async (projectId: number, newStatus: string) => {
//   if (isBackendUp) {
//     try {
//       await axios.put(`/projects/${projectId}/status`, { status: newStatus }); // API to update status
//       setProjects((prevProjects) =>
//         prevProjects.map((project) =>
//           project.id === projectId ? { ...project, status: newStatus } : project
//         )
//       );
//     } catch (error) {
//       console.error("Error updating project status:", error);
//     }
//   } else {
//     setProjects((prevProjects) =>
//       prevProjects.map((project) =>
//         project.id === projectId ? { ...project, status: newStatus } : project
//       )
//     );
//   }
// };
  const handleStatusChange = (projectId: number, newStatus: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );
  };

  return (
    <div className="project-list">
      {loading ? (
        <div>Loading projects...</div>
      ) : (
        projects.map((project) => (
          <ProjectItem
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            status={project.isSubmitted ? "submitted" : "not submitted"}
            onStatusChange={handleStatusChange}
            canEdit={project.canEdit}
            isBackendUp={isBackendUp}
          />
        ))
      )}
    </div>
  );
};

export default ProjectList;
