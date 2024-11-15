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

import { FilePenLine } from 'lucide-react';

interface EditDialogProps{
    projectName:string;
    projectDeadline:string;
    projectStatus:string;
    projectType:string;
    projectDetails:string;
}
export function EditProjectDialog({ projectName, projectType, projectDeadline, projectStatus, projectDetails }:EditDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <FilePenLine className="text-green-500 cursor-pointer"/>
  
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update the details of your project and save the changes.
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
              defaultValue={projectName}
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
              defaultValue={projectType}
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
              className="col-span-3"
              defaultValue={projectDeadline}
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
              defaultValue={projectStatus}
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
              defaultValue={projectDetails}
              required
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button className="bg-green-500 hover:bg-green-800">SAVE CHANGES</Button>
          <Button className="bg-red-500 hover:bg-red-800">CANCEL</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
