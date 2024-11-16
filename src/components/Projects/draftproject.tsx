import { useState } from "react";
import { Label, Input, Button } from "@/components/ui";
import { toast } from "sonner";
import apiClient from "@/config/axios";
import { useAuth } from "../AuthContext";  // Assuming you have this custom hook

const AddInitialProjectForm = ({ setProjects, setIsFormOpen, cancelForm }) => {
  const [projectNameEnglish, setProjectNameEnglish] = useState("");
  const [projectNameNepali, setProjectNameNepali] = useState("");
  const [projectStatus, setProjectStatus] = useState("new");
  const [ward, setWard] = useState("1");
  const [projectBudgetCode, setProjectBudgetCode] = useState("");

  //const { token, role } = useAuth();  // Access token and role from useAuth
  const token = localStorage.getItem('token');
  const handleSaveDraft = () => {
    const projectData = {
      project_name: projectNameEnglish,
      project_name_nepali: projectNameNepali,
      project_status: "pending", 
      ward_id: ward,
      project_budget_code: projectBudgetCode,
      status: "Draft",
    };
    apiClient.post("/draftProjects", projectData, {
        headers: { Authorization: token}  
      })
      .then((response) => {
        console.log("Project saved as draft:", response.data);
        setProjects((prevProjects) => [
          ...prevProjects,
          response.data,
        ]);
        toast.success(`Project "${projectNameEnglish}" saved as Draft!`);
      })
      .catch((error) => {
        console.error("Error saving to backend:", error);
        toast.error("Failed to save draft.");
      });

    // Close the form
    setIsFormOpen(false);
  };

  const handleSubmitProject = () => {
    const projectData = {
      project_name: projectNameEnglish,
      project_name_nepali: projectNameNepali,
      project_status: "pending", // backend expects 'pending' for submitted
      ward_id: ward,
      project_budget_code: projectBudgetCode,
      status: "Submitted",
    };

    // Submit project to backend
    apiClient.post("/grantProjects", projectData, {
        headers: { Authorization: `Bearer ${token}` }  // Include token in headers
      })
      .then((response) => {
        setProjects((prevProjects) => [
          ...prevProjects,
          response.data,
        ]);
        toast.success(`Project "${projectNameEnglish}" submitted successfully!`);
      })
      .catch((error) => {
        console.error("Error submitting project:", error);
        toast.error("Failed to submit project.");
      });

    // Close the form
    setIsFormOpen(false);
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
          <Input
            name="ward"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            placeholder="Enter Ward"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

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
