import React from 'react';
import styles from './UI.module.css';

interface TopForms {
    currentCanvas?: number,
}

// eslint-disable-next-line no-unused-vars
export const TopForms = ({currentCanvas}: TopForms) => {
  return (<div className={styles.topForms}>
    {`${currentCanvas}/20`}
  </div>);
};
