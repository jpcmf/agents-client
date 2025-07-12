import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "@/http/types/create-question-request";
import type { CreateQuestionResponse } from "@/http/types/create-question-response";
import type { GetRoomQuestionsResponse } from "@/http/types/get-room-question-response";

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create question");
      }

      const result: CreateQuestionResponse = await response.json();

      return result;
    },
    onMutate: ({ question }) => {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
        "get-room-questions",
        roomId,
      ]);

      const questionsArray = questions ?? [];

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGenerating: true, // Indicate that the answer is being generated
      };

      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ["get-room-questions", roomId],
        [newQuestion, ...questionsArray]
      );

      return { newQuestion, questions };
    },

    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ["get-room-questions", roomId],
        (questions) => {
          if (!questions || !context?.newQuestion) {
            return questions;
          }

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGenerating: false, // Mark as no longer generating
              };
            }
            return question;
          });
        }
      );
    },

    onError: (_error, _variables, context) => {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ["get-room-questions", roomId],
          context.questions
        );
      }
    },
  });
}
