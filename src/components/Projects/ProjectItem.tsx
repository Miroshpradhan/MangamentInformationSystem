import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditProjectDialog } from "./EditProjectDialog";
import axios from 'axios';

interface ProjectItemProps {
  id: number;
  name: string;
  description: string;
  status: string;
  onStatusChange: (newStatus: string) => void; // Callback to refresh status after approval/disapproval
  canEdit: boolean; // Prop to determine if the project can be edited
  isBackendUp: boolean; // To simulate backend response if the server is down
}
const ProjectItem = ({
  id,
  name,
  description,
  status, // 'status' now refers to the submission state ('submitted' or 'not submitted')
  onStatusChange,
  canEdit,
  isBackendUp,
}: ProjectItemProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isBackendUp) {
        // Call the backend to submit the project (set isSubmitted to true)
        await axios.put(`/projects/${id}/submit`);
        onStatusChange("submitted");  // Update the status in the parent component
      } else {
        // Simulate submission if backend is down
        setTimeout(() => {
          onStatusChange("submitted");
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting project:", error);
      setLoading(false);
    }
  };

  const handleUnsubmit = async () => {
    setLoading(true);
    try {
      if (isBackendUp) {
        // Call the backend to unsubmit the project (set isSubmitted to false)
        await axios.put(`/projects/${id}/unsubmit`);
        onStatusChange("not submitted");  // Update the status in the parent component
      } else {
        // Simulate unsubmission if backend is down
        setTimeout(() => {
          onStatusChange("not submitted");
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error un submitting project:", error);
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex justify-between">
        {status === "not submitted" && canEdit ? (
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-900"
            disabled={loading}
          >
            SUBMIT
          </Button>
        ) : status === "submitted" && canEdit ? (
          <Button
            onClick={handleUnsubmit}
            className="bg-gray-500 hover:bg-gray-900"
            disabled={loading}
          >
            UNSUBMIT
          </Button>
        ) : (
          <span>{`Project is ${status}`}</span>
        )}
      </CardFooter>
    </Card>
  );
};


export default ProjectItem;
