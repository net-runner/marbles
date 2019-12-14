import "./styles/app.css";
//When site content is loaded
window.onload = () => {
  //Getting the reference to main view dom element
  var rootView: HTMLElement = document.getElementById("root");
  interface Spot {
    occupied: boolean;
    color?: string;
  }
  //Color array
  var colors: Array<string> = [
    "#512DA8",
    "#7B1FA2",
    "#C2185B",
    "#1976D2",
    "#5D4037",
    "#388E3C",
    "#FFA000"
  ];
  var theBoard: Array<Array<Spot>> = [];

  //Creating simple board data
  for (let i = 0; i < 9; i++) {
    let Arraum = [];
    for (let j = 0; j < 9; j++) {
      Arraum.push({ occupied: false });
    }
    theBoard.push(Arraum);
  }
  //Adding the title
  var h1: HTMLElement = document.createElement("h1");
  h1.innerText = "Kulki";
  rootView.appendChild(h1);

  //Creating the board
  var board: HTMLElement = document.createElement("div");
};
