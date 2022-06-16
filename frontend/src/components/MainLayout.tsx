import { Layout, Menu } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={["home"]}
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
