import React from 'react';
import styles from './MapComponent.module.css';
import MapView from './MapView';
import {useLocation} from 'react-router-dom';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function MapComponent() {
  let query = useQuery();
  let lat = query.get("lat") && !isNaN(parseFloat(query.get("lat"))) ? parseFloat(query.get("lat")): 0;
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
