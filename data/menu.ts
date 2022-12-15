interface menuItem {
  id?: string,
  type?: string,
  content?: string,
  click?: (params: any) => any,
  mode?: (params: any) => any,
}

export type menuList = Array<menuItem>

export const menuList: Array<menuItem> = [
  {
    id: 'erase',
    type: 'button',
    content: 'Ластик',
  },
  {
    id: 'edit',
    type: 'button',
    content: 'Редактирование',
  },
  {
    id: 'download',
    type: 'button',
    content: 'Скачать',
  },
  {
    id: 'clear',
    type: 'button',
    content: 'Очистить',
  },
  {
    id: 'fill',
    type: 'button',
    content: 'Заливка',
  },
];
