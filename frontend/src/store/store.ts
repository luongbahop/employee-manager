import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import reducers
import employeeReducer from './employees/reducer';

const reducer = {
  employee: employeeReducer,
};
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
