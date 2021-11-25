import React from 'react';
import styles from './MapViewPlaces.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {selectNearbyPlaces, setCurrentPlace} from './Places/placesSlice';
import {Marker, useGoogleMap} from '@react-google-maps/api';
import {createNavigation} from '../../utills/createNavigation';
import {useNavigate} from 'react-router-dom';

export function MapViewPlaces() {
  const map = useGoogleMap();
  const navigate = useNavigate();
  const places = useSelector(selectNearbyPlaces);
  const dispatch = useDispatch();

  const onClickMarker = (place) => {
    dispatch(setCurrentPlace(place));
    if (place.geometry && place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    }
  };

  return (
    <div className={styles['map-view-place-container']}>
      {places.map((place) => <Marker
        key={place.place_id}
        position={place.geometry.location}
        onClick={() => onClickMarker(place)}
      />)}
    </div>
  );
}
