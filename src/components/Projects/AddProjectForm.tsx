import { useState, useEffect } from "react";
import { Label, Input, Button } from '@/components/ui';

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

  const handleSave = () => {
    console.log("Project saved as draft");
   
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      console.log("Project submitted");
     
    } else {
      alert("Please fill in all required fields.");
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
