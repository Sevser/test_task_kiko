import React, {useEffect} from 'react';
import styles from './MapViewPlaces.module.css';
import {useSelector} from 'react-redux';
import {selectNearbyPlaces} from './Places/placesSlice';

export function MapViewPlaces() {
  const places = useSelector(selectNearbyPlaces);

  return (
    <div>
      {JSON.stringify(places)}
    </div>
  );
}
