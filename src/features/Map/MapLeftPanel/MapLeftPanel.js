import React from 'react';
import styles from './MapLeftPanel.module.css';
import {MapLeftPanelFilters} from './MapLeftPanelFilters';
import {ViewPlaceInformation} from './ViewPlaceInformation';

export function MapLeftPanel() {
  return (
    <div className={styles['map-left-panel-container']}>
      <div className={styles.header}>
        Test task for Kiko Homes
      </div>
      <MapLeftPanelFilters />
      <div className={styles['content-container']}>
        <ViewPlaceInformation />
      </div>
    </div>
  );
}
