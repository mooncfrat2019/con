import React, {Dispatch, Ref, SetStateAction, useEffect, useState} from 'react';
// @ts-ignore
import {SketchPicker} from 'react-color';

import styles from './Canvas.module.css';
import {Dropdown} from '@vkontakte/vkui/unstable';
import {classNames, Div} from '@vkontakte/vkui';
import Cursor from '../cursor/Cursor';
import {
  Icon16WindRain,
  Icon24AddCircleDottedOutline,
  Icon28EditOutline,
} from '@vkontakte/icons';

interface CanvasCellProps {
  selectedColor: string,
  pickerMode: boolean,
  triggerClear: boolean,
  setTriggerClear: Dispatch<SetStateAction<boolean>>,
  eraserMode: boolean,
  setEraserMode: Dispatch<SetStateAction<boolean>>,
}

interface CanvasProps {
  selectedColor: string,
  pickerMode: boolean,
  triggerClear: boolean,
  setTriggerClear: Dispatch<SetStateAction<boolean>>,
  captureRef: Ref<HTMLDivElement>,
  eraserMode: boolean,
  setEraserMode: Dispatch<SetStateAction<boolean>>,
  cursorSize: number,
  range: number,
}

export interface RGBA {
  r: number,
  g: number,
  b: number,
  a: number,
}

export interface ColorPickerVAlue {
  hex: string,
  rgb: RGBA
}

const CanvasCell = ({selectedColor, pickerMode, triggerClear, setTriggerClear, eraserMode, setEraserMode}: CanvasCellProps) => {
  const [shown, setShown] = useState(false);
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    if (triggerClear) {
      setColor('#ffffff');
      setTriggerClear(false);
    }
  }, [triggerClear]);

  const handleChange = (c: ColorPickerVAlue): void => {
    if (pickerMode) setColor(c.hex);
  };

  const style = {
    backgroundColor: color,
  };

  return (pickerMode) ? <Dropdown
    shown={shown}
    onShownChange={setShown}
    action="click"
    placement="right"
    content={
      <Div>
        <SketchPicker
          color={ color }
          onChangeComplete={ handleChange }
        />
      </Div>
    }
  >
    <div className={styles.cell} style={style} />
  </Dropdown> : <div className={styles.cell} style={style} onClick={() => setColor(selectedColor)} />;
};

const Canvas = ({
  selectedColor,
  pickerMode,
  captureRef,
  triggerClear,
  setTriggerClear,
  eraserMode,
  setEraserMode,
  cursorSize,
  range,
}: CanvasProps) => {
  const calculateSize = cursorSize + 6;

  const CursorIcon = () => {
    if (pickerMode) {
      return <Icon28EditOutline style={{color: 'var(--accent)'}} width={calculateSize} height={calculateSize}/>;
    }
    if (eraserMode) {
      return <Icon16WindRain style={{color: 'var(--accent)'}} width={calculateSize} height={calculateSize}/>;
    }
    return <Icon24AddCircleDottedOutline style={{color: selectedColor}} width={calculateSize} height={calculateSize}/>;
  };

  const getCanvasSize = (n: number) => n + range;

  return (<div className={classNames(styles.canvas, 'canvasProto')} style={{width: `${getCanvasSize(300)}px`, height: `${getCanvasSize(300)}px`}}>
    <Cursor cursorSize={cursorSize}><CursorIcon/></Cursor>
    <div id={'capture'} className={styles.inner} style={{width: `${getCanvasSize(282)}px`, height: `${getCanvasSize(282)}px`}} ref={captureRef}>
      {[...Array(range)]
          .map(() => [...Array(range)]
              .map((_, index) => <CanvasCell
                eraserMode={eraserMode}
                setEraserMode={setEraserMode}
                setTriggerClear={setTriggerClear}
                selectedColor={selectedColor}
                pickerMode={pickerMode}
                triggerClear={triggerClear}
                key={index}/>))}
    </div>
  </div>);
};
export default Canvas;
