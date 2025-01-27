import TripCard from '@/components/custom/TripCard';

export default function Page() {
  return (
    <div>
      {/* <TripCard /> */}
      <div className="w-full flex justify-center">
        <div className="w-1/2">
          <TripCard />
        </div>
      </div>
    </div>
  );
}
