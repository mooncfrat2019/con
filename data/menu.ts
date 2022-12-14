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
];
