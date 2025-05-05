import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import AddLoan from "./pages/AddLoan";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import HomeAdmin from "./pages/HomeAdmin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-loan" element={<AddLoan />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home-admin" element={<HomeAdmin />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
