import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const trips = [
  {
    tripId: "TRIP001",
    createdBy: "JohnDoe001",
    tripName: "Boat Jigging Trip 1",
    location: "Location A",
    date: "2025-02-01",
    passengers: "4",
  },
  {
    tripId: "TRIP002",
    createdBy: "AliceSmith002",
    tripName: "Boat Jigging Trip 2",
    location: "Location B",
    date: "2025-02-05",
    passengers: "3",
  },
  {
    tripId: "TRIP003",
    createdBy: "CharlieBrown003",
    tripName: "Boat Jigging Trip 3",
    location: "Location C",
    date: "2025-02-10",
    passengers: "6",
  },
  {
    tripId: "TRIP004",
    createdBy: "EveBlack004",
    tripName: "Boat Jigging Trip 4",
    location: "Location D",
    date: "2025-02-12",
    passengers: "2",
  },
  {
    tripId: "TRIP005",
    createdBy: "GraceBlue005",
    tripName: "Boat Jigging Trip 5",
    location: "Location E",
    date: "2025-02-15",
    passengers: "5",
  },
  {
    tripId: "TRIP006",
    createdBy: "HenryGreen006",
    tripName: "Boat Jigging Trip 6",
    location: "Location F",
    date: "2025-02-18",
    passengers: "6",
  },
  {
    tripId: "TRIP007",
    createdBy: "IvyWhite007",
    tripName: "Boat Jigging Trip 7",
    location: "Location G",
    date: "2025-02-20",
    passengers: "4",
  },
];

export default function TripsTable() {
  return (
    <Table>
      <TableCaption>Available Trips</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Created by:</TableHead>
          <TableHead>Trip Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Passengers</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.tripId}>
            <TableCell>{trip.createdBy}</TableCell>
            <TableCell>{trip.tripName}</TableCell>
            <TableCell>{trip.location}</TableCell>
            <TableCell>{trip.date}</TableCell>
            <TableCell>{`${trip.passengers} / 6`}</TableCell>
            <TableCell><Button variant="secondary">View details</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
  );
}
