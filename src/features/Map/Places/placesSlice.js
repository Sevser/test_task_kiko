import {createAsyncThunk, createSlice, getDefaultMiddleware} from '@reduxjs/toolkit';

const initialState = {
  provider: null,
  nearbyPlaces: [],
  nearbyPlacesStatus: 'idle',
  currentPlace: null,
  placeType: 'accounting',
  location: null,
  radius: '1500',
};

export const nearbySearch = createAsyncThunk(
  'places/nearbySearch',
  (params, { getState }) => new Promise((resolve, reject) => {
    const provider = getState().places.provider;
    const type = getState().places.placeType;
    const location = getState().places.location;
    const radius = getState().places.radius;
    provider.nearbySearch({
      location,
      radius,
      type: [type],
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
    },
    setPlaceType(state, action) {
      state.placeType = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
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
  setPlaceType,
  setLocation,
} = placesSlice.actions;

export const selectNearbyPlaces = (state) => state.places.nearbyPlaces;
export const placesProvider = (state) => state.places.provider;
export const selectCurrentPlace = (state) => state.places.currentPlace;
export const selectPlaceType = (state) => state.places.placeType;

export default placesSlice.reducer;
