import { useState, useEffect, useRef } from "react";
import { Label, Input, Button } from '@/components/ui';
import apiClient from "@/config/axios";
// Function to convert number to words
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
  const [totalCost, setTotalCost] = useState<string>("");  // Using string type to manage input more effectively
  const [costInWords, setCostInWords] = useState<string>("");
  const [projectStatus, setProjectStatus] = useState<string>("draft");
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const token = localStorage.getItem('token');
  // Update costInWords when totalCost changes
  useEffect(() => {
    const numericCost = Number(totalCost);
    if (!isNaN(numericCost)) {
      setCostInWords(numberToWords(numericCost));  
    } else {
      setCostInWords("");
    }
  }, [totalCost]);
  const validateForm = () => {
    if (!totalCost || isNaN(Number(totalCost)) || !projectStatus) {
      return false; 
    }
    return true;  
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
  
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };
  
  const handleDocumentChange = (name: string, file: File | null) => {
    setFormValues((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: file,
      },
    }));
  };
  
  const handleSave = async (data) => {
    const projectData = {
      project_name: data.projectNameEnglish,
      project_name_nepali: data.projectNameNepali,
      project_status: "pending",
      ward_id: data.ward,
      project_budget_code: data.projectBudgetCode,
      status: "Draft",
      project_description: data.projectDescription,
      start_date: data.startDate,
      end_date: data.endDate,
      budget: data.budget,
      beneficiary_population: data.beneficiaryPopulation,
      project_type: data.projectType,
    };
  
    const formData = new FormData();
  
    // Append project data to formData
    for (const key in projectData) {
      formData.append(key, projectData[key]);
    }
  
    try {
      const response = await apiClient.post("/draftProjects", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Project saved as draft:", response.data);
      toast.success(`Project "${data.projectNameEnglish}" saved as Draft!`);
    } catch (error) {
      console.error("Error saving to backend:", error);
      toast.error("Failed to save draft.");
    }
  
    setIsFormOpen(false);
  };
 const document1Ref = useRef<HTMLInputElement>(null);
  const document2Ref = useRef<HTMLInputElement>(null);
  const document3Ref = useRef<HTMLInputElement>(null);
  const document4Ref = useRef<HTMLInputElement>(null);
  const document5Ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    // Get other form values
    const municipality = (document.querySelector('input[name="municipality"]') as HTMLInputElement)?.value;
    const phone = (document.querySelector('input[name="phone"]') as HTMLInputElement)?.value;
    const projectName = (document.querySelector('input[name="projectName"]') as HTMLInputElement)?.value;
    const totalCost = (document.querySelector('input[name="totalCost"]') as HTMLInputElement)?.value;
    const costInWords = (document.querySelector('input[name="costInWords"]') as HTMLInputElement)?.value;
    const duration = (document.querySelector('input[name="duration"]') as HTMLInputElement)?.value;
    const populationBenefits = (document.querySelector('input[name="populationBenefits"]') as HTMLInputElement)?.value;
    const projectStatus = (document.querySelector('input[name="status"]:checked') as HTMLInputElement)?.value;
    const isApproved = (document.querySelector('input[name="isApproved"]:checked') as HTMLInputElement)?.value;

    // Append form data (basic fields)
    formData.append("municipality", municipality);
    formData.append("phone", phone);
    formData.append("projectName", projectName);
    formData.append("totalCost", totalCost);
    formData.append("costInWords", costInWords);
    formData.append("duration", duration);
    formData.append("populationBenefits", populationBenefits);
    formData.append("projectStatus", projectStatus);
    formData.append("isApproved", isApproved);

    // Access file inputs through refs and append files to FormData
    if (document1Ref.current?.files?.[0]) {
      formData.append("document1", document1Ref.current.files[0]);
    }
    if (document2Ref.current?.files?.[0]) {
      formData.append("document2", document2Ref.current.files[0]);
    }
    if (document3Ref.current?.files?.[0]) {
      formData.append("document3", document3Ref.current.files[0]);
    }
    if (document4Ref.current?.files?.[0]) {
      formData.append("document4", document4Ref.current.files[0]);
    }
    if (document5Ref.current?.files?.[0]) {
      formData.append("document5", document5Ref.current.files[0]);
    }

    try {
      setIsSubmitting(true);
      const response = await apiClient.post("/grantProjects", formData, {
        headers: {
          Authorization: token, // Add your token here
        },
      });

      alert("Project submitted successfully.");
    } catch (error) {
      console.error("Error submitting project:", error);
      const errorMessage = error.response?.data?.message || "Failed to submit project.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const handleTotalCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
 
    if (/^\d*\.?\d*$/.test(value)) {
      setTotalCost(value);
    }
  };

  return (
   <div className="w-full h-auto bg-[#F7FAFC] flex justify-center items-center py-10">
 <form className="bg-white w-4/5 max-w-5xl p-8 rounded-lg shadow-lg flex" onSubmit={handleSubmit}>
   
    <div className="flex-1 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-4">
          <Label className="text-sm font-semibold">Municipality Name (Local Level)</Label>
          <Input
            name="municipality"
            placeholder="Enter Municipality Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <Label className="text-sm font-semibold">Phone</Label>
          <Input
            name="phone"
            placeholder="Enter Phone Number"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <Label className="text-sm font-semibold">Name of the Project</Label>
          <Input
            name="projectName"
            placeholder="Enter Project Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <Label className="text-sm font-semibold">Total Cost of the Project</Label>
          <Input
            name="totalCost"
            type="text" 
            value={totalCost}
            onChange={handleTotalCostChange}
            placeholder="Enter Total Cost"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <Label className="text-sm font-semibold">Project Duration (Time to Complete)</Label>
          <Input
            name="duration"
            placeholder="Enter Time Taken"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <Label className="text-sm font-semibold">Potential Population Benefits</Label>
          <Input
            name="populationBenefits"
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
                name="status"
                value="draft"
                checked={projectStatus === "draft"}
                onChange={() => setProjectStatus("draft")}
              />
              <Label htmlFor="draft" className="ml-2 text-sm">Draft</Label>
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
            <div className="flex items-center">
              <input
                type="radio"
                id="completed"
                name="status"
                value="completed"
                checked={projectStatus === "completed"}
                onChange={() => setProjectStatus("completed")}
              />
              <Label htmlFor="completed" className="ml-2 text-sm">Completed</Label>
            </div>
          </div>

          <div className="flex flex-col space-y-6 mt-10">
            {/* Section Header */}
            <h2 className="text-2xl font-semibold text-[#1D4ED8]">Required Documents</h2>

            {/* Document 1 */}
            <div className="flex flex-col space-y-2">
              <Label className="text-sm font-semibold">Document 1: Project Proposal</Label>
              <div className="flex items-center">
                <Input
                  type="file"
                  name="document1"
                  className="hidden"
                  id="document1"
                  aria-label="Upload Project Proposal"
                  required
                />
                <Label
                  htmlFor="document1"
                  className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Upload Document
                </Label>
              </div>
            </div>

            {/* Document 2 */}
            <div className="flex flex-col space-y-2">
              <Label className="text-sm font-semibold">Document 2: Financial Breakdown</Label>
              <div className="flex items-center">
                <Input
                  type="file"
                  name="document2"
                  className="hidden"
                  id="document2"
                  aria-label="Upload Financial Breakdown"
                  required
                />
                <Label
                  htmlFor="document2"
                  className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Upload Document
                </Label>
              </div>
            </div>

            {/* Document 3 */}
            <div className="flex flex-col space-y-2">
              <Label className="text-sm font-semibold">Document 3: Impact Assessment</Label>
              <div className="flex items-center">
                <Input
                  type="file"
                  name="document3"
                  className="hidden"
                  id="document3"
                  aria-label="Upload Impact Assessment"
                  required
                />
                <Label
                  htmlFor="document3"
                  className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Upload Document
                </Label>
              </div>
            </div>
         


  {/* Document 4 */}
  <div className="flex flex-col space-y-2">
    <Label className="text-sm font-semibold">Document 4: Legal Documents</Label>
    <div className="flex items-center">
      <Input
        type="file"
        name="document4"
        className="hidden"
        id="document4"
        aria-label="Upload Legal Documents"
        required
      />
      <Label
        htmlFor="document4"
        className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Upload Document
      </Label>
    </div>
  </div>

  {/* Document 5 */}
  <div className="flex flex-col space-y-2">
    <Label className="text-sm font-semibold">Document 5: Approval Letter</Label>
    <div className="flex items-center">
      <Input
        type="file"
        name="document5"
        className="hidden"
        id="document5"
        aria-label="Upload Approval Letter"
        required
      />
      <Label
        htmlFor="document5"
        className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Upload Document
      </Label>
    
    </div>
  </div>
</div>

            </div>

            {/* Right side */}
            <div className="flex flex-col space-y-4">
              <Label className="text-sm font-semibold">Address</Label>
              <Input
                name="address"
                placeholder="Enter Address"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <Label className="text-sm font-semibold">Email</Label>
              <Input
                name="email"
                placeholder="Enter Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

           

              <Label className="text-sm font-semibold">Cost in Words</Label>
              <Input
                name="costInWords"
                value={costInWords}
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
                  onClick={handleSubmit}
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
