import {createAsyncThunk, createSlice, getDefaultMiddleware} from '@reduxjs/toolkit';

const initialState = {
  provider: null,
  nearbyPlaces: [],
  nearbyPlacesStatus: 'idle',
  currentPlace: null,
};

export const nearbySearch = createAsyncThunk(
  'places/nearbySearch',
  (params, { getState }) => new Promise((resolve, reject) => {
    const provider = getState().places.provider;
    provider.nearbySearch({
      ...params,
      fields: ['address_component', 'adr_address', 'type', 'url', 'website']
    }, resolve);
  })
);

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setPlacesProvider(state, action) {
      state.provider = action.payload;
    },
    setCurrentPlace(state, action) {
      state.currentPlace = action.payload;
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
  setCurrentPlace,
} = placesSlice.actions;

export const selectNearbyPlaces = (state) => state.places.nearbyPlaces;
export const placesProvider = (state) => state.places.provider;
export const selectCurrentPlace = (state) => state.places.currentPlace;

export default placesSlice.reducer;
