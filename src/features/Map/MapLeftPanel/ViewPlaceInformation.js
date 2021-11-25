import React from 'react';
import styles from './ViewPlaceInformation.module.css';
import {useSelector} from 'react-redux';
import {selectCurrentPlace} from '../Places/placesSlice';
import businessStatusEnum from '../../../enums/gPlaces/businessStatusEnum';

export function ViewPlaceInformation() {
  const currentPlace = useSelector(selectCurrentPlace);
  return (
    <div className={styles['view-place-information-container']}>
      {
        currentPlace && <div className={styles['field-container']}>
          <div className={styles['field-value']}>
            {currentPlace ? currentPlace.name: ''}
          </div>
        </div>
      }
      { currentPlace && currentPlace.photos ?
        <div className={styles['field-container']}>
          <div className={styles['field-label']}>
            Photo's
          </div>
          <div className={styles.row}>
            {currentPlace.photos.map((photo, index) =>
              <img
                className={styles.image}
                key={index}
                alt="place"
                src={photo.getUrl()}/>)}
          </div>
        </div>
        : ''}
      {
        currentPlace && <div className={styles['field-container']}>
          <div className={styles['field-label']}>
            Status
          </div>
          <div className={styles['field-value']}>
            {currentPlace ? businessStatusEnum[currentPlace.business_status] : ''}
          </div>
        </div>
      }
      {
        currentPlace && <div className={styles['field-container']}>
          <div className={styles['field-label']}>
            Vicinity
          </div>
          <div className={styles['field-value']}>
            {currentPlace ? currentPlace.vicinity: ''}
          </div>
        </div>
      }
      {
        !currentPlace && <div>Click on pin on the map to see details</div>
      }
    </div>
  );
}
