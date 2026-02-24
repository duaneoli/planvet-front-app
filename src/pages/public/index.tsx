import { Auth } from "@/pages/public/auth";
import ForgotPassword from "@/pages/public/ForgetPassword";
import Login from "@/pages/public/Login";
import SignUp from "@/pages/public/SignUp";
import { Route } from "react-router-dom";

function PublicRouter() {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth" element={<Auth />} />
    </>
  );
}

export default PublicRouter;
