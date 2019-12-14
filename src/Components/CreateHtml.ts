import dce from "../constants/dce";

const CreateHtml: Function = () => {
  //Getting the reference to main view html element
  const rootView: HTMLElement = document.getElementById("root");

  //Main game div
  const gameBox: HTMLElement = dce("div");
  gameBox.id = "gameBox";
  rootView.appendChild(gameBox);

  //Game header
  const gameHeader: HTMLElement = dce("div");
  gameHeader.id = "gameHeader";

  //Game title
  const h1: HTMLElement = dce("h1");
  h1.innerText = "Kulki";
  gameHeader.appendChild(h1);

  //Statdiv
  const statDiv: HTMLElement = dce("div");
  const h2_1: HTMLElement = dce("h2");
  const h2_2: HTMLElement = dce("h2");
  h2_1.innerText = "Runda";
  h2_1.id = "rounds";
  h2_2.innerText = "Wynik";
  h2_2.id = "score";
  statDiv.id = "statDiv";
  statDiv.appendChild(h2_1);
  statDiv.appendChild(h2_2);
  gameHeader.appendChild(statDiv);
  gameBox.appendChild(gameHeader);

  const nextTurn: HTMLElement = dce("div");
  nextTurn.id = "nextTurn";
  gameBox.appendChild(nextTurn);

  const boardDiv: HTMLElement = dce("div");
  boardDiv.id = "board";
  gameBox.appendChild(boardDiv);
};

export default CreateHtml;
