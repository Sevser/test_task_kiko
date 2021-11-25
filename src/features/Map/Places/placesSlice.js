import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {placeProvider} from './placeProvider';

const initialState = {
  nearbyPlaces: [],
  nearbyPlacesStatus: 'idle',
  currentPlace: null,
  placeType: 'accounting',
  location: null,
  radius: '150000',
};

export const nearbySearch = createAsyncThunk(
  'places/nearbySearch',
  (params, { getState }) => new Promise((resolve, reject) => {
    try {
      const type = getState().places.placeType;
      const location = getState().places.location;
      const radius = getState().places.radius;
      placeProvider.nearbySearch({
        location,
        radius,
        type: [type],
        fields: ['address_component', 'adr_address', 'type', 'url', 'website']
      }, (resp) => resolve(resp.map(res => ({
        geometry: {
          location: {
            lat: res.geometry.location.lat(),
            lng: res.geometry.location.lng(),
          },
        },
        place_id: res.place_id,
        name: res.name,
        photos: res.photos && res.photos.map(photo => ({ url: photo.getUrl() })) || [],
        business_status: res.business_status,
        vicinity: res.vicinity,
      }))));
    } catch (e) {
      reject(e);
    }
  })
);

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setCurrentPlace(state, action) {
      state.currentPlace = action.payload;
    },
    setPlaceType(state, action) {
      state.placeType = action.payload;
    },
    setLocation(state, action) {
      state.location = {
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    },
    setRadius(state, action) {
      state.radius = action.payload;
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
      });
  },
});

export const {
  setCurrentPlace,
  setPlaceType,
  setLocation,
  setRadius,
} = placesSlice.actions;

export const selectNearbyPlaces = (state) => state.places.nearbyPlaces;
export const selectCurrentPlace = (state) => state.places.currentPlace;
export const selectPlaceType = (state) => state.places.placeType;

export default placesSlice.reducer;
