import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAddNewTrip {
  id: string;
  name: string;
  dateStart: string;
  dateEnd: string;
}

interface TestState {
  trips: IAddNewTrip[];
}

const initialState: TestState = {
  trips: [],
};

export const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    addNewTrip(state, action: PayloadAction<IAddNewTrip>) {
      state.trips.push(action.payload);
    },
    deleteTrip(state,action: PayloadAction<any>) {
      state.trips = state.trips.filter((trip) => trip.id !== action.payload);
    },
    editTrip(state, action) {
      const { id, name, dateStart, dateEnd } = action.payload;
      const tripToEdit = state.trips.find(trip => trip.id === id);
      if (tripToEdit) {
        tripToEdit.name = name;
        tripToEdit.dateStart = dateStart;
        tripToEdit.dateEnd = dateEnd;
      }
    },
  },
});

export const { addNewTrip, deleteTrip } = tripSlice.actions;

export default tripSlice.reducer;