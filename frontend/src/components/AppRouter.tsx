// import external libs
import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import internal libs
import Employees from "pages/Employees/Employees";
import EmployeeForm from "pages/EmployeeForm/EmployeeForm";
import MainLayout from "./MainLayout";

export const AppRouter: React.FC = () => {
  const protectedLayout = <MainLayout />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={protectedLayout}>
          <Route index element={<Employees />} />
          <Route path="/employee/list" element={<Employees />} />
          <Route path="/employee/:employeeId" element={<EmployeeForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
