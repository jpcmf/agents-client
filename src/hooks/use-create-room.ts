import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiUrl } from "@/http/api";
import type { CreateRoomRequest } from "@/http/types/create-room-request";
import type { CreateRoomReponse } from "@/http/types/create-room-response";

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoomRequest) => {
      const response = await fetch(`${getApiUrl()}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const result: CreateRoomReponse = await response.json();

      return result;
    },
    onSuccess: () => {
      // Invalidate the rooms query to refresh the list of rooms
      queryClient.invalidateQueries({ queryKey: ["get-rooms"] });
      // Optionally, you can redirect the user to the newly created room
      // window.location.href = `/room/${result.roomId}`;
    },
  });
}
