import React, {useEffect, useState} from 'react'
import {
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';
import qs from 'querystring';
import { useNavigate } from 'react-router-dom';
import env from "react-dotenv";
import {useDispatch} from 'react-redux';
import {nearbySearch, setLocation, setRadius} from './Places/placesSlice';
import {MapLeftPanel} from './MapLeftPanel/MapLeftPanel';
import {MapViewPlaces} from './MapViewPlaces';
import {useQuery} from '../../utills/useQuery';
import {createNavigation} from '../../utills/createNavigation';
import {placeProvider} from './Places/placeProvider';

const containerStyle = {
  width: '100%',
  height: '100%'
};

export function MapView({ lat, lng }) {
  const query = useQuery();
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'geometry'],
  });
  const dispatch = useDispatch();
  const [mapRef, setMapRef] = useState(null);
  let navigate = useNavigate();
  let center = { lat, lng };
  let timeout = null;
  let initialDataRequested = false;

  const calcRadius = () => {
    const center = mapRef.getCenter();
    const bounds = mapRef.getBounds();
    if (bounds && center) {
      const ne = bounds.getNorthEast();
      return window.google.maps.geometry.spherical.computeDistanceBetween(center, ne);
    }
    return 1500;
  };

  const fireLoadingObjects = () => {
    dispatch(setLocation({
      lat: mapRef.getCenter().lat(),
      lng: mapRef.getCenter().lng(),
    }));
    dispatch(setRadius(calcRadius()));
    dispatch(nearbySearch());
  };

  const setLocationToUrl = () => {
    if (lat !== center.lat || lng !== center.lng) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        navigate({
          search: createNavigation({
            lat: center.lat.toPrecision(8),
            lng: center.lng.toPrecision(8),
          }),
        });
        dispatch(setLocation(center));
        dispatch(setRadius(calcRadius()));
        dispatch(nearbySearch());
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
    placeProvider.injectProvider(new window.google.maps.places.PlacesService(ref));
  }

  return (isLoaded ?
      <GoogleMap
        onLoad={map => updateMapReference(map)}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onCenterChanged={updateLocation}
        onTilesLoaded={fireLoadingObjects}
      >
        <MapLeftPanel />
        <MapViewPlaces />
      </GoogleMap> :
      loadError ? <div>{loadError}</div> : ''
  )
}

export default React.memo(MapView);
