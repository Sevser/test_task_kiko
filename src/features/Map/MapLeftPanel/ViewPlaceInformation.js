import React, {useEffect} from 'react';
import styles from './ViewPlaceInformation.module.css';
import {MapLeftPanelFilters} from './MapLeftPanelFilters';
import {useSelector} from 'react-redux';
import {selectCurrentPlace} from '../Places/placesSlice';

export function ViewPlaceInformation() {
  const currentPlace = useSelector(selectCurrentPlace);
  return (
    <div className={styles['view-place-information-container']}>
      {JSON.stringify(currentPlace)}
    </div>
  );
}
