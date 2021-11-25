import React from 'react';
import styles from './MapLeftPanelFilters.module.css';
import typesEnum from '../../../enums/gPlaces/typesEnum';
import {useDispatch, useSelector} from 'react-redux';
import {nearbySearch, selectPlaceType, setPlaceType} from '../Places/placesSlice';

export function MapLeftPanelFilters() {
  const typesArray = Object.keys(typesEnum).map(key => ({ value: key, label: typesEnum[key] }));
  const dispatch = useDispatch();
  const updateSelectedValue = (newVal) => {
    dispatch(setPlaceType(newVal.target.value));
    dispatch(nearbySearch());
  };
  const placeType = useSelector(selectPlaceType);

  return (
    <div className={styles.container}>
      <div className={styles['field-container']}>
        <div className={styles.label}>
          Select type of objects
        </div>
        <select
          onChange={updateSelectedValue}
          value={placeType}>
          {typesArray.map(({ value, label }) =>
            <option
              key={value}
              value={value}>{label}</option>)}
        </select>
      </div>
    </div>
  );
}
