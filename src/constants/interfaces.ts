export interface Spot {
  color?: string;
}
export interface point {
  x: number;
  y: number;
  obstacle?: boolean;
}
export interface DivTarget extends EventTarget {
  target: HTMLElement;
}

export interface Anode {
  x: number;
  y: number;
  f: number | undefined;
  parent?: Anode;
}
