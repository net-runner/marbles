import dce from "../constants/dce";
class Board {
  BD: HTMLElement[][];
  constructor() {
    const board: HTMLElement = document.getElementById("board");
    board.innerHTML = "";
    let boardum = [];
    for (let i = 0; i < 9; i++) {
      const row: HTMLElement = dce("div");
      let rowum = [];
      row.style.display = "flex";
      row.style.flexDirection = "row";
      row.style.flex = "1";
      if (i !== 8) {
        row.style.borderBottom = "2px solid #7575757a";
      }
      for (let j = 0; j < 9; j++) {
        const cell: HTMLElement = dce("div");
        rowum.push(cell);
        cell.id = i + "." + j;
        cell.className = "cell";
        row.appendChild(cell);
      }
      board.appendChild(row);
      boardum.push(rowum);
    }
    this.BD = boardum;
  }
  getBD = (): HTMLElement[][] => {
    return this.BD;
  };
}
export default Board;
