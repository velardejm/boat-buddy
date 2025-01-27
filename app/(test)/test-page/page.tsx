import TripCard from "@/components/custom/TripCard";
import Map from "@/components/custom/Map";

export default function Page() {
  return (
    <div>
      {/* <TripCard /> */}
      <div className="w-full flex justify-center">
        <div className="w-1/2">
          <Map />
        </div>
      </div>
    </div>
  );
}
