import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateQuestion } from "@/hooks/use-create-question";

const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, "Question is required")
    .min(10, "Question must be at least 10 characters")
    .max(500, "Question must be less than 500 characters"),
});

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;

interface QuestionFormProps {
  roomId: string;
}

export function QuestionForm({ roomId }: QuestionFormProps) {
  const { mutateAsync: createQuestion } = useCreateQuestion(roomId);

  const createQuestionForm = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: "",
    },
  });

  async function handleCreateQuestion(data: CreateQuestionFormData) {
    console.log(data, roomId);
    await createQuestion(data);
    createQuestionForm.reset();
  }

  const { isSubmitting } = createQuestionForm.formState;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask a Question</CardTitle>
        <CardDescription>
          Type your question below to receive an AI-generated answer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createQuestionForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createQuestionForm.handleSubmit(handleCreateQuestion)}
          >
            <FormField
              control={createQuestionForm.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Question</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px]"
                      disabled={isSubmitting}
                      placeholder="What would you like to know?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send question"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
