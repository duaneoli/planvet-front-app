import Login from "@/pages/public/auth/Login";
import SignUp from "@/pages/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";

function PublicRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default PublicRouter;
