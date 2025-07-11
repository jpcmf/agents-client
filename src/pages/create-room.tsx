import { RoomList } from "@/components/room-list";

export function CreateRoom() {
  return (
    <>
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="grip gap-8 grid-cols-2 items-start">
            <div />
            <RoomList />
          </div>
        </div>
      </div>
    </>
  );
}
