import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "@/components/custom/DatePicker";

export default function TripCard() {
  return (
    // <Card className="w-[350px]">
    //   <CardHeader>
    //     <CardTitle>Organize a Fishing Trip</CardTitle>
    //     <CardDescription>Deploy your new project in one-click.</CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <form>
    //       <div className="grid w-full items-center gap-4">
    //         <div className="flex flex-col space-y-1.5">
    //           <Label htmlFor="name">Name</Label>
    //           <Input id="name" placeholder="Name of your project" />
    //         </div>
    //         <div className="flex flex-col space-y-1.5">
    //           <Label htmlFor="framework">Choose  Trip Date</Label>
    //             <DatePicker />
    //         </div>
    //       </div>
    //     </form>
    //   </CardContent>
    //   <CardFooter className="flex justify-between">
    //     <Button variant="outline">Cancel</Button>
    //     <Button>Deploy</Button>
    //   </CardFooter>
    // </Card>

    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Organize a Fishing Trip</CardTitle>
        <CardDescription>
          Set up your fishing trip and invite others to join!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="trip-name">Trip Name</Label>
              <Input id="trip-name" placeholder="Name of your fishing trip" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="trip-location">Location</Label>
              <Input
                id="trip-location"
                placeholder="Fishing trip location"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="trip-date">Choose Trip Date</Label>
              <DatePicker />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="boat-pax">Number of Passengers</Label>
              <Input
                id="boat-pax"
                placeholder="How many anglers are joining?"
                type="number"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Send Request</Button>
      </CardFooter>
    </Card>
  );
}
