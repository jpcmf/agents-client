import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "@/http/api";
import type { GetRoomsResponse } from "@/http/types/get-rooms-response";

export function useRooms() {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch(`${getApiUrl()}/rooms`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: GetRoomsResponse = await response.json();
      return result;
    },
  });
}
