// import external libs
import React, { useEffect, useState } from "react";
import { get } from "lodash";
import queryString from "query-string";
import { useSelector } from "react-redux";
import {
  Button,
  PageHeader,
  Space,
  TablePaginationConfig,
  Table,
  Tag,
  Popconfirm,
  notification,
} from "antd";

// import internal libs
import { useAppDispatch } from "helpers/hooks/redux.hook";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteEmployee, fetchEmployees } from "store/employees/action";
import { IEmployee } from "interfaces/employee.interface";
import { PAGINATION } from "constants/common.constant";

import { RootState } from "store/store";
import { buildUrl } from "helpers/common.helper";
import "./Employees.scss";
import { ColumnsType } from "antd/lib/table";

const initialPagination: TablePaginationConfig = {
  current: PAGINATION.DEFAULT_PAGE,
  pageSize: PAGINATION.PAGE_SIZE,
  pageSizeOptions: PAGINATION.PAGE_SIZE_OPTIONS,
  showSizeChanger: true,
  hideOnSinglePage: false,
  showTotal: (total: number) => `Total: ${total}.`,
  size: "small",
  position: ["bottomRight"],
};

export default function Employees() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const employeeState = useSelector((state: RootState) => state.employee);
  const urlQuery = queryString.parse(location.search);

  const [tableData, setTableData] = useState<{
    data: IEmployee[];
    pagination: TablePaginationConfig;
    loading: boolean;
  }>({
    data: [],
    pagination: {
      ...initialPagination,
      ...urlQuery,
      current: Number(get(urlQuery, "current", PAGINATION.DEFAULT_PAGE)),
      pageSize: Number(get(urlQuery, "pageSize", PAGINATION.PAGE_SIZE)),
    },
    loading: false,
  });

  const columns: ColumnsType<IEmployee> = [
    {
      title: "First Name",
      dataIndex: "first_name",
      ellipsis: true,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      ellipsis: true,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      ellipsis: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      ellipsis: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      ellipsis: true,
      render: (gender: number) => (
        <div>
          {gender === 1 ? (
            <Tag color="#f50">Male</Tag>
          ) : (
            <Tag color="#87d068">Female</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: (employeeId: number) => (
        <Space size="middle">
          <Link to={`/employee/edit/${employeeId}`}>Edit</Link>
          <Popconfirm
            title="Are you sure to delete this employee?"
            onConfirm={() => handleDelete(employeeId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const changeMutilUrlParams = (fields: any) => {
    let url = location.pathname;
    const params = { ...urlQuery, ...fields };
    url = buildUrl(url, params);
    navigate(url);
  };

  const changeTablePagination = (pagination: TablePaginationConfig) => {
    changeMutilUrlParams({
      pageSize: pagination.pageSize,
      current: pagination.current,
    });
    setTableData({
      ...tableData,
      pagination: {
        ...tableData.pagination,
        pageSize: pagination.pageSize,
        current: pagination.current,
      },
    });
  };

  const handleDelete = (employeeId: number) => {
    dispatch(
      deleteEmployee({
        info: { id: employeeId },
        onSuccess: (res) => {
          fetch();
          notification.success({
            message: "Delete employee successfully.",
          });
        },

        onError: (err) => {
          notification.error({
            message: "Delete employee failed.",
            description: get(err, "response.data.message", ""),
          });
        },
      })
    );
  };

  const fetch = () => {
    const info = {
      size: 1,
      page: 1,
    };
    dispatch(fetchEmployees({ info }));
  };

  useEffect(() => {
    fetch();
  }, [location]);

  useEffect(() => {
    setTableData({
      ...tableData,
      loading: get(employeeState, "list.loading", false),
      data: get(employeeState, "list.result.items", []),
      pagination: {
        ...tableData.pagination,
        total: get(employeeState, "list.result.totalItems", 0),
      },
    });
  }, [employeeState.list]);

  return (
    <section className="employees-page">
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="Employee Manager"
          extra={[
            <Button
              key="1"
              type="primary"
              shape="round"
              onClick={() => navigate(`/employee/add`)}
            >
              Add new employee
            </Button>,
          ]}
        />
      </div>
      <div className="site-layout-content">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={tableData.data}
          pagination={tableData.pagination}
          loading={tableData.loading}
          onChange={changeTablePagination}
          bordered
        />
      </div>
    </section>
  );
}
