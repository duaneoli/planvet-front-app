import RouteGuard from "@/components/RouteGuard";
import { Layout } from "@/components/template/layout";
import Animals from "@/pages/private/Animal";
import AnimalDetail from "@/pages/private/AnimalDetail";
import Billing from "@/pages/private/Billing";
import ContractDetail from "@/pages/private/ContractDetail";
import Contracts from "@/pages/private/Contracts";
import Profile from "@/pages/private/Profile";
import React from "react";
import { Navigate, Route } from "react-router-dom";

export function PrivateRouter() {
  return (
    <React.Fragment>
      <Route path="/" element={<RouteGuard element={<Layout />} />}>
        <Route index element={<Navigate to="/invoices" />} />

        <Route path="/invoices" element={<RouteGuard element={<Billing />} />} />
        {/* <Route path="/pets" element={<Pets />} /> */}
        {/* <Route path="/pets/:id/social" element={<PetSocial />} /> */}
        <Route path="/contracts" element={<RouteGuard element={<Contracts />} />} />
        <Route path="/contracts/:id" element={<RouteGuard element={<ContractDetail />} />} />
        <Route path="/animals" element={<RouteGuard element={<Animals />} />} />
        <Route path="/animals/:id" element={<RouteGuard element={<AnimalDetail />} />} />
        <Route path="/profile" element={<RouteGuard element={<Profile />} />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </React.Fragment>
  );
}
