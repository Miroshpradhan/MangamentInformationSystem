import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditProjectDialog } from "./EditProjectDialog";

interface ProjectItemProps {
  id: number;
  name: string;
  description: string;
  status: string;
  onStatusChange: (newStatus: string) => void; // Callback to refresh status after approval/disapproval
  canEdit: boolean; // Prop to determine if the project can be edited
  isBackendUp: boolean; // To simulate backend response if the server is down
}

const ProjectItem = ({ id, name, description, status, onStatusChange, canEdit, isBackendUp }: ProjectItemProps) => {
  const [loading, setLoading] = useState(false);

  const handleApprove = () => {
    setLoading(true);
    if (isBackendUp) {
      // Simulate API approval logic here
      setTimeout(() => {
        onStatusChange("approved");
        setLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        onStatusChange("approved");
        setLoading(false);
      }, 1000);
    }
  };

  const handleDisapprove = () => {
    setLoading(true);
    if (isBackendUp) {
      // Simulate API disapproval logic here
      setTimeout(() => {
        onStatusChange("disapproved");
        setLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        onStatusChange("disapproved");
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{name}</CardTitle>
          {canEdit && (
            <EditProjectDialog
              projectName={name}
              projectDetails={description}
              projectDeadline=""
              projectStatus={status}
              projectType="urgent"
            />
          )}
        </div>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex justify-between">
        {status === "pending" && canEdit ? (
          <>
            <Button
              onClick={handleApprove}
              className="bg-green-500 hover:bg-green-900"
              disabled={loading}
            >
              APPROVE
            </Button>
            <Button
              onClick={handleDisapprove}
              className="bg-red-500 hover:bg-red-900"
              disabled={loading}
            >
              DISAPPROVE
            </Button>
          </>
        ) : (
          <span>{`Project is ${status}`}</span>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectItem;
