import React from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";

const MainLayout = () => {
  return (
    <>
      <SiteHeader />
      <Outlet />
    </>
  );
};
export default MainLayout;
