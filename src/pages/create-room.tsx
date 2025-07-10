import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsResponse = {
  id: string;
  name: string;
}[];

export function CreateRoom() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: GetRoomsResponse = await response.json();
      return result;
    },
  });
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching rooms</p>}
      {data && (
        <ul>
          {data.map((room) => (
            <li key={room.id}>
              <Link to={`/room/${room.id}`}>{room.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
