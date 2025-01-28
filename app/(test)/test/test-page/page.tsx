// import CreateTrip from "@/components/custom/CreateTrip";
import TripDetails from "@/components/custom/TripDetails";
// import CommentsList from "@/components/custom/CommentsLists";

export default function Page() {
  return (
    <div className="flex flex-col">
      {/* <CreateTrip className="flex justify-center  mb-4" /> */}

      <div className="w-full flex justify-center">
        <div>
          <TripDetails />
        </div>
      </div>

      {/* <CommentsList /> */}
    </div>
  );
}
