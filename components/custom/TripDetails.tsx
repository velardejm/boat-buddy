import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar as CalendarIcon, Users as UsersIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import CommentsList from "./CommentsLists";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function TripDetails() {
  const value = new Date(); //temporary value holder
  return (
    <Card className="flex flex-col pt-4">
      <CardHeader className="w-[350px] self-center">
        <CardTitle>Trip Details</CardTitle>
        <CardDescription>Are you interested to join this trip?</CardDescription>
      </CardHeader>
      <CardContent className="w-[350px] self-center mb-8">
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" disabled={true} value={"Trip Name"} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Location</Label>
              <Input id="location" disabled={true} value={"Trip Location"} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Trip Date</Label>
              <Button
                disabled={true}
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(value, "PPP") : <span>Pick a date</span>}
              </Button>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Passengers</Label>
              <Button
                disabled={true}
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !value && "text-muted-foreground"
                )}
              >
                <UsersIcon className="mr-2 h-4 w-4" />
                {/* {value ? format(value, "PPP") : <span>Pick a date</span>}
                 */}
                <p className="grow text-center">{`1 / 6`}</p>
              </Button>
            </div>
          </div>
        </form>
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="first:mr-8">Cancel</Button>
          <Button>Join</Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-between">
        <Textarea placeholder="Write your comment here..."/>
        <CommentsList />
      </CardFooter>
    </Card>
  );
}
