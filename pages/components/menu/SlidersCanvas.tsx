import React, {Dispatch, SetStateAction} from 'react';
import styles from './Menu.module.css';
import {Div, Slider} from '@vkontakte/vkui';
import {Dropdown} from '@vkontakte/vkui/unstable';

interface Props {
  range: number,
  setRange: Dispatch<SetStateAction<number>>,
}

const SlidersCanvas = ({range, setRange}: Props) => {
  return (<div className={styles.menu}>
    <Dropdown
      action={'hover'}
      placement="bottom"
      content={<Div>{'Количество пикселей'}</Div>}
    >
      <Slider
        className={styles.sliderCustom}
        step={2}
        min={32}
        max={86}
        value={range}
        onChange={setRange}
      />
    </Dropdown>
  </div>);
};

export default SlidersCanvas;
