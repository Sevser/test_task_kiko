import React from 'react';
import styles from './MapLeftPanelFilters.module.css';
import typesEnum from '../../../enums/gPlaces/typesEnum';
import {useDispatch, useSelector} from 'react-redux';
import {nearbySearch, selectPlaceType, setPlaceType} from '../Places/placesSlice';
import {useQuery} from '../../../utills/useQuery';
import {useNavigate} from 'react-router-dom';
import qs from 'querystring';
import {createNavigation} from '../../../utills/createNavigation';

export function MapLeftPanelFilters() {
  const query = useQuery();
  let navigate = useNavigate();
  const typesArray = Object.keys(typesEnum).map(key => ({ value: key, label: typesEnum[key] }));
  const dispatch = useDispatch();
  const updateSelectedValue = (newVal) => {
    dispatch(setPlaceType(newVal.target.value));
    dispatch(nearbySearch());
    navigate({
      search: createNavigation({
        type: newVal.target.value,
      }),
    });
  };
  const placeType = useSelector(selectPlaceType);
  if (query.has('type')) {
    dispatch(setPlaceType(query.get('type')));
  }

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
