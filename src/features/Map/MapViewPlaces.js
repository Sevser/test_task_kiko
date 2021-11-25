import React, {useEffect} from 'react';
import styles from './MapViewPlaces.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {selectNearbyPlaces, setCurrentPlace} from './Places/placesSlice';
import {Marker} from '@react-google-maps/api';

export function MapViewPlaces() {
  const places = useSelector(selectNearbyPlaces);
  const dispatch = useDispatch();

  return (
    <div className={styles['map-view-place-container']}>
      {places.map((place) => <Marker
        position={place.geometry.location}
        onClick={() => dispatch(setCurrentPlace(place))}
      />)}
    </div>
  );
}
