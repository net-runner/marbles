import colors from "./colors";

const BoardData: Function = () => {
  interface Spot {
    color?: string;
  }
  const theBoard: Array<Array<Spot>> = [];
  for (let i = 0; i < 9; i++) {
    let Arraum = [];
    for (let j = 0; j < 9; j++) {
      Arraum.push({});
    }
    theBoard.push(Arraum);
  }
  return theBoard;
};

export default { BoardData, colors };
