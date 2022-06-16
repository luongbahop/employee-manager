import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";

const Home: React.FC = () => (
  <Result
    status="success"
    title="Welcome to Employee Manager"
    extra={[
      <Link to="/employee/list" key="employee">
        Go to employee manager
      </Link>,
    ]}
  />
);

export default Home;
