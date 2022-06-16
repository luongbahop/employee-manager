import { Layout, Menu } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const [activeMenu, setActiveMenu] = useState("home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("employee")) {
      setActiveMenu("employee");
    } else if (location.pathname === "/") {
      setActiveMenu("home");
    } else {
      setActiveMenu("");
    }
  }, [location]);

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeMenu]}
          items={[
            {
              key: "home",
              label: <Link to="/">Home</Link>,
            },
            {
              key: "employee",
              label: <Link to="/employee/list">Employees</Link>,
            },
          ]}
        />
      </Header>
      <Content className="app-content">
        <Outlet />
      </Content>
    </Layout>
  );
}
