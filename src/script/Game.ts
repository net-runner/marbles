import dce from "../constants/dce";
import gei from "../constants/gei";
import rc from "../constants/rancords";
import C from "../constants/index";
import findWay from "./Pathfinding";
interface Spot {
  color?: string;
}
interface point {
  x: number;
  y: number;
  obstacle?: boolean;
}
interface DivTarget extends EventTarget {
  target: HTMLElement;
}
export default class Game {
  BDHE: HTMLElement[][];
  BD: Array<Array<Spot>>;
  prSp: Array<string>;
  nxSp: Array<string>;
  turn: number;
  selected?: string;
  hovered?: string;
  showPath: boolean;
  endPoint: point;
  startPoint: point;
  PB: point[][];

  constructor(BDE: HTMLElement[][]) {
    this.BD = C.BoardData();
    this.showPath = false;
    this.BDHE = BDE;
    const colors = this.getColors();
    const colors2 = this.getColors();
    this.prSp = colors;
    this.nxSp = colors2;
    this.createBalls(colors);
    this.updateStats(colors, colors2);
    this.handleHover();
    document.addEventListener("keyup", e => {
      if (e.key === "w") {
        this.showPath = !this.showPath;
        findWay(this.startPoint, this.PB, this.endPoint, this.showPath);
      }
    });
  }
  updateStats = (c1: string[], c2: string[]): void => {
    this.updateLeft(c1);
    this.updateRight(c2);
  };
  updateLeft = (colors: Array<string>): void => {
    colors.map((item: string, index: number) => {
      const sphrBox = gei("p" + index);
      sphrBox.innerHTML = "";
      const divka = dce("div");
      divka.className = "sphere";
      divka.style.backgroundColor = item;
      sphrBox.appendChild(divka);
    });
  };
  updateRight = (colors: string[]): void => {
    colors.map((item: string, index: number) => {
      const sphrBox = gei("n" + index);
      sphrBox.innerHTML = "";
      const divka = dce("div");
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
          const divo = this.BDHE[coords.x][coords.y];
          divo.addEventListener("click", this.handleClick);
          const divka = dce("div");
          divka.addEventListener("mouseover", e => e.stopPropagation());
          divka.className = "sphere";
          divka.style.backgroundColor = item;
          divo.appendChild(divka);
          break;
        }
      }
    });
  };
  handleClick = (e: any): void => {
    const target = e.target.parentNode.id;
    if (this.selected === target) {
      console.log("ODKLIKU");
      this.selected = undefined;
    } else {
      console.log("KLIKU");
      this.selected = target;
    }
  };
  divClick = (): void => {};
  handleHover = (): void => {
    const targetur = gei("board");
    const targety = targetur.getElementsByClassName("cell");
    Array.from(targety).map((item, index) => {
      item.addEventListener("mouseover", (e: any) => {
        if (this.selected && this.selected !== e.target.id) {
          let calcBoard = this.BD;
          let pathBoard: point[][] = calcBoard.map((item, index) => {
            return item.map((itemor, indexor) => {
              if (itemor.color) {
                return { x: indexor, y: index, obstacle: true };
              } else {
                return { x: indexor, y: index };
              }
            });
          });
          let x = parseInt(this.selected.split(".")[0]);
          let y = parseInt(this.selected.split(".")[1]);
          let start = { x, y };

          let y2 = parseInt(e.target.id.split(".")[1]);
          let x2 = parseInt(e.target.id.split(".")[0]);
          let end = { x: x2, y: y2 };

          this.startPoint = start;
          this.endPoint = end;
          this.PB = pathBoard;
          findWay(start, pathBoard, end, this.showPath);
        }
      });
    });
  };
}
