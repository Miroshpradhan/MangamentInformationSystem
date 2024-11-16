import { useState } from "react";
import { Label, Input, Button } from "@/components/ui";
import { toast } from "sonner";
import apiClient from "@/config/axios"; // Import apiClient
import { useForm } from "react-hook-form";  // Import react-hook-form
import * as Yup from "yup";  // Import Yup for validation
import { yupResolver } from "@hookform/resolvers/yup";  // Import yupResolver

const AddInitialProjectForm = ({ setProjects, setIsFormOpen, cancelForm, userRole }) => {
  const token = localStorage.getItem('token');  // Access token and role from useAuth

  // Yup validation schema
  const schema = Yup.object().shape({
    projectNameEnglish: Yup.string().required("Project Name (English) is required"),
    projectNameNepali: Yup.string().required("Project Name (Nepali) is required"),
    projectBudgetCode: Yup.string().required("Project Budget Code is required"),
    ward: Yup.string().required("Ward is required"),
  });

  // Using react-hook-form with Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle saving the draft project
  const handleSaveDraft = async (data) => {
    const projectData = {
      project_name: data.projectNameEnglish,
      project_name_nepali: data.projectNameNepali,
      project_status: "pending", 
      ward_id: data.ward,
      project_budget_code: data.projectBudgetCode,
      status: "Draft",
    };

    try {
      const response = await apiClient.post("/api/projects/draftProjects", projectData, {
        headers: { Authorization: token },
      });

      console.log("Project saved as draft:", response.data);
      setProjects((prevProjects) => [...prevProjects, response.data]);
      toast.success(`Project "${data.projectNameEnglish}" saved as Draft!`);
    } catch (error) {
      console.error("Error saving to backend:", error);
      toast.error("Failed to save draft.");
    }

    setIsFormOpen(false); // Close the form
  };

  // Handle submitting the project
  const handleSubmitProject = async (data) => {
    const projectData = {
      project_name: data.projectNameEnglish,
      project_name_nepali: data.projectNameNepali,
      project_status: "pending", 
      ward_id: data.ward,
      project_budget_code: data.projectBudgetCode,
      status: "Submitted",
    };

    try {
      const response = await apiClient.post("/api/projects/grantProjects", projectData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Project submitted:", response.data);
      setProjects((prevProjects) => [...prevProjects, response.data]);
      toast.success(`Project "${data.projectNameEnglish}" submitted successfully!`);
    } catch (error) {
      console.error("Error submitting project:", error);
      toast.error("Failed to submit project.");
    }

    setIsFormOpen(false); // Close the form
  };

  return (
    <div className="w-full h-auto bg-[#F7FAFC] flex justify-center items-center py-10">
      <div className="bg-white w-4/5 max-w-5xl p-8 rounded-lg shadow-lg flex">
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
              <Label className="text-sm font-semibold">Project Name (English)</Label>
              <Input
                {...register("projectNameEnglish")}  // Register input with react-hook-form
                placeholder="Enter Project Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.projectNameEnglish && (
                <span className="text-red-500 text-sm">{errors.projectNameEnglish.message}</span>
              )}

              <Label className="text-sm font-semibold">Project Budget Code</Label>
              <Input
                {...register("projectBudgetCode")}  // Register input with react-hook-form
                placeholder="Enter Project Budget Code"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.projectBudgetCode && (
                <span className="text-red-500 text-sm">{errors.projectBudgetCode.message}</span>
              )}

              <Label className="text-sm font-semibold">Project Status</Label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="new"
                    {...register("status")}
                    value="new"
                    className="form-radio"
                  />
                  <Label htmlFor="new" className="ml-2 text-sm">New</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ongoing"
                    {...register("status")}
                    value="ongoing"
                    className="form-radio"
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
            {...register("projectNameNepali")}
            placeholder="Enter Project Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.projectNameNepali && (
            <span className="text-red-500 text-sm">{errors.projectNameNepali.message}</span>
          )}

          <Label className="text-sm font-semibold">Ward</Label>
          <Input
            {...register("ward")}
            placeholder="Enter Ward"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.ward && (
            <span className="text-red-500 text-sm">{errors.ward.message}</span>
          )}

          <div className="flex justify-end mt-6 space-x-4">
            <Button
              onClick={handleSubmit(handleSaveDraft)} // Handle save draft
              className="w-[200px] py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
            >
              Save Draft
            </Button>
            <Button
              onClick={handleSubmit(handleSubmitProject)} // Handle submit project
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
