import ForgotPassword from "@/pages/public/ForgetPassword";
import Login from "@/pages/public/Login";
import SignUp from "@/pages/public/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";

function PublicRouter() {
  console.log("publicRouter");
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default PublicRouter;
