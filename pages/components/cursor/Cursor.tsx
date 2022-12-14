import React, {useEffect, useState} from 'react';

import styles from './Cursor.module.css';
import {classNames} from '@vkontakte/vkui';

interface CursorProps {
  children: React.ReactElement,
  cursorSize: number,
}

type Cursor = React.FC<CursorProps>

interface MousePosition {
  x: number,
  y: number
}

type UseMousePosition = () => MousePosition;

const Cursor: Cursor = ({children, cursorSize}) => {
  const useMousePosition: UseMousePosition = () => {
    const [mousePosition, setMousePosition] = useState<MousePosition>({x: 0, y: 0});

    useEffect(() => {
      const mouseMoveHandler = (event: MouseEvent) => {
        const {clientX, clientY} = event;
        setMousePosition({x: clientX, y: clientY});
      };
      document.addEventListener('mousemove', mouseMoveHandler);

      return () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
      };
    }, []);

    return mousePosition;
  };
  const mousePosition = useMousePosition();


  return (
    <div className={classNames(styles.cursor, 'cursorProto')}
      style={{left: mousePosition.x + 'px', top: mousePosition.y + 'px'}}
    >
      {children}
    </div>
  );
};

export default Cursor;

