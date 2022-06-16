// import external libs
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  notification,
  PageHeader,
  Radio,
  Select,
  Space,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "lodash";
import { SendOutlined } from "@ant-design/icons";

// import internal libs
import { useAppDispatch } from "helpers/hooks/redux.hook";
import { fetchEmployee, updateEmployee } from "store/employees/action";
import { createEmployee } from "store/employees/action";
import { IEmployee } from "interfaces/employee.interface";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import "./EmployeeForm.scss";

const { Option } = Select;

export default function EmployeeForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const employeeState = useSelector((state: RootState) => state.employee);
  const params = useParams();

  const defaultEmployee = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: 1,
  };

  const [employee, setEmployee] = useState(defaultEmployee);

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

  const handleCreate = async (info: IEmployee) => {
    dispatch(
      createEmployee({
        info,
        onSuccess: (res) => {
          navigate(`/employee/edit/${res.data.id}`);
          notification.success({
            message: "Create employee successfully.",
          });
        },

        onError: (err) => {
          notification.error({
            message: "Create employee failed.",
            description: get(err, "response.data.message", ""),
          });
        },
      })
    );
  };

  const handleUpdate = async (info: IEmployee) => {
    dispatch(
      updateEmployee({
        info,
        onSuccess: (data) => {
          navigate(`/employee/list`);
          notification.success({
            message: "Update employee successfully.",
          });
        },

        onError: (err) => {
          notification.error({
            message: "Create employee failed.",
            description: get(err, "response.data.message", ""),
          });
        },
      })
    );
  };

  const onFinish = (values: any) => {
    if (params.employeeId) {
      handleUpdate({ ...values, id: params.employeeId });
    } else {
      handleCreate(values);
    }
    console.log(values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{ width: 70 }}
        defaultActiveFirstOption
        defaultValue="65"
        disabled
      >
        <Option value="65">+65</Option>
      </Select>
    </Form.Item>
  );

  useEffect(() => {
    if (params.employeeId) {
      dispatch(fetchEmployee({ info: { id: params.employeeId } }));
    }
  }, [params]);

  useEffect(() => {
    if (
      params.employeeId &&
      employeeState.item.result &&
      employeeState.item.result
    ) {
      setEmployee(employeeState.item.result as IEmployee);
      form.setFieldsValue(employeeState.item.result);
    }
    window.onbeforeunload = null;
  }, [employeeState.item, params]);
  return (
    <section className="employee-form-page">
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          onBack={() => navigate(`/employee/list`)}
          title="Employee Form"
        />
      </div>
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        initialValues={employee}
        form={form}
        scrollToFirstError
      >
        <Form.Item
          name="first_name"
          label="First name"
          tooltip="Your first name must be minimum 6 character and max 10 characters."
          rules={[
            {
              required: true,
              message: "Please input your first name.",
              whitespace: true,
            },
            {
              type: "string",
              min: 6,
              max: 10,
              message:
                "Your first name must be minimum 6 character and max 10 characters.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last name"
          tooltip="Your last name must be minimum 6 character and max 10 characters."
          rules={[
            {
              required: true,
              message: "Please input your last name.",
              whitespace: true,
            },
            {
              type: "string",
              min: 6,
              max: 10,
              message:
                "Your last name must be minimum 6 character and max 10 characters.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid e-mail.",
            },
            {
              required: true,
              message: "Please input your e-mail.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Gender" name="gender" rules={[]}>
          <Radio.Group
            options={[
              { label: "Male", value: 1 },
              { label: "Female", value: 0 },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space align="end">
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              size="large"
              icon={<SendOutlined />}
            >
              {params.employeeId ? "Update employee" : "Add new employee"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </section>
  );
}
