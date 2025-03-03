import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/router";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function Home() {
  const [trips, setTrips] = useState([]);
  const [tripDetails, setTripDetails] = useState({ name: "", date: "", location: "", maxPassengers: "" });
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [comment, setComment] = useState("");

  const createTrip = () => {
    setTrips([...trips, { ...tripDetails, id: Date.now(), passengers: [], comments: [] }]);
    setTripDetails({ name: "", date: "", location: "", maxPassengers: "" });
  };

  const joinTrip = (tripId) => {
    setTrips(
      trips.map((trip) =>
        trip.id === tripId && trip.passengers.length < trip.maxPassengers
          ? { ...trip, passengers: [...trip.passengers, "User"] }
          : trip
      )
    );
  };

  const addComment = (tripId) => {
    setTrips(
      trips.map((trip) =>
        trip.id === tripId ? { ...trip, comments: [...trip.comments, comment] } : trip
      )
    );
    setComment("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Boat Buddy</h1>
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Create a Trip</h2>
          <Input
            placeholder="Trip Name"
            value={tripDetails.name}
            onChange={(e) => setTripDetails({ ...tripDetails, name: e.target.value })}
            className="mb-2"
          />
          <Input
            type="date"
            value={tripDetails.date}
            onChange={(e) => setTripDetails({ ...tripDetails, date: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="Location"
            value={tripDetails.location}
            onChange={(e) => setTripDetails({ ...tripDetails, location: e.target.value })}
            className="mb-2"
          />
          <Input
            type="number"
            placeholder="Max Passengers"
            value={tripDetails.maxPassengers}
            onChange={(e) => setTripDetails({ ...tripDetails, maxPassengers: e.target.value })}
            className="mb-2"
          />
          <Button onClick={createTrip}>Create Trip</Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-2">Available Trips</h2>
      {trips.map((trip) => (
        <Card key={trip.id} className="mb-2">
          <CardContent className="p-4">
            <h3 className="font-semibold">{trip.name}</h3>
            <p>Date: {trip.date}</p>
            <p>Location: {trip.location}</p>
            <p>Passengers: {trip.passengers.length} / {trip.maxPassengers}</p>
            <Button onClick={() => joinTrip(trip.id)} disabled={trip.passengers.length >= trip.maxPassengers} className="mr-2">
              Join Trip
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>View Comments</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Trip Discussion</DialogTitle>
                <div className="p-2">
                  {trip.comments.map((comment, index) => (
                    <p key={index} className="mb-1">{comment}</p>
                  ))}
                  <Input
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-2"
                  />
                  <Button onClick={() => addComment(trip.id)} className="mt-2">Submit</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
