import { ScrollArea } from "@radix-ui/react-scroll-area"
import ProjectItem from "./ProjectItem"
function ProjectLists() {
  return (
    <div className="w-full h-[100vh] bg-blue-500 flex justify-center items-center">
    <div className="bg-white w-3/4 h-[90vh] grid grid-cols-6 md:grid-cols-12 grid-rows-12 gap-2 p-4 rounded shadow-lg">
        <div className="row-span-2 flex col-span-12 justify-center items-center">
            <span>All Projects</span>
        </div>
        <div className="row-span-6 col-span-12" >
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <ProjectItem name="project1" description="Hello , how are you ? description" />
            </ScrollArea>
        </div>
    </div>
    </div>
  
  )
}

export default ProjectLists