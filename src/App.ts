import "./styles/app.css";
import C from "./constants/index";
import CreateHtml from "./Components/CreateHtml";
import Board from "./Components/Board";
import Game from "./script/Game";

//When site content is loaded
window.onload = () => {
  //Getting the reference to main view html element
  var rootView: HTMLElement = document.getElementById("root");

  //Creating html
  CreateHtml();

  //Creating the board
  let GB = new Board();
  let BD = GB.getBD();
  let GA = new Game(BD);
};
