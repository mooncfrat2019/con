import React from 'react';

import {useMousePosition} from '../../service/hooks';

import styles from './Cursor.module.css';
import {classNames} from '@vkontakte/vkui';

interface CursorProps {
    icon: React.ReactElement,
}

type Cursor = React.FC<CursorProps>

const Cursor: Cursor = ({icon}) => {
  // 1.
  const {x, y} = useMousePosition();
  return (
    <>
      <div className={classNames(styles.cursor, 'cursorProto')}
        style={{left: `${x}px`, top: `${y}px`}}
      >
        {icon}
      </div>
    </>
  );
};

export default Cursor;

