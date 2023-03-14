import { Middleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./slices/trip";

const sessionStorageMiddleware: Middleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    sessionStorage?.setItem('applicationState', JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  const preState = sessionStorage?.getItem('applicationState');
  if (preState) {
    return JSON.parse(preState);
  }
};

export const store = configureStore({
  reducer: {
    trip: tripReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sessionStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;