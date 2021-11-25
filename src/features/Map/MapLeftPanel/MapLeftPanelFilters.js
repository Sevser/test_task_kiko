import React from 'react';
import styles from './MapLeftPanelFilters.module.css';
import {Autocomplete} from '@react-google-maps/api';

export function MapLeftPanelFilters() {
  let autocomplete = null;
  return (
    <div className={styles.container}>
      <select>
        <option value="grapefruit">Грейпфрут</option>
        <option value="lime">Лайм</option>
        <option selected value="coconut">Кокос</option>
        <option value="mango">Манго</option>
      </select>
    </div>
  );
}
