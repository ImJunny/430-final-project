import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import AddLoan from "./pages/AddLoan";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import HomeAdmin from "./pages/HomeAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-loan" element={<AddLoan />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home-admin" element={<HomeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}
