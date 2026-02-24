import RouteGuard from "@/components/RouteGuard";
import { Layout } from "@/components/template/layout";
import Billing from "@/pages/private/Billing";
import React from "react";
import { Navigate, Route } from "react-router-dom";

export function PrivateRouter() {
  return (
    <React.Fragment>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/invoices" />} />

        <Route path="/invoices" element={<RouteGuard element={<Billing />} />} />
        {/* <Route path="/pets" element={<Pets />} /> */}
        {/* <Route path="/pets/:id/social" element={<PetSocial />} /> */}
        {/* <Route path="/contracts" element={<Contracts />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </React.Fragment>
  );
}
