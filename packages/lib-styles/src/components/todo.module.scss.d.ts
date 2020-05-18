export interface Styles {
  'todo-list': string;
  'list': string;
  'root': string;
  'todo-item': string;
  'active': string;
  'name': string;
  'content': string;
  'todo-add': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
