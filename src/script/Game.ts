import dce from "../constants/dce";
import gei from "../constants/gei";
import rc from "../constants/rancords";
import C from "../constants/index";
import findWay from "./Pathfinding";
import { Spot, point, ColorPoint } from "../constants/interfaces";

export default class Game {
  BDHE: HTMLElement[][];
  BD: Array<Array<Spot>>;
  prSp: Array<string>;
  nxSp: Array<string>;
  turn: number;
  score: number;
  selected?: string;
  hovered?: string;
  showPath: boolean;
  endPoint: point;
  startPoint: point;
  awaitingNR: boolean;
  pathHeur?: string;
  PB: point[][];

  constructor(BDE: HTMLElement[][]) {
    this.BD = C.BoardData();
    this.showPath = false;
    this.BDHE = BDE;
    const colors = this.getColors();
    const colors2 = this.getColors();
    this.prSp = colors;
    this.nxSp = colors2;
    this.turn = 0;
    this.score = 0;
    this.createBalls(colors);
    this.updateStats(colors, colors2);
    this.handleHover();
    this.handledivClick();
    document.addEventListener("keyup", e => {
      if (e.key === "w") {
        if (!this.awaitingNR) {
          this.showPath = !this.showPath;
          findWay(
            this.startPoint,
            this.PB,
            this.endPoint,
            this.showPath,
            this.pathHeur
          );
        }
      }
      if (e.key === "h") {
        if (this.pathHeur) {
          this.pathHeur = undefined;
        } else {
          this.pathHeur = "best-first";
        }
        findWay(
          this.startPoint,
          this.PB,
          this.endPoint,
          this.showPath,
          this.pathHeur
        );
      }
    });
  }
  updateStats = (c1: string[], c2: string[]): void => {
    this.turn = this.turn + 1;
    const turnDiv = gei("rounds");
    turnDiv.innerHTML = "Runda: " + this.turn;

    const scoreDiv = gei("score");
    scoreDiv.innerHTML = "Wynik: " + this.score;
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
  getColors = (): string[] => {
    const a = C.colors[Math.floor(Math.random() * C.colors.length)];
    const b = C.colors[Math.floor(Math.random() * C.colors.length)];
    const c = C.colors[Math.floor(Math.random() * C.colors.length)];
    return [a, b, c];
  };
  logikumKalkulaturum = (color: string, current: point): point[] | false => {
    //Logica ludum

    let vectoris: point[] = [];
    const neighborys = this.getAllNeighbours(current, this.BD);
    neighborys.map((item, index) => {
      if (item.color === color) {
        const exe = current.x - item.x;
        const eye = current.y - item.y;

        vectoris.push({ x: exe, y: eye });
      }
    });
    let Pathium: point[] = [];
    if (!vectoris) {
      return false;
    }
    vectoris.map((item, index) => {
      const wannabeGOOD = this.calcScoreRow(color, item, current);
      if (wannabeGOOD.length >= 5) {
        wannabeGOOD.map((item, index) => {
          var Flagellan = true;
          for (var i = 0; i < Pathium.length; i++) {
            if (Pathium[i].x === item.x && Pathium[i].y === item.y)
              Flagellan = false;
          }
          if (Flagellan) Pathium.push(item);
        });
      }
    });
    if (Pathium.length >= 5) {
      return Pathium;
    } else {
      return false;
    }
  };
  calcScoreRow = (color: string, vectr: point, start: point): point[] => {
    let path: point[] = [];
    path.push(start);
    let counter = 1;
    while (true) {
      if (counter == 10) {
        break;
      }
      const nextf = {
        x: start.x - vectr.x * counter,
        y: start.y - vectr.y * counter
      };
      if (this.BD[nextf.x]) {
        if (this.BD[nextf.x][nextf.y]) {
          if (this.BD[nextf.x][nextf.y].color !== color) {
            break;
          } else {
            path.push(nextf);
            counter++;
          }
        } else {
          break;
        }
      } else {
        break;
      }
    }
    let cntr = 1;
    while (true) {
      if (cntr == 10) {
        break;
      }
      const nextf = {
        x: start.x + vectr.x * cntr,
        y: start.y + vectr.y * cntr
      };
      if (this.BD[nextf.x]) {
        if (this.BD[nextf.x][nextf.y]) {
          if (this.BD[nextf.x][nextf.y].color !== color) {
            break;
          } else {
            path.push(nextf);
            cntr++;
          }
        } else {
          break;
        }
      } else {
        break;
      }
    }

    return path;
  };
  getAllNeighbours = (current: point, nodelist: Spot[][]): ColorPoint[] => {
    let neighbours: ColorPoint[] = [];
    //ALL NEIGHBOURS
    for (let i = current.x - 1; i < current.x + 2; i++) {
      for (let j = current.y - 1; j < current.y + 2; j++) {
        if (nodelist[i]) {
          if (nodelist[i][j]) {
            let targetNode = nodelist[i][j];
            if (targetNode) {
              if (i === current.x && j === current.y) {
                continue;
              } else {
                neighbours.push({
                  x: i,
                  y: j,
                  color: targetNode.color
                });
              }
            }
          }
        }
      }
    }
    return neighbours;
  };
  createBalls = (colors: Array<string>): void => {
    for (let i = 0; i < colors.length; i++) {
      const PlantSphere = (): void => {
        const coords = rc();
        if (this.BD[coords.x][coords.y].color === undefined) {
          this.BD[coords.x][coords.y].color = colors[i];
          const divo = this.BDHE[coords.x][coords.y];
          divo.addEventListener("click", this.handleClick);
          const divka = dce("div");
          divka.addEventListener("mouseover", e => e.stopPropagation());
          divka.className = "sphere";
          divka.style.backgroundColor = colors[i];
          divo.appendChild(divka);

          const RP = this.logikumKalkulaturum(colors[i], {
            x: coords.x,
            y: coords.y
          });

          if (RP) {
            RP.map((item, index) => {
              this.BDHE[item.x][item.y].innerHTML = "";
              this.BDHE[item.x][item.y].removeEventListener(
                "click",
                this.handleClick
              );
              this.BD[item.x][item.y] = {};
            });
            this.score = this.score + RP.length;
          }

          return;
        }
        return PlantSphere();
      };
      PlantSphere();
      if (this.checkEND()) {
        break;
      }
    }
  };
  checkEND = (): boolean => {
    let FLAAGA = true;
    this.BD.map((row, index) => {
      row.map((itemor, indexor) => {
        if (itemor.color === undefined) {
          FLAAGA = false;
        }
      });
    });
    if (FLAAGA) {
      this.BDHE.map((row, index) => {
        row.map((cell, indexor) => {
          cell.removeEventListener("hover", this.handleHover);
          cell.removeEventListener("click", this.handleClick);
          cell.removeEventListener("click", this.handledivClick);
        });
      });
      if (window.confirm(`Poraźka po ${this.turn} turach. Jescze raz?`)) {
        this.BDHE.map((row, index) => {
          row.map((cell, indexor) => (cell.innerHTML = ""));
        });
        this.BD = C.BoardData();
        this.showPath = false;
        const colors = this.getColors();
        const colors2 = this.getColors();
        this.prSp = colors;
        this.nxSp = colors2;
        this.turn = -1;
        this.score = 0;
        this.createBalls(colors);
        this.updateStats(colors, colors2);
        this.handleHover();
        this.handledivClick();
      }
      return true;
    } else {
      return false;
    }
  };
  handleClick = (e: MouseEvent): void => {
    const tE = e.target as HTMLElement;
    if (!this.awaitingNR) {
      const target = tE.parentNode as HTMLElement;
      if (this.selected === target.id) {
        console.log("ODKLIKU");
        target.style.borderColor = "";
        target.className = "cell";
        this.selected = undefined;
        this.startPoint = undefined;
        this.endPoint = undefined;
      } else {
        console.log("KLIKU");
        this.selected = target.id;
        this.BDHE.map((row, index) => {
          row.map((itemor, indexor) => {
            itemor.style.borderColor = "";
            itemor.className = "cell";
          });
        });

        let x = parseInt(this.selected.split(".")[0]);
        let y = parseInt(this.selected.split(".")[1]);

        if (this.BD[x])
          if (this.BD[y]) {
            target.style.borderColor = this.BD[x][y].color;
            target.classList.add("plotki");
            let start = { x, y };
            this.startPoint = start;
          }
      }
    }
  };
  cleanPD = (): void => {
    //Clean path data
    const targetur = gei("board");
    const targety = targetur.getElementsByClassName("cell");

    const infoTargets = targetur.getElementsByClassName("pathInfo");

    const ai = Array.from(infoTargets);
    const ae = Array.from(targety);

    //Removing classes
    ai.map((item, index) => {
      item.remove();
    });
    ae.map((item, index) => {
      item.className = "cell";
    });
  };
  handledivClick = (): void => {
    const targetur = gei("board");
    const targety = targetur.getElementsByClassName("cell");
    Array.from(targety).map((item, index) => {
      item.addEventListener("click", e => {
        if (!this.awaitingNR)
          if (this.selected) {
            if (this.startPoint) {
              if (this.endPoint) {
                const freeSpot = findWay(
                  this.startPoint,
                  this.PB,
                  this.endPoint,
                  this.showPath,
                  this.pathHeur
                );
                if (freeSpot) {
                  //Remove sphere from start
                  const start = this.BDHE[this.startPoint.x][this.startPoint.y];
                  start.removeEventListener("click", this.handleClick);
                  start.innerHTML = "";
                  const clr = this.BD[this.startPoint.x][this.startPoint.y]
                    .color;
                  //Remove color from start point
                  this.BD[this.startPoint.x][this.startPoint.y] = {};

                  const target = this.BDHE[this.endPoint.x][this.endPoint.y];
                  target.addEventListener("click", this.handleClick);
                  const divka = dce("div");
                  divka.addEventListener("mouseover", e => e.stopPropagation());
                  divka.className = "sphere";
                  divka.style.backgroundColor = clr;
                  target.appendChild(divka);

                  //Targeted data cell add color
                  this.BD[this.endPoint.x][this.endPoint.y].color = clr;

                  //Checking if there is 5 spheres
                  const RP = this.logikumKalkulaturum(clr, {
                    x: this.endPoint.x,
                    y: this.endPoint.y
                  });

                  //Undefine the starting points
                  this.selected = undefined;
                  this.startPoint = undefined;
                  this.endPoint = undefined;

                  this.awaitingNR = true;

                  //Remove visual selection
                  this.BDHE.map((row, index) => {
                    row.map((itemor, indexor) => {
                      itemor.style.borderColor = "";
                    });
                  });

                  setTimeout(() => {
                    //Handle new round

                    //Rzeczypospolita
                    //AKA IF THERE IS ATLEAST ONE SET of 5 SPHERES, PERFORM CERTAIN ACTION
                    if (RP) {
                      RP.map((item, index) => {
                        this.BDHE[item.x][item.y].innerHTML = "";
                        this.BDHE[item.x][item.y].removeEventListener(
                          "click",
                          this.handleClick
                        );
                        this.BD[item.x][item.y] = {};
                      });
                      this.score = this.score + RP.length;
                    }

                    this.cleanPD();
                    this.awaitingNR = false;

                    //If there was found 5 spheres in a row GRANT FREE ROUND
                    if (!RP) {
                      this.prSp = this.nxSp;
                      this.nxSp = this.getColors();

                      //Creating new balls
                      this.createBalls(this.prSp);
                    }

                    //Handling stats update
                    this.updateStats(this.prSp, this.nxSp);
                  }, 500);
                  //Handle new round
                }
              }
            }
          }
      });
    });
  };
  handleHover = (): void => {
    const targetur = gei("board");
    const targety = targetur.getElementsByClassName("cell");
    Array.from(targety).map((item, index) => {
      item.addEventListener("mouseover", e => {
        const tE = e.target as HTMLElement;
        if (!this.awaitingNR)
          if (this.selected) {
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
            let y2 = parseInt(tE.id.split(".")[1]);
            let x2 = parseInt(tE.id.split(".")[0]);
            let end = { x: x2, y: y2, obstacle: pathBoard[x2][y2].obstacle };
            this.endPoint = end;
            this.PB = pathBoard;
            findWay(
              this.startPoint,
              pathBoard,
              end,
              this.showPath,
              this.pathHeur
            );
          }
      });
    });
  };
}
