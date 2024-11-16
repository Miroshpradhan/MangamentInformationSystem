import { useState, useEffect } from "react";
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
  const handleSave = async (data) => {
    const projectData = {
      project_name: data.projectNameEnglish,
      project_name_nepali: data.projectNameNepali,
      project_status: "pending",
      ward_id: data.ward,
      project_budget_code: data.projectBudgetCode,
      status: "Draft",
    };
  
    try {
      const response = await apiClient.post("/draftProjects", projectData, {
        headers: { Authorization: token },
      });
  
      console.log("Project saved as draft:", response.data);
      toast.success(`Project "${data.projectNameEnglish}" saved as Draft!`);
    } catch (error) {
      console.error("Error saving to backend:", error);
      toast.error("Failed to save draft.");
    }
    setIsFormOpen(false); // Close the form
  };
  

  // Form submission handler
  const handleSubmit = async (values: { totalCost: string; costInWords: string; projectStatus: string; isApproved: boolean }) => {
    setIsSubmitting(true);
    try {
      // Call the API to submit the form data
      await apiClient.post('/grantProjects', {
        totalCost: values.totalCost,
        costInWords: costInWords,
        projectStatus: values.projectStatus,
        isApproved: values.isApproved,
      });
      alert("Project submitted successfully.");
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Failed to submit project.");
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
            
      <div className="bg-white w-4/5 max-w-5xl p-8 rounded-lg shadow-lg flex">
     
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
    <Label className="text-sm font-semibold">Document 2: Project Budget</Label>
    <div className="flex items-center">
      <Input
        type="file"
        name="document2"
        className="hidden"
        id="document2"
        aria-label="Upload Project Budget"
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
    <Label className="text-sm font-semibold">Document 3: Timeline</Label>
    <div className="flex items-center">
      <Input
        type="file"
        name="document3"
        className="hidden"
        id="document3"
        aria-label="Upload Project Timeline"
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
    {/* <div className="w-full h-[100vh] bg-blue-500 flex justify-center items-center">
      <div className="bg-white w-3/4 h-[90vh] grid grid-cols-6 md:grid-cols-12 grid-rows-6 gap-2 p-4 rounded shadow-lg">
      <div className="flex flex-col items-start col-span-6">
      <Label className="mb-2 text-light capitalize">Project Name</Label>
      <Input name="username" placeholder="Enter username" className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div className="flex flex-col items-start col-span-6">
      <Label className="mb-2 text-light capitalize">Project Type</Label>
      <Input name="username" placeholder="Enter Type" className="w-full p-2 border border-gray-300 rounded" required />
      </div>

      <div className="flex flex-col items-start col-span-6">
      <Label className="mb-2 text-light capitalize">Project Deadline</Label>
      <Input name="username" placeholder="Enter project deadline" className="w-full p-2 border border-gray-300 rounded" type="date" required />
      </div>

      <div className="flex flex-col items-start col-span-6">
      <Label className="mb-2 text-light capitalize">Project Status</Label>
      <Input name="status" placeholder="Enter project status" className="w-full p-2 border border-gray-300 rounded" required />
      </div>

      <div className="flex flex-col items-start col-span-6 md:col-span-full row-span-3">
      <Label className="mb-2 text-light capitalize">Project Details</Label>
      <Textarea name="username" placeholder="Enter project details" className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div className="flex flex-col items-start col-span-3 md:col-span-6 ">
        <Button className="button bg-green-500 hover:bg-green-800 md:px-8">
SAVE
        </Button>
      </div>
      <div className="flex flex-col items-end col-span-3 md:col-span-6">
        <Button className="button bg-blue-500 hover:bg-blue-900 md:px-8">
SUBMIT
        </Button>
      </div>
      </div> */}
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
      </div>
    </div>
  );
};

export default AddProjectForm;
