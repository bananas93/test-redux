import { Middleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./slices/trip";

const localStorageMiddleware: Middleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    localStorage?.setItem('applicationState', JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  const preState = localStorage?.getItem('applicationState');
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
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;