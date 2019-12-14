import dce from "../constants/dce";
const Board: Function = () => {
  const board: HTMLElement = document.getElementById("board");

  for (let i = 0; i < 9; i++) {
    const row: HTMLElement = dce("div");
    row.style.display = "flex";
    row.style.flexDirection = "row";
    row.style.flex = "1";
    if (i !== 8) {
      row.style.borderBottom = "2px solid #7575757a";
    }
    for (let j = 0; j < 9; j++) {
      const cell: HTMLElement = dce("div");
      cell.id = i + "." + j;
      cell.className = "cell";
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
};
export default Board;
