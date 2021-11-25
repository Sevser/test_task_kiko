import React from 'react';
import styles from './MapComponent.module.css';
import MapView from './MapView';
import {useLocation} from 'react-router-dom';
import {useQuery} from '../../utills/useQuery';



export function MapComponent() {
  let query = useQuery();
  let lat = query.get("lat") && !isNaN(parseFloat(query.get("lat"))) ? parseFloat(query.get("lat")): 51.488028;
  let lng = query.get("lng") && !isNaN(parseFloat(query.get("lng"))) ? parseFloat(query.get("lng")): 0;

  return (
    <div className={styles.container}>
      <MapView
        lat={lat}
        lng={lng}
      />
    </div>
  );
}
