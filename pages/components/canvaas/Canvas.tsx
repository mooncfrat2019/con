import React, {Ref, useState} from 'react';
// @ts-ignore
import {SketchPicker} from 'react-color';

import styles from './Canvas.module.css';
import {Dropdown} from '@vkontakte/vkui/unstable';
import {Div} from '@vkontakte/vkui';
import {ColorPickerVAlue} from '../interfaces/interfaces';

interface CanvasCellProps {
  selectedColor: string,
  pickerMode: boolean,
}

interface CanvasProps {
  selectedColor: string,
  pickerMode: boolean,
  captureRef: Ref<HTMLDivElement>,
}

const CanvasCell = ({selectedColor, pickerMode}: CanvasCellProps) => {
  const [shown, setShown] = useState(false);
  const [color, setColor] = useState('#ffffff');

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

const Canvas = ({selectedColor, pickerMode, captureRef}: CanvasProps) => {
  return (<div className={styles.canvas}>
    <div id={'capture'} className={styles.inner} ref={captureRef}>
      {[...Array(28)]
          .map(() => [...Array(28)]
              .map((_, index) => <CanvasCell
                selectedColor={selectedColor}
                pickerMode={pickerMode}
                key={index}/>))}
    </div>
  </div>);
};
export default Canvas;
