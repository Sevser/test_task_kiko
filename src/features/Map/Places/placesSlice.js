import {createAsyncThunk, createSlice, getDefaultMiddleware} from '@reduxjs/toolkit';

const initialState = {
  provider: null,
  nearbyPlaces: [],
  nearbyPlacesStatus: 'idle',
};

export const nearbySearch = createAsyncThunk(
  'places/nearbySearch',
  (params, { getState }) => new Promise((resolve, reject) => {
    const provider = getState().places.provider;
    provider.nearbySearch({
      ...params,
      fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
    }, resolve);
  })
);

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setPlacesProvider(state, provider) {
      state.provider = provider.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(nearbySearch.pending, (state) => {
        state.nearbyPlacesStatus = 'loading';
      })
      .addCase(nearbySearch.fulfilled, (state, action) => {
        state.nearbyPlacesStatus = 'success';
        state.nearbyPlaces = action.payload;
        console.log(state.nearbyPlaces);
      });
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  }),
});

export const {
  setPlacesProvider,
} = placesSlice.actions;

export const selectNearbyPlaces = (state) => state.places.nearbyPlaces;
export const placesProvider = (state) => state.places.provider;

export default placesSlice.reducer;
