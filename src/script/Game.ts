import dce from "../constants/dce";
import gei from "../constants/gei";
import rc from "../constants/rancords";
import C from "../constants/index";
interface Spot {
  color?: string;
}

export default class Game {
  BD: Array<Array<Spot>>;
  prSp: Array<string>;
  nxSp: Array<string>;
  turn: number;

  constructor() {
    this.BD = C.BoardData();
    const colors = this.getColors();
    const colors2 = this.getColors();
    this.prSp = colors;
    this.nxSp = colors2;
    this.createBalls(colors);
    this.updateStats(colors, colors2);
  }
  updateStats = (c1: string[], c2: string[]): void => {
    this.updateLeft(c1);
    this.updateRight(c2);
  };
  updateLeft = (colors: Array<string>): void => {
    colors.map((item: string, index: number) => {
      const sphrBox: HTMLElement = gei("p" + index);
      sphrBox.innerHTML = "";
      const divka: HTMLElement = dce("div");
      divka.className = "sphere";
      divka.style.backgroundColor = item;
      sphrBox.appendChild(divka);
    });
  };
  updateRight = (colors: string[]): void => {
    colors.map((item: string, index: number) => {
      const sphrBox: HTMLElement = gei("n" + index);
      sphrBox.innerHTML = "";
      const divka: HTMLElement = dce("div");
      divka.className = "sphere";
      divka.style.backgroundColor = item;
      sphrBox.appendChild(divka);
    });
  };
  getColors = () => {
    const a = C.colors[Math.floor(Math.random() * C.colors.length)];
    const b = C.colors[Math.floor(Math.random() * C.colors.length)];
    const c = C.colors[Math.floor(Math.random() * C.colors.length)];
    return [a, b, c];
  };
  createBalls = (colors: Array<string>): void => {
    colors.map((item: string, index: number) => {
      const coords = rc();
      while (true) {
        if (this.BD[coords.x][coords.y].color === undefined) {
          this.BD[coords.x][coords.y].color = item;
          const divo: HTMLElement = gei(coords.x + "." + coords.y);
          const divka: HTMLElement = dce("div");
          divka.className = "sphere";
          divka.style.backgroundColor = item;
          divo.appendChild(divka);
          break;
        }
      }
    });
  };
}
