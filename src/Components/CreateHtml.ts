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
  h2_1.innerText = "Runda: 1";
  h2_1.id = "rounds";
  h2_2.innerText = "Wynik: 0";
  h2_2.id = "score";
  statDiv.id = "statDiv";
  statDiv.appendChild(h2_1);
  statDiv.appendChild(h2_2);
  gameHeader.appendChild(statDiv);
  gameBox.appendChild(gameHeader);

  //Gamediv
  const gameDiv: HTMLElement = dce("div");
  gameDiv.id = "gameDiv";
  gameBox.appendChild(gameDiv);

  //This turn
  const thisTurn: HTMLElement = dce("div");
  const h2_3: HTMLElement = dce("h2");
  h2_3.innerText = "Ta runda";
  h2_3.style.marginBottom = "30px";
  thisTurn.appendChild(h2_3);
  thisTurn.id = "thisTurn";
  for (let i = 0; i < 3; i++) {
    const c: HTMLElement = dce("div");
    c.className = "cell";
    c.id = "p" + i;
    thisTurn.appendChild(c);
  }
  gameDiv.appendChild(thisTurn);

  //Board div
  const boardDiv: HTMLElement = dce("div");
  boardDiv.id = "board";
  gameDiv.appendChild(boardDiv);

  //Next turn
  const nextTurn: HTMLElement = dce("div");
  nextTurn.id = "nextTurn";
  const h2_4: HTMLElement = dce("h2");
  h2_4.innerText = "Nastepna";
  h2_4.style.marginBottom = "30px";
  nextTurn.appendChild(h2_4);
  nextTurn.id = "nextTurn";
  for (let i = 0; i < 3; i++) {
    const c: HTMLElement = dce("div");
    c.className = "cell";
    c.id = "n" + i;
    nextTurn.appendChild(c);
  }
  gameDiv.appendChild(nextTurn);
};

export default CreateHtml;
