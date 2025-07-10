import { useParams } from "react-router-dom";

type RoomDetailsParams = {
  id: string;
};

export function RoomDetails() {
  const params = useParams<RoomDetailsParams>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Room Details</h1>
      <p className="text-gray-700">
        This is where the room details for room ID {params.id} will be
        displayed.
      </p>
    </div>
  );
}
