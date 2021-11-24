import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import qs from 'querystring';
import { useNavigate } from 'react-router-dom';
import env from "react-dotenv";

const containerStyle = {
  width: '100%',
  height: '100%'
};

export function MapView({ lat, lng }) {
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
      }, 500);
    }
  };

  const updateLocation = () => {
    if (mapRef) {
      center = mapRef.getCenter().toJSON();
      setLocationToUrl();
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={env.GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        onLoad={map => setMapRef(map)}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onCenterChanged={updateLocation}
      >
        { /* Child components, such as markers, info windows, etc. */ }
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapView);
