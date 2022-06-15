// import external libs
import axios, { AxiosError } from 'axios';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('error', error);

    return Promise.reject(error);
  }
);

export const getHeader = () => {
  const token = localStorage.getItem('token');

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getApi = async (url: string) => {
  const headers = await getHeader();
  return axios({
    method: 'get',
    url,
    timeout: 1000 * 60 * 5,
    headers,
  }).catch(function (error: AxiosError) {
    console.log(`API error: ${error}`);
    return Promise.reject(error);
  });
};

export const deleteApi = async (url: any, data: { id: any }) => {
  const headers = await getHeader();
  return axios({
    method: 'delete',
    url,
    data: { id: data.id },
    timeout: 1000 * 60 * 5,
    headers,
  }).catch(function (error: AxiosError) {
    console.log(`API error: ${error}`);
    return Promise.reject(error);
  });
};

export const postApi = async (url: string, data: any) => {
  const headers = await getHeader();
  return axios({
    method: 'post',
    url,
    data,
    timeout: 1000 * 60 * 5,
    headers,
  }).catch(function (error: AxiosError) {
    console.log(`API error: ${error}`);
    return Promise.reject(error);
  });
};

export const putApi = async (url: string, data: any) => {
  const headers = await getHeader();
  return axios({
    method: 'put',
    url,
    data,
    timeout: 1000 * 60 * 5,
    headers,
  }).catch(function (error: AxiosError) {
    console.log(`API error: ${error}`);
    return Promise.reject(error);
  });
};

