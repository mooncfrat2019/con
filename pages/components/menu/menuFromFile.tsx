import React from 'react';
import styles from './Menu.module.css';
import {Button, Div} from '@vkontakte/vkui';
import {Dropdown} from '@vkontakte/vkui/unstable';
import {menuList} from '../../../data/menu';
import {FunctionListForMenu, Hooks, IconList} from '../../../data/interfaces';

interface Props {
    menuList: menuList,
    hooks: Hooks,
    functionsList: FunctionListForMenu,
    iconList: IconList
}

const MenuFromFile = (
    {
      menuList,
      hooks,
      functionsList,
      iconList,
    }: Props) => {
  return (<div className={styles.menu}>
    {menuList.map((menuItem, index) => {
      return (<Dropdown
        key={index}
        action={'hover'}
        placement="bottom"
        content={<Div>{menuItem.content}</Div>}
      >
        <Button
          className={styles.menuItem}
          // @ts-ignore
          appearance={(hooks[menuItem.id][0]) ? 'accent' : 'neutral'}
          // @ts-ignore
          mode={(hooks[menuItem.id][0]) ? 'primary' : 'secondary'}
          // @ts-ignore
          onClick={functionsList[menuItem.id]}>
          {/* @ts-ignore */}
          {iconList[menuItem.id]}
        </Button>
      </Dropdown>);
    })}
  </div>);
};

export default MenuFromFile;
