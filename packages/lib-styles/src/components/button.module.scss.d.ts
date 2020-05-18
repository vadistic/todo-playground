export interface Styles {
  'button': string;
  'root': string;
  'button-outline': string;
  'outline': string;
  'button-clear': string;
  'clear': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
