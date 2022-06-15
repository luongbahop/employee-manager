// import external libs
import React, { useEffect, useState } from "react";
import { get } from "lodash";
import queryString from "query-string";
import { useSelector } from "react-redux";
import { Button, PageHeader, Space, TablePaginationConfig, Table } from "antd";

// import internal libs
import { useAppDispatch } from "helpers/hooks/redux.hook";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchEmployees } from "store/employees/action";
import { IEmployee } from "interfaces/employee.interface";
import { PAGINATION } from "constants/common.constan";

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
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Email Address",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Actions",
      key: "action",
      render: (employee: IEmployee) => (
        <Space size="middle">
          <Link to={`/employee/${employee.id}`}>Edit</Link>
          <a>Delete</a>
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

  useEffect(() => {
    const info = {
      size: 1,
      page: 1,
    };
    dispatch(fetchEmployees({ info }));
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

  console.log("employeeState", employeeState);
  console.log("table", tableData);

  return (
    <section className="employees-page">
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
