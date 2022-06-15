import { Layout, Menu } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Layout className="app-layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={[
            {
              key: "home",
              label: `Employee Manager`,
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
