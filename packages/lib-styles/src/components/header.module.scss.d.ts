export interface Styles {
  'header': string;
  'root': string;
  'title': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
