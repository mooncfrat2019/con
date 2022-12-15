import React, {Dispatch, SetStateAction} from 'react';
import styles from './UI.module.css';
import {Icon20ChevronLeftOutline, Icon20ChevronRightOutline} from '@vkontakte/icons';
import {IconButton} from '@vkontakte/vkui';

interface Controls {
  setCurrentCanvas: Dispatch<SetStateAction<number>>,
  currentCanvas: number,
}

// eslint-disable-next-line no-unused-vars
export const Controls = ({setCurrentCanvas, currentCanvas}: Controls) => {
  return (<div className={styles.controls}>
    <IconButton disabled={currentCanvas <= 1} className={styles.control} onClick={() => setCurrentCanvas((prev: number) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    })}>
      <Icon20ChevronLeftOutline/>
    </IconButton>`
    <IconButton disabled={currentCanvas >= 20} className={styles.control} onClick={() => setCurrentCanvas((prev: number) => {
      if (prev < 20) {
        return prev + 1;
      }
      return prev;
    })}>
      <Icon20ChevronRightOutline/>
    </IconButton>
  </div>);
};
