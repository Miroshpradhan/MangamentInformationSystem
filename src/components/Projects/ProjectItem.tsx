import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from '@/components/ui/button';

interface ProjectItem{
    name:string;
    description:string;
}

export default function ProjectItem({name,description}:ProjectItem) {
  return (
<Card>
  <CardHeader>
    <CardTitle>{name}</CardTitle>
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

