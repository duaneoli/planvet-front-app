import { Layout } from "@/components/template/layout";
import Billing from "@/pages/Billing";
import Contracts from "@/pages/Contracts";
import Dashboard from "@/pages/Dashboard";
import Pets from "@/pages/Pets";
import PetSocial from "@/pages/PetSocial";
import Profile from "@/pages/Profile";
import { Navigate, Route, Routes } from "react-router-dom";

export function PrivateRouter() {
  console.log("privateRouter");
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id/social" element={<PetSocial />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}
