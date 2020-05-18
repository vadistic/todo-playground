export interface Styles {
  'controls': string;
  'root': string;
  'count': string;
  'filters': string;
  'item': string;
  'button': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
