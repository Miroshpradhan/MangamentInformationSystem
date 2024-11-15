import { useState } from "react";
import { Label, Input, Button } from "@/components/ui";
import axios from "axios";
import { toast } from "sonner";

const AddInitialProjectForm = ({ setProjects, setIsFormOpen, cancelForm, userRole }) => {
    const [projectNameEnglish, setProjectNameEnglish] = useState<string>("");
    const [projectNameNepali, setProjectNameNepali] = useState<string>("");
    const [projectStatus, setProjectStatus] = useState<string>("new");
    const [ward, setWard] = useState<string>("1");
    const [projectBudgetCode, setProjectBudgetCode] = useState<string>("");
  
    const handleSaveDraft = () => {
      const projectData = {
        projectNameEnglish,
        projectNameNepali,
        projectStatus,
        ward,
        projectBudgetCode,
        status: "Draft",
      };
  
      // Save project to localStorage (first)
      const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      savedProjects.push(projectData);
      localStorage.setItem("projects", JSON.stringify(savedProjects));
  
      // Update the state of projects in the parent component immediately
      setProjects((prevProjects) => [
        ...prevProjects,
        { ...projectData, id: Math.random().toString(36).substr(2, 9) }, // Add an ID if necessary
      ]);
  
      // Optionally, save it to the backend (backend request still happens)
      axios
        .post("/api/projects", projectData)
        .then((response) => {
          console.log("Project saved to backend:", response.data);
          setProjects((prevProjects) => [...prevProjects, response.data]);
        })
        .catch((error) => {
          console.error("Error saving to backend:", error);
        });
  
      // Close form and show success notification
      setIsFormOpen(false);
      toast.success(`Project "${projectNameEnglish}" saved as Draft!`);
    };
  
    const handleSubmitProject = () => {
      const projectData = {
        projectNameEnglish,
        projectNameNepali,
        projectStatus,
        ward,
        projectBudgetCode,
        status: "Submitted",
      };
  
      // Save to localStorage (first)
      const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      savedProjects.push(projectData);
      localStorage.setItem("projects", JSON.stringify(savedProjects));
  
      // Update the state of projects in the parent component immediately
      setProjects((prevProjects) => [
        ...prevProjects,
        { ...projectData, id: Math.random().toString(36).substr(2, 9) }, // Add an ID if necessary
      ]);
  
      // Submit project to backend (backend request still happens)
      axios
        .post("/api/projects", projectData)
        .then((response) => {
          console.log("Project submitted:", response.data);
          setProjects((prevProjects) => [...prevProjects, response.data]);
        })
        .catch((error) => {
          console.error("Error submitting project:", error);
        });
  
      // Close form and show success notification
      setIsFormOpen(false);
      toast.success(`Project "${projectNameEnglish}" submitted successfully!`);
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
              onClick={handleSaveDraft}
              className="w-[200px] py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
            >
              Save Draft
            </Button>
            <Button
              onClick={handleSubmitProject}
              className="w-[200px] py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Submit Project
            </Button>
          </div>
          <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={cancelForm} // Call cancelForm to close the form
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

export default AddInitialProjectForm;
