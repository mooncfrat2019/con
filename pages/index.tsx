import React, {useState} from 'react';
import styles from '../styles/Home.module.css';
import '@vkontakte/vkui/dist/vkui.css';
import '@vkontakte/vkui/dist/unstable.css';
import bridge from '@vkontakte/vk-bridge';
import Loader from './components/loaders/Loader';

function HomePage() {
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  bridge.send('VKWebAppInit').then((r) => console.log(r));
  bridge.send('VKWebAppGetUserInfo').then((r) => {
    setUserInfo(r);
    setIsLoading(false);
  }).catch(() => {
    setIsLoading(false);
  });

  return (isLoading) ? <Loader/> : <div className={styles.main}>
    Testing
  </div>;
}

export default HomePage;

