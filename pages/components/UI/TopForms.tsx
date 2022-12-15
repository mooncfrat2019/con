import React from 'react';
import styles from './UI.module.css';

interface TopForms {
    currentCanvas?: number,
}

const TopForms = ({currentCanvas}: TopForms) => {
  return (<div className={styles.topForms}>
    {`${currentCanvas}/20`}
  </div>);
};

export default TopForms;
