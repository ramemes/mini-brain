import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel";
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";



export const DocumentCard = ({document}: {document: Doc<"documents">}) => {
  return (
    <Card className="min-h-[230px] flex flex-col justify-between">
      <div>
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-evenly">
            {!document.description ? 
              <Loader2 className="animate-spin mt-8"/> 
            : 
            document.description
            }
          </div>
        </CardContent>
      </div>

      <CardFooter>
        <Button asChild variant="secondary" className="flex items-center gap-2">
          <Link href={`/documents/${document._id}`}>
            <Eye className="w-4 h-4"/> View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
};

