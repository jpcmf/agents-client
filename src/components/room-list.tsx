import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight, LoaderCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/format-date";
import { useRooms } from "@/hooks/use-rooms";

export function RoomList() {
  const { data, isLoading, error } = useRooms();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recents rooms</CardTitle>
        <CardDescription>A list of recently created rooms</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm flex items-center">
            <LoaderCircle className="animate-spin mr-2" />
            Loading rooms...
          </p>
        )}
        {error && (
          <p className="text-muted-foreground text-sm flex items-center">
            <AlertCircle className="mr-2" /> Error fetching rooms!
          </p>
        )}
        {data?.map((room) => (
          <Link
            key={room.id}
            to={`/room/${room.id}`}
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/30"
          >
            <div className="flex-1 flex flex-col gap-1">
              <h3 className="font-medium">{room.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {formatDate(room.createdAt)}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {room.questionCount} questions
                </Badge>
              </div>
            </div>
            <span className="flex items-center gap-1 text-sm">
              Join <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
