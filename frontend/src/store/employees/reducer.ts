import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEmployee,
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "store/employees/action";

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    list: {
      loading: false,
      result: {},
      error: {},
    },
    item: {
      loading: false,
      result: {},
      error: {},
    },
  },
  reducers: {},
  extraReducers: {
    [fetchEmployee.pending as any]: (state, action) => {
      state.item.loading = true;
      state.item.result = {};
      state.item.error = {};
    },
    [fetchEmployee.fulfilled as any]: (state, action) => {
      state.item.loading = false;
      state.item.result = action.payload;
      state.item.error = {};
    },
    [fetchEmployee.rejected as any]: (state, action) => {
      state.item.loading = false;
      state.item.error = action.error;
      state.item.result = {};
    },

    [createEmployee.pending as any]: (state, action) => {
      state.item.loading = true;
      state.item.result = {};
      state.item.error = {};
    },
    [createEmployee.fulfilled as any]: (state, action) => {
      state.item.loading = false;
      state.item.result = action.payload;
      state.item.error = {};
    },
    [createEmployee.rejected as any]: (state, action) => {
      state.item.loading = false;
      state.item.error = action.error;
      state.item.result = {};
    },

    [updateEmployee.pending as any]: (state, action) => {
      state.item.loading = true;
      state.item.result = {};
      state.item.error = {};
    },
    [updateEmployee.fulfilled as any]: (state, action) => {
      state.item.loading = false;
      state.item.result = action.payload;
      state.item.error = {};
    },
    [updateEmployee.rejected as any]: (state, action) => {
      state.item.loading = false;
      state.item.error = action.error;
      state.item.result = {};
    },
    
    [deleteEmployee.pending as any]: (state, action) => {
      state.item.loading = true;
      state.item.result = {};
      state.item.error = {};
    },
    [deleteEmployee.fulfilled as any]: (state, action) => {
      state.item.loading = false;
      state.item.result = action.payload;
      state.item.error = {};
    },
    [deleteEmployee.rejected as any]: (state, action) => {
      state.item.loading = false;
      state.item.error = action.error;
      state.item.result = {};
    },

    [fetchEmployees.pending as any]: (state, action) => {
      state.list.loading = true;
      state.list.result = {};
      state.list.error = {};
    },
    [fetchEmployees.fulfilled as any]: (state, action) => {
      state.list.loading = false;
      state.list.result = action.payload;
      state.list.error = {};
    },
    [fetchEmployees.rejected as any]: (state, action) => {
      state.list.loading = false;
      state.list.error = action.error;
      state.list.result = {};
    },
  },
});

export const employee = (state: any) => state.employee;

export default employeeSlice.reducer;
