// import external libs
import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import internal libs
import Employees from "pages/Employees/Employees";
import EmployeeForm from "pages/EmployeeForm/EmployeeForm";
import MainLayout from "./MainLayout";
import Error404 from "pages/Home";
import Home from "pages/Home";

export const AppRouter: React.FC = () => {
  const protectedLayout = <MainLayout />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={protectedLayout}>
          <Route index element={<Home />} />
          <Route path="/employee/list" element={<Employees />} />
          <Route path="/employee/add" element={<EmployeeForm />} />
          <Route path="/employee/edit/:employeeId" element={<EmployeeForm />} />
          <Route path="404" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
