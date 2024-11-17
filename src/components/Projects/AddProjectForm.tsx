import { useEffect, useState } from "react";
import { Label, Input, Button } from "@/components/ui";
import apiClient from "@/config/axios";

// Function to convert numbers to words (for the budget)
const numberToWords = (num: number): string => {
  const ones: string[] = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens: string[] = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const thousands: string[] = ['', 'Thousand', 'Million', 'Billion'];

  if (num === 0) return 'Zero';

  let words = '';
  let place = 0;

  while (num > 0) {
    if (num % 1000 !== 0) {
      words = `${convertToWords(num % 1000)} ${thousands[place]} ${words}`;
    }
    num = Math.floor(num / 1000);
    place++;
  }

  return words.trim();

  function convertToWords(n: number): string {
    if (n === 0) return '';
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
    return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertToWords(n % 100) : '');
  }
};

const AddProjectForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    municipality: "",
    phone: "",
    project_name: "",
    budget: "",
    costInWords: "",
    projectStatus: "draft",
    projectDuration: "",
    populationBenefits: "",
    address: "",
    email: "",
    documents: {
      document1: null,
      document2: null,
      document3: null,
      document4: null,
      document5: null,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const token = localStorage.getItem('token'); // Authorization token

  // Handle input change for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        documents: {
          ...prevData.documents,
          [name]: files[0],
        },
      }));
    }
  };

  // Update cost in words whenever budget changes
  useEffect(() => {
    const numericCost = Number(formData.budget);
    if (!isNaN(numericCost)) {
      setFormData((prevData) => ({
        ...prevData,
        costInWords: numberToWords(numericCost),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        costInWords: "",
      }));
    }
  }, [formData.budget]);

  // Handle save as draft
  const handleSave = async () => {
    setIsSubmitting(true); 

    const formDataToSave = new FormData();

    // Append all text fields to FormData
    Object.keys(formData).forEach((key) => {
      if (key !== "documents") {
        formDataToSave.append(key, formData[key]);
      }
    });

    // Append file fields to FormData
    Object.keys(formData.documents).forEach((key) => {
      if (formData.documents[key]) {
        formDataToSave.append(key, formData.documents[key]);
      }
    });

    try {
      const response = await apiClient.post("/draftProjects", formDataToSave, {
        headers: {
          Authorization: token, 
        },
      });

      console.log("Draft saved successfully", response.data);

      alert("Draft saved successfully!");
      
    } catch (error) {
      console.error("Error saving draft", error);
      alert("Failed to save draft. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); 

    const formDataToSend = new FormData();

    // Append all text fields
    Object.keys(formData).forEach((key) => {
      if (key !== "documents") {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append file fields
    Object.keys(formData.documents).forEach((key) => {
      if (formData.documents[key]) {
        formDataToSend.append(key, formData.documents[key]);
      }
    });

    try {
      const response = await apiClient.post("/grantProjects", formDataToSend, {
        headers: {
          Authorization: token,
        },
      });

      console.log("Form submitted successfully", response);
      alert("Project submitted successfully!");
    } catch (error) {

      console.error("Error submitting form:", error);
      alert("Failed to submit project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-auto bg-[#F7FAFC] flex justify-center items-center py-10">
      <form className="bg-white w-4/5 max-w-5xl p-8 rounded-lg shadow-lg flex" onSubmit={handleSubmit}>
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="flex flex-col space-y-4">
              <Label className="text-sm font-semibold">Municipality Name (Local Level)</Label>
              <Input
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                placeholder="Enter Municipality Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <Label className="text-sm font-semibold">Phone</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <Label className="text-sm font-semibold">Name of the Project</Label>
              <Input
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
                placeholder="Enter Project Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <Label className="text-sm font-semibold">Total Cost of the Project</Label>
              <Input
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter Total Cost"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <Label className="text-sm font-semibold">Project Duration (Time to Complete)</Label>
              <Input
                name="projectDuration"
                value={formData.projectDuration}
                onChange={handleChange}
                placeholder="Enter Time Taken"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <Label className="text-sm font-semibold">Potential Population Benefits</Label>
              <Input
                name="populationBenefits"
                value={formData.populationBenefits}
                onChange={handleChange}
                placeholder="Enter Population Benefits"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <Label className="text-sm font-semibold">Project Status</Label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="draft"
                    name="projectStatus"
                    value="draft"
                    checked={formData.projectStatus === "draft"}
                    onChange={handleChange}
                  />
                  <Label htmlFor="draft" className="ml-2 text-sm">Draft</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ongoing"
                    name="projectStatus"
                    value="ongoing"
                    checked={formData.projectStatus === "ongoing"}
                    onChange={handleChange}
                  />
                  <Label htmlFor="ongoing" className="ml-2 text-sm">Ongoing</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="completed"
                    name="projectStatus"
                    value="completed"
                    checked={formData.projectStatus === "completed"}
                    onChange={handleChange}
                  />
                  <Label htmlFor="completed" className="ml-2 text-sm">Completed</Label>
                </div>
              </div>

              {/* Document Inputs */}
              <h2 className="text-2xl font-semibold text-[#1D4ED8] mt-10">Required Documents</h2>
              {["document1", "document2", "document3", "document4", "document5"].map((document, index) => (
                <div key={index} className="flex flex-col space-y-2 mt-4">
                  <Label className="text-sm font-semibold">{`Document ${index + 1}`}</Label>
                  <div className="flex items-center">
                    <Input
                      type="file"
                      name={document}
                      id={document}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor={document}
                      className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Upload Document
                    </Label>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex flex-col space-y-4">
              <Label className="text-sm font-semibold">Address</Label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Address"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <Label className="text-sm font-semibold">Email</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <Label className="text-sm font-semibold">Cost in Words</Label>
              <Input
                name="costInWords"
                value={formData.costInWords}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />

              <div className="flex justify-end mt-6 space-x-4">
                <Button
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="w-[200px] py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
                >
                  Save Draft
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-[200px] py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  {isSubmitting ? "Submitting..." : "Submit Project"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;
