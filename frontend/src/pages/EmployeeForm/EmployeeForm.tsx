import { Button, Form, Input, InputNumber, Layout, PageHeader, Space, Tag } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Table, { ColumnsType } from "antd/lib/table";
import React from "react";
import "./EmployeeForm.scss";

export default function EmployeeForm() {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <section className="employee-form-page">
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="Employee Manager"
          extra={[
            <Button key="1" type="primary">
              Add new employee
            </Button>,
          ]}
        />
      </div>
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={["user", "website"]} label="Website">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "introduction"]} label="Introduction">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}
