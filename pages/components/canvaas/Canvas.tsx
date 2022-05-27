import React, {Dispatch, Ref, SetStateAction, useEffect, useState} from 'react';
// @ts-ignore
import {SketchPicker} from 'react-color';

import styles from './Canvas.module.css';
import {Dropdown} from '@vkontakte/vkui/unstable';
import {Div} from '@vkontakte/vkui';

interface CanvasCellProps {
  selectedColor: string,
  pickerMode: boolean,
  triggerClear: boolean,
  setTriggerClear: Dispatch<SetStateAction<boolean>>,
}

interface CanvasProps {
  selectedColor: string,
  pickerMode: boolean,
  triggerClear: boolean,
  setTriggerClear: Dispatch<SetStateAction<boolean>>,
  captureRef: Ref<HTMLDivElement>,
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

const CanvasCell = ({selectedColor, pickerMode, triggerClear, setTriggerClear}: CanvasCellProps) => {
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

const Canvas = ({selectedColor, pickerMode, captureRef, triggerClear, setTriggerClear}: CanvasProps) => {
  return (<div className={styles.canvas}>
    <div id={'capture'} className={styles.inner} ref={captureRef}>
      {[...Array(28)]
          .map(() => [...Array(28)]
              .map((_, index) => <CanvasCell
                setTriggerClear={setTriggerClear}
                selectedColor={selectedColor}
                pickerMode={pickerMode}
                triggerClear={triggerClear}
                key={index}/>))}
    </div>
  </div>);
};
export default Canvas;
