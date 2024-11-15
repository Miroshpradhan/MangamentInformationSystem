import { useState, useEffect } from "react";
import { Label, Input, Button } from "@/components/ui";
import axios from "axios";
import { toast } from "sonner";

const EditProjectForm = ({
  projectData, // The existing project data passed as a prop for editing
  setProjects,
  setIsFormOpen,
  cancelForm,
  userRole,
}) => {
  // Initialize state with existing project data (if available)
  const [projectNameEnglish, setProjectNameEnglish] = useState<string>(projectData?.projectNameEnglish || "");
  const [projectNameNepali, setProjectNameNepali] = useState<string>(projectData?.projectNameNepali || "");
  const [projectStatus, setProjectStatus] = useState<string>(projectData?.projectStatus || "new");
  const [ward, setWard] = useState<string>(projectData?.ward || "1");
  const [projectBudgetCode, setProjectBudgetCode] = useState<string>(projectData?.projectBudgetCode || "");

  // Handle form submission to update the project
  const handleUpdateProject = () => {
    const updatedProjectData = {
      projectNameEnglish,
      projectNameNepali,
      projectStatus,
      ward,
      projectBudgetCode,
      status: "Submitted",
    };

    // Update the project in localStorage
    const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const updatedProjects = savedProjects.map((project: any) =>
      project.id === projectData.id ? { ...project, ...updatedProjectData } : project
    );
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    // Update the state of projects in the parent component
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectData.id ? { ...project, ...updatedProjectData } : project
      )
    );

    // Update project in the backend (if needed)
    axios
      .put(`/api/projects/${projectData.id}`, updatedProjectData)
      .then((response) => {
        console.log("Project updated:", response.data);
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === projectData.id ? { ...project, ...response.data } : project
          )
        );
      })
      .catch((error) => {
        console.error("Error updating project:", error);
      });

    // Close form and show success notification
    setIsFormOpen(false);
    toast.success(`Project "${projectNameEnglish}" updated successfully!`);
  };

  // Handle cancel
  const handleCancel = () => {
    setIsFormOpen(false);
    cancelForm();
  };

  return (
    <div className="w-full h-auto bg-[#F7FAFC] flex justify-center items-center py-10">
      <div className="bg-white w-4/5 max-w-5xl p-8 rounded-lg shadow-lg flex">
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
              <Label className="text-sm font-semibold">Project Name (English)</Label>
              <Input
                name="projectNameEnglish"
                value={projectNameEnglish}
                onChange={(e) => setProjectNameEnglish(e.target.value)}
                placeholder="Enter Project Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <Label className="text-sm font-semibold">Project Budget Code</Label>
              <Input
                name="projectBudgetCode"
                value={projectBudgetCode}
                onChange={(e) => setProjectBudgetCode(e.target.value)}
                placeholder="Enter Project Budget Code"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <Label className="text-sm font-semibold">Project Status</Label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="new"
                    name="status"
                    value="new"
                    checked={projectStatus === "new"}
                    onChange={() => setProjectStatus("new")}
                  />
                  <Label htmlFor="new" className="ml-2 text-sm">New</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ongoing"
                    name="status"
                    value="ongoing"
                    checked={projectStatus === "ongoing"}
                    onChange={() => setProjectStatus("ongoing")}
                  />
                  <Label htmlFor="ongoing" className="ml-2 text-sm">Ongoing</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Label className="text-sm font-semibold">Project Name (Nepali)</Label>
          <Input
            name="projectNameNepali"
            value={projectNameNepali}
            onChange={(e) => setProjectNameNepali(e.target.value)}
            placeholder="Enter Project Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <Label className="text-sm font-semibold">Ward</Label>
          <select
            name="ward"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Ward 1</option>
            <option value="2">Ward 2</option>
            <option value="3">Ward 3</option>
          </select>

          <div className="flex justify-end mt-6 space-x-4">
            <Button
              onClick={handleUpdateProject}
              className="w-[200px] py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Update Project
            </Button>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleCancel} // Call cancelForm to close the form
              className="bg-red-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectForm;
