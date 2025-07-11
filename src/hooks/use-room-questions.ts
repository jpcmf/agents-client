import { useQuery } from "@tanstack/react-query";
import type { GetRoomQuestionsResponse } from "@/http/types/get-room-question-response";

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ["get-room-questions", roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch room questions");
      }
      const result: GetRoomQuestionsResponse = await response.json();
      return result;
    },
  });
}
