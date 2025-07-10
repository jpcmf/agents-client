import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateRoom } from "./pages/create-room";
import { RoomDetails } from "./pages/room";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateRoom />} />
          <Route path="/room" element={<Navigate to="/" replace />} />
          <Route path="/room/:id" element={<RoomDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
