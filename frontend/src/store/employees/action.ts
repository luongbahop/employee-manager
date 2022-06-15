import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import * as TYPES from "store/employees/type";
import { deleteApi, getApi, putApi, postApi } from "../api";
import { buildUrl } from "helpers/common.helper";
import { ActionParams } from "interfaces/common.interface";
import getEnvVars from "environment";

const CONFIGS = getEnvVars();

export const fetchEmployee = createAsyncThunk(
  TYPES.GET_EMPLOYEE,
  async (params: ActionParams, { rejectWithValue }) => {
    try {
      const endpoint = `${CONFIGS.API_URL}/api/employee/${params.info.id}`;
      const response = await getApi(endpoint);
      const data = response.data;

      if (params.onSuccess) {
        params.onSuccess(data);
      }
      return data;
    } catch (err: unknown | AxiosError) {
      if (params.onError) {
        params.onError(err);
      }
      return rejectWithValue(err);
    }
  }
);

export const fetchEmployees = createAsyncThunk(
  TYPES.GET_EMPLOYEES,
  async (params: ActionParams, { rejectWithValue }) => {
    try {
      const endpoint = buildUrl(
        `${CONFIGS.API_URL}/api/employee/list`,
        params.info
      );
      const response = await getApi(endpoint);
      const data = response.data;

      if (params.onSuccess) {
        params.onSuccess(data);
      }
      return data;
    } catch (err: unknown | AxiosError) {
      if (params.onError) {
        params.onError(err);
      }
      return rejectWithValue(err);
    }
  }
);

export const createEmployee = createAsyncThunk(
  TYPES.CREATE_EMPLOYEE,
  async (params: ActionParams, { rejectWithValue }) => {
    try {
      const endpoint = `${CONFIGS.API_URL}/api/employee/create`;
      const response = await postApi(endpoint, params);
      const data = response.data;
      if (params.onSuccess) {
        params.onSuccess(data);
      }
      return data;
    } catch (err: unknown | AxiosError) {
      if (params.onError) {
        params.onError(err);
      }
      return rejectWithValue(err);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  TYPES.UPDATE_EMPLOYEE,
  async (params: ActionParams, { rejectWithValue }) => {
    try {
      const endpoint = `${CONFIGS.API_URL}/api/employee/update/${params.info.id}`;
      const response = await putApi(endpoint, params);
      const data = response.data;
      if (params.onSuccess) {
        params.onSuccess(data);
      }
      return data;
    } catch (err: unknown | AxiosError) {
      if (params.onError) {
        params.onError(err);
      }
      return rejectWithValue(err);
    }
  }
);


export const deleteEmployee = createAsyncThunk(
  TYPES.DELETE_EMPLOYEE,
  async (params: ActionParams, { rejectWithValue }) => {
    try {
      const endpoint = `${CONFIGS.API_URL}/api/employee/delete/${params.info.id}`;
      const response = await deleteApi(endpoint, params.info.id);
      const data = response.data;
      if (params.onSuccess) {
        params.onSuccess(data);
      }
      return data;
    } catch (err: unknown | AxiosError) {
      if (params.onError) {
        params.onError(err);
      }
      return rejectWithValue(err);
    }
  }
);
