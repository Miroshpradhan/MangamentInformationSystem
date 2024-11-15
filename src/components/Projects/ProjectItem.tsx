import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from '@/components/ui/button';
import { FilePenLine } from 'lucide-react';

interface ProjectItem{
    name:string;
    description:string;
}

export default function ProjectItem({name,description}:ProjectItem) {
  return (
<Card>
  <CardHeader>
    <div className="flex justify-between">
    <CardTitle>{name}</CardTitle>
    <FilePenLine className="text-green-500 cursor-pointer"/>
    </div>
 </CardHeader>
  <CardContent>
   {description}
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button className="bg-green-500 hover:bg-green-900">
        APPROVE
    </Button>
    <Button className="bg-red-500 hover:bg-red-900">
        DISAPPROVE
    </Button>
  </CardFooter>
</Card>
  )
}

