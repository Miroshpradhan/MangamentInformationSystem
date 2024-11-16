import { useState, useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import ProjectItem from "./ProjectItem";
import { AddProjectDialog } from "./AddProjectsDialog";

// Fake project data for initial setup
const fakeProject = {
  id: 1,
  name: "Fake Project",
  description: "This is a fake project for approval.",
  status: "pending",
};


function ProjectLists() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isBackendUp, setIsBackendUp] = useState(true); // Simulating backend status
  const [loading, setLoading] = useState(true);

  // Fetch projects from localStorage (or backend)
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    
    if (storedProjects) {
      // If projects are already in localStorage, use them
      setProjects(JSON.parse(storedProjects));
      setLoading(false);
    } else {
      // If no projects in localStorage, use the fake project
      setProjects([fakeProject]);
      localStorage.setItem("projects", JSON.stringify([fakeProject]));
      setLoading(false);
    }
  }, []);

  // Function to handle status change in the parent component
  const handleStatusChange = (projectId: number, newStatus: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );

    // Store the updated project status in localStorage
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  return (
    <div className="w-full h-[100vh] bg-blue-500 flex justify-center items-center">
      <div className="bg-white w-3/4 h-[90vh] grid grid-cols-6 md:grid-cols-12 grid-rows-12 gap-2 p-4 rounded shadow-lg">
        <div className="row-span-2 flex col-span-12 justify-center items-center">
          <span className="text-xl font-semibold">All Projects</span>
        </div>
        <div className="bg-white w-3/4 h-[90vh] grid grid-cols-6 md:grid-cols-12 grid-rows-12 gap-2 p-4 rounded shadow-lg">
        <div className="row-span-2 flex col-span-12 justify-between items-center px-4">
            <span>All Projects</span> <AddProjectDialog/>
        </div>
        </div>
        {/* <div className="row-span-6 col-span-12" >
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <ProjectItem name="project1" description="Hello , how are you ? description" />
            </ScrollArea>
        </div>
      </div> */}
        <div className="row-span-6 col-span-12">
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {/* Render all ProjectItem components dynamically */}
            {!loading ? (
              projects.map((project) => (
                <ProjectItem
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  description={project.description}
                  status={project.status}
                  onStatusChange={(newStatus) => handleStatusChange(project.id, newStatus)}
                  canEdit={project.status === "pending"}
                  isBackendUp={isBackendUp}
                />
              ))
            ) : (
              <span>Loading projects...</span>
            )}
          </ScrollArea>
</div>
    </div>
    </div>
  );
}

export default ProjectLists;
