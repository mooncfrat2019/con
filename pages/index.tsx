import React, {useEffect, useRef, useState} from 'react';
import Canvas from './components/canvaas/Canvas';
import styles from '../styles/Home.module.css';
// @ts-ignore
import domtoimage from 'dom-to-image';
import '@vkontakte/vkui/dist/vkui.css';
import '@vkontakte/vkui/dist/unstable.css';
import Menu from './components/menu/menu';
import bridge from '@vkontakte/vk-bridge';
import MenuFromFile from './components/menu/menuFromFile';
import {menuList} from '../data/menu';
import {FunctionListForMenu, Hooks, IconList} from '../data/interfaces';
import {
  Icon12CancelOutline,
  Icon16WindRain,
  Icon20DownloadOutline,
  Icon28EditOutline,
  Icon20DeleteOutlineAndroid,
} from '@vkontakte/icons';
import SlidersCanvas from './components/menu/SlidersCanvas';
import Controls from './components/UI/Controls';
import TopForms from './components/UI/TopForms';
import Loader from './components/loaders/Loader';

function HomePage() {
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [pickerMode, setPikerMode] = useState<boolean>(false);
  const [eraserMode, setEraserMode] = useState<boolean>(false);
  const [isSSR, setIsSSR] = useState(true);
  const [triggerClear, setTriggerClear] = useState(false);
  const [triggerFill, setTriggerFill] = useState(false);
  const captureRef = useRef(null);
  const [cursorSize] = useState(8);
  const [range, setRange] = useState(32);
  const [currentCanvas, setCurrentCanvas] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useState({});

  bridge.send('VKWebAppInit').then((r) => console.log(r));
  bridge.send('VKWebAppGetUserInfo').then((r) => {
    setUserInfo(r);
    setIsLoading(false);
  }).catch(() => {
    setIsLoading(false);
  });

  const erase = () => {
    setPikerMode(false);
    setEraserMode((prv) => !prv);
  };

  const edit = () => {
    setEraserMode(false);
    setPikerMode((prv) => !prv);
  };

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

  useEffect(() => {
    if (eraserMode) {
      setSelectedColor('#FFFFFF');
    }
  }, [eraserMode]);

  const hooks: Hooks = {
    erase: [eraserMode, setEraserMode],
    edit: [pickerMode, setPikerMode],
    undefined: [false, () => false],
  };

  const functionsList: FunctionListForMenu = {
    erase,
    edit,
    download: exportAsImage,
    clear: clearCanvas,
    fill: () => setTriggerFill(true),
  };

  const iconList: IconList = {
    erase: <Icon16WindRain width={14} height={14}/>,
    edit: <Icon28EditOutline width={14} height={14}/>,
    download: <Icon20DownloadOutline width={14} height={14}/>,
    clear: <Icon12CancelOutline width={14} height={14}/>,
    fill: <Icon20DeleteOutlineAndroid width={14} height={14}/>,
  };

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (isLoading) ? <Loader/> : <div className={styles.main}>
    <TopForms currentCanvas={currentCanvas}/>
    <Controls currentCanvas={currentCanvas} setCurrentCanvas={setCurrentCanvas}/>
    <Canvas selectedColor={selectedColor} triggerClear={triggerClear}
      triggerFill={triggerFill} setTriggerFill={setTriggerFill}
      setTriggerClear={setTriggerClear} cursorSize={cursorSize}
      eraserMode={eraserMode} setEraserMode={setEraserMode}
      pickerMode={pickerMode} captureRef={captureRef}
      range={range} currentCanvas={currentCanvas}
    />
    {!isSSR && <Menu selectedColor={selectedColor}
      eraserMode={eraserMode}
      setEraserMode={setEraserMode}
      setSelectedColor={setSelectedColor}
      captureRef={captureRef}
      setTriggerClear={setTriggerClear}
      setTriggerFill={setTriggerFill}
      setPikerMode={setPikerMode}
      pickerMode={pickerMode}/>}
    {!isSSR && <MenuFromFile
      setTriggerFill={setTriggerFill}
      iconList={iconList}
      hooks={hooks}
      functionsList={functionsList}
      menuList={menuList}/>}
    {/* !isSSR && <Sliders setCursorSize={setCursorSize}/> */}
    {!isSSR && <SlidersCanvas range={range} setRange={setRange}/>}
  </div>;
}

export default HomePage;

