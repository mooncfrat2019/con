import React, {Dispatch, Ref, SetStateAction, useEffect, useState} from 'react';
import styles from './Menu.module.css';
import {Button, Div} from '@vkontakte/vkui';
// @ts-ignore
import {SketchPicker} from 'react-color';
import {
  Icon20PalleteOutline,
} from '@vkontakte/icons';
import {Dropdown} from '@vkontakte/vkui/unstable';

interface Props {
    selectedColor: string,
    pickerMode: boolean,
    setSelectedColor: Dispatch<SetStateAction<string>>,
    setPikerMode: Dispatch<SetStateAction<boolean>>,
    setTriggerClear: Dispatch<SetStateAction<boolean>>,
    captureRef: Ref<HTMLDivElement>,
    eraserMode: boolean,
    setEraserMode: Dispatch<SetStateAction<boolean>>,
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

const Menu = (
    {
      selectedColor,
      setSelectedColor,
    }: Props) => {
  const [shown, setShown] = useState(false);
  const [palletIconColor, setPalletIconColor] = useState(selectedColor);

  useEffect(() => {
    setPalletIconColor(`#${invertHex(selectedColor.replace('#', ''))}`);
  }, [selectedColor]);

  function invertHex(hex: string): string {
    return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
  }

  return (<div className={styles.menu}>
    <Dropdown
      shown={shown}
      onShownChange={setShown}
      action="click"
      placement="top"
      content={
        <Div>
          <SketchPicker
            color={ selectedColor }
            onChangeComplete={ (c: ColorPickerVAlue) => setSelectedColor(c.hex) }
          />
        </Div>
      }
    >
      <Button
        className={styles.menuItem}
        style={{backgroundColor: `${selectedColor}`}}
        mode={'tertiary'}>
        <Icon20PalleteOutline style={{color: palletIconColor}} width={14} height={14}/>
      </Button>
    </Dropdown>
  </div>);
};

export default Menu;
