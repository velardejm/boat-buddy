import { getTripDetails, getUsername } from '@/lib/data';
import { notFound } from 'next/navigation';
import CommentsSection from '@/components/custom/CommentsSection';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import JoinTripButton from '@/components/custom/JoinTripButton';
import BackoutButton from '@/components/custom/BackoutButton';
import { Separator } from '@/components/ui/separator';
import { checkSession } from '@/lib/session';

type TripDetailsProps = {
  params: { tripid: string };
};

const TripDetails = async ({ params }: TripDetailsProps) => {
  const { tripid } = await params;
  // Fetch trip data using the function from 'data.ts'
  const trip = await getTripDetails(tripid);
  const passengers: string[] = trip?.passengers_names ? trip.passengers_names : [];
  // console.log(trip.passengers_names);

  if (!trip) {
    notFound(); // Trigger a 404 if the trip is not found
  }

  const session = await checkSession();
  const { message: username } = await getUsername(session.payload?.userId as string);
  // console.log(typeof passengers);
  const isAlreadyJoined = passengers.includes(username);

  return (
    <div className='max-w-3xl container mx-auto px-4 py-8 space-y-8'>
      <Card className='shadow-lg'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Trip Details: {trip.trip_name}</CardTitle>
        </CardHeader>
        <CardContent className='flex justify-between'>
          <div className='space-y-2'>
            <p>
              <strong>Location:</strong> {trip.trip_location}
            </p>
            <p>
              <strong>Date:</strong> {trip.trip_date.toISOString().split('T')[0]}
            </p>
            <p>
              <strong>Passengers:</strong> {trip.no_of_passengers}
            </p>
          </div>
          {/* <Button>Join Trip</Button> */}
          <div>
            <JoinTripButton
              tripId={(await params).tripid}
              className='mb-2'
              disabled={isAlreadyJoined}
            />
            <BackoutButton className={`${isAlreadyJoined ? '' : 'hidden'}`} />
          </div>
        </CardContent>
      </Card>
      {/* Include the comments section */}
      <Separator className='my-4' />
      <div>
        <h3 className='text-lg font-semibold'>Passenger List:</h3>
        {passengers && trip.passengers_names.length > 0 ? (
          <ul className='mt-2'>
            {trip.passengers_names.map((passenger: string, index: number) => (
              <li key={index} className='py-1'>
                {passenger}
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500'>No passengers yet.</p>
        )}
      </div>
      <CommentsSection />
    </div>
  );
};

export default TripDetails;
