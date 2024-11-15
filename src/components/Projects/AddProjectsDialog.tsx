import { Button, Input, Label, Textarea } from '@/components/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function AddProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
          <DialogDescription>
            Fill out the details of the project and save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-name" className="text-right">
              Project Name
            </Label>
            <Input
              id="project-name"
              placeholder="Enter project name"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-type" className="text-right">
              Project Type
            </Label>
            <Input
              id="project-type"
              placeholder="Enter project type"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-deadline" className="text-right">
              Project Deadline
            </Label>
            <Input
              id="project-deadline"
              type="date"
              placeholder="Enter project deadline"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-status" className="text-right">
              Project Status
            </Label>
            <Input
              id="project-status"
              placeholder="Enter project status"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="project-details" className="text-right">
              Project Details
            </Label>
            <Textarea
              id="project-details"
              placeholder="Enter project details"
              className="col-span-3"
              required
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button className="bg-green-500 hover:bg-green-800">SAVE</Button>
          <Button className="bg-blue-500 hover:bg-blue-900">SUBMIT</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
