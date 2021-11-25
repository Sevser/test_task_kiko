import { configureStore } from '@reduxjs/toolkit';
import placesSlice from '../features/Map/Places/placesSlice';

export const store = configureStore({
  reducer: {
    places: placesSlice,
  },
});
