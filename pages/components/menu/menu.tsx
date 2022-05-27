import React, {Dispatch, Ref, SetStateAction, useEffect, useState} from 'react';
import styles from './Menu.module.css';
import {Button, Div} from '@vkontakte/vkui';
// @ts-ignore
import {SketchPicker} from 'react-color';
// @ts-ignore
import domtoimage from 'dom-to-image';
import {
  Icon20PalleteOutline,
  Icon20DownloadOutline,
  Icon28EditOutline,
  Icon12CancelOutline,
} from '@vkontakte/icons';
import {Dropdown} from '@vkontakte/vkui/unstable';

interface Props {
    selectedColor: string,
    pickerMode: boolean,
    setSelectedColor: Dispatch<SetStateAction<string>>,
    setPikerMode: Dispatch<SetStateAction<boolean>>,
    setTriggerClear: Dispatch<SetStateAction<boolean>>,
    captureRef: Ref<HTMLDivElement>
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
      pickerMode,
      setSelectedColor,
      setTriggerClear,
      setPikerMode,
    }: Props) => {
  const [shown, setShown] = useState(false);
  const [palletIconColor, setPalletIconColor] = useState(selectedColor);

  useEffect(() => {
    setPalletIconColor(`#${invertHex(selectedColor.replace('#', ''))}`);
  }, [selectedColor]);

  const exportAsImage = () => {
    domtoimage.toJpeg(document.getElementById('capture'), {quality: 1})
        .then(function(dataUrl: any) {
          const link = document.createElement('a');
          link.download = 'My_awesome_pixel_art.jpeg';
          link.href = dataUrl;
          link.click();
        });
  };

  const clearCanvas = (): void => {
    setTriggerClear(true);
  };

  function invertHex(hex: string): string {
    return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
  }

  return (<div className={styles.menu}>
    <Button
      className={styles.menuItem}
      appearance={(pickerMode) ? 'accent' : 'neutral'}
      mode={(pickerMode) ? 'primary' : 'secondary'}
      onClick={() => setPikerMode((prv) => !prv)}>
      <Icon28EditOutline width={14} height={14}/>
    </Button>
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
    <Button
      className={styles.menuItem}
      appearance={'accent'}
      mode={'tertiary'}
      onClick={exportAsImage}>
      <Icon20DownloadOutline width={14} height={14}/>
    </Button>
    <Button
      className={styles.menuItem}
      appearance={'neutral'}
      mode={'tertiary'}
      onClick={clearCanvas}>
      <Icon12CancelOutline className={styles.negative} width={14} height={14}/>
    </Button>
  </div>);
};

export default Menu;
