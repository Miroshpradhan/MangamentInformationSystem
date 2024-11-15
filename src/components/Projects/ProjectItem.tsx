import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";  // For making API requests

interface ProjectItemProps {
  id: number;
  name: string;
  description: string;
  status: string;
  onStatusChange: (newStatus: string) => void;  // Callback to refresh status after approval/disapproval
  canEdit: boolean;  // Prop to determine if the project can be edited
  isBackendUp: boolean; // To simulate backend response if the server is down
}

const ProjectItem = ({ id, name, description, status, onStatusChange, canEdit, isBackendUp }: ProjectItemProps) => {
  const [loading, setLoading] = useState(false);

  // Handle approval
  const handleApprove = async () => {
    setLoading(true);
    if (isBackendUp) {
      try {
        await axios.put(`/projects/${id}/approve`);
        onStatusChange('approved');
      } catch (error) {
        console.error("Error approving project:", error);
      }
    } else {
      // Simulate approval if backend is down
      setTimeout(() => {
        onStatusChange('approved');
        setLoading(false);
      }, 1000);
    }
    setLoading(false);
  };

  // Handle disapproval
  const handleDisapprove = async () => {
    setLoading(true);
    if (isBackendUp) {
      try {
        await axios.put(`/projects/${id}/disapprove`);
        onStatusChange('disapproved');
      } catch (error) {
        console.error("Error disapproving project:", error);
      }
    } else {
      // Simulate disapproval if backend is down
      setTimeout(() => {
        onStatusChange('disapproved');
        setLoading(false);
      }, 1000);
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex justify-between">
        {status === 'pending' && canEdit ? (
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
        ) : null}

        {status !== 'pending' ? (
          <span>{`Project is ${status}`}</span>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default ProjectItem;
