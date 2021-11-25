import React, {useEffect, useState} from 'react'
import {
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';
import qs from 'querystring';
import { useNavigate } from 'react-router-dom';
import env from "react-dotenv";
import {useDispatch, useSelector} from 'react-redux';
import {nearbySearch, placesProvider, setPlacesProvider} from './Places/placesSlice';
import {MapLeftPanel} from './MapLeftPanel/MapLeftPanel';
import {MapViewPlaces} from './MapViewPlaces';

const containerStyle = {
  width: '100%',
  height: '100%'
};

export function MapView({ lat, lng }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  const dispatch = useDispatch();
  const [mapRef, setMapRef] = useState(null);
  let navigate = useNavigate();
  let center = { lat, lng };
  let ref;
  let timeout = null;

  const setLocationToUrl = () => {
    const query = { lat: center.lat.toPrecision(8), lng: center.lng.toPrecision(8) };
    const searchString = qs.stringify(query);
    if (lat !== center.lat || lng !== center.lng) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        navigate({
          search: searchString,
        });
        dispatch(nearbySearch({
          location: center,
          radius: '1500',
          type: ['restaurant']
        }))
      }, 500);
    }
  };

  const updateLocation = () => {
    if (mapRef) {
      center = mapRef.getCenter().toJSON();
      setLocationToUrl();
    }
  };

  const updateMapReference = ref => {
    setMapRef(ref);
    dispatch(setPlacesProvider(new window.google.maps.places.PlacesService(ref)));
  }

  return (isLoaded ?
      <GoogleMap
        onLoad={map => updateMapReference(map)}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onCenterChanged={updateLocation}
      >
        <MapLeftPanel />
        <MapViewPlaces />
      </GoogleMap> :
      ''
  )
}

export default React.memo(MapView);
