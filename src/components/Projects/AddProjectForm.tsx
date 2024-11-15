import {Label,Input,Textarea,Button} from '@/components/ui'

 const AddProjectForm = () => {

  return (
    <div className="w-full h-[100vh] bg-blue-500 flex justify-center items-center">
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
      </div>
    </div>
  )
}


export default AddProjectForm;