export type GetRoomQuestionsResponse = {
  id: string;
  question: string;
  answer?: string | null;
  createdAt: string;
  isGenerating?: boolean; // Optional field to indicate if the answer is being generated
}[];
