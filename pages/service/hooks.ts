import {useEffect, useState} from 'react';

interface MousePosition {
  x: null | number | string,
  y: null | number | string
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({x: null, y: null});

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
}
