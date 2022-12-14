import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import styles from './Menu.module.css';
import {Div, Slider} from '@vkontakte/vkui';
import {Dropdown} from '@vkontakte/vkui/unstable';

interface Props {
  setCursorSize: Dispatch<SetStateAction<number>>
}

const MenuFromFile = ({setCursorSize}: Props) => {
  const [range, setRange] = useState(8);

  useEffect(() => {
    setCursorSize(range);
  }, [range]);

  return (<div className={styles.menu}>
    <Dropdown
      action={'hover'}
      placement="bottom"
      content={<Div>{'Размер кисти'}</Div>}
    >
      <Slider
        className={styles.sliderCustom}
        step={1}
        min={8}
        max={30}
        value={range}
        onChange={setRange}
      />
    </Dropdown>
  </div>);
};

export default MenuFromFile;
