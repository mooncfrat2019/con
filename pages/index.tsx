import React, {useEffect, useRef, useState} from 'react';
import Canvas from './components/canvaas/Canvas';
import styles from '../styles/Home.module.css';
import '@vkontakte/vkui/dist/vkui.css';
import '@vkontakte/vkui/dist/unstable.css';
import Menu from './components/menu/menu';
import bridge from '@vkontakte/vk-bridge';

function HomePage() {
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [pickerMode, setPikerMode] = useState<boolean>(false);
  const [isSSR, setIsSSR] = useState(true);
  const captureRef = useRef(null);

  bridge.send('VKWebAppInit');

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return <div className={styles.main}>
    {!isSSR && <Menu selectedColor={selectedColor}
      setSelectedColor={setSelectedColor}
      captureRef={captureRef}
      setPikerMode={setPikerMode}
      pickerMode={pickerMode}/>}
    <Canvas selectedColor={selectedColor}
      pickerMode={pickerMode} captureRef={captureRef}/>
  </div>;
}

export default HomePage;

