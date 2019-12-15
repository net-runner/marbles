import gei from "../constants/gei";
import dce from "../constants/dce";

interface point {
  x: number;
  y: number;
  obstacle?: boolean;
}
interface Anode {
  x: number;
  y: number;
  f: number | undefined;
  parent?: Anode;
}
const findWay = (
  start: point,
  nodelist: point[][],
  end: point,
  showPath: boolean
): boolean => {
  let open: Anode[] = [];
  let closed: Anode[] = [];
  let obstacles: point[] = [];
  let path: point[] = [];
  const start_node: Anode = {
    x: start.x,
    y: start.y,
    f: 0
  };

  open.push(start_node);

  const Astara = (counter?: number): number => {
    if (counter === 500) {
      return 0;
    }
    const current = lowest_f(open);
    open.splice(open.indexOf(current), 1);
    closed.push(current);
    if (current.x === end.x && current.y === end.y) {
      return 1;
    }
    const neighbours = getNeighbours(nodelist, current);

    neighbours.map((neighbour, index) => {
      const new_cost =
        heuristic(
          { x: start_node.x, y: start_node.y },
          { x: neighbour.x, y: neighbour.y }
        ) +
        heuristic({ x: neighbour.x, y: neighbour.y }, { x: end.x, y: end.y });

      let freshAnode: Anode = {
        x: neighbour.x,
        y: neighbour.y,
        f: 0
      };

      //Check if node is in closed list
      let isClosed = false;
      for (let i = 0; i < closed.length; i++) {
        if (freshAnode.x === closed[i].x && freshAnode.y === closed[i].y) {
          isClosed = true;
        }
      }

      //Check if node is in open list
      let isOpen = false;
      let openIndex;
      for (let i = 0; i < open.length; i++) {
        if (freshAnode.x === open[i].x && freshAnode.y === open[i].y) {
          isOpen = true;
          openIndex = i;
        }
      }

      //Finishing touches
      if (!neighbour.obstacle && !isClosed) {
        if (isOpen) {
          if (new_cost <= freshAnode.f) {
            freshAnode.f = new_cost;
            freshAnode.parent = current;
            open[openIndex] = freshAnode;
          }
        } else {
          freshAnode.f = new_cost;
          open.push(freshAnode);
          freshAnode.parent = current;
        }
      } else {
        if (neighbour.obstacle) {
          let isClosed = false;
          for (let i = 0; i < closed.length; i++) {
            if (neighbour.x === closed[i].x && neighbour.y === closed[i].y) {
              isClosed = true;
            }
          }
          if (!isClosed) {
            obstacles.push(neighbour);
          }
        }
      }
    });

    let ct2 = counter + 1;
    return Astara(ct2);
  };

  if (Astara(0) === 1) {
    const path = getPath(closed, [], start_node);
    Bredraw(open, closed, obstacles, path, showPath);
    return true;
  } else {
    return false;
  }
};
const getPath = (closed: Anode[], pA: Anode[], start_node: Anode): Anode[] => {
  let par = pA;
  if (pA.length === 0) {
    const endNode = closed[closed.length - 1];
    par.push(endNode);
    return getPath(closed, par, start_node);
  } else {
    const endNode = pA[pA.length - 1];
    if (endNode.x === start_node.x && endNode.y === start_node.y) {
      return pA;
    } else {
      const NextNodeIndex = closed.indexOf(endNode.parent);
      const NextNode = closed[NextNodeIndex];
      par.push(NextNode);
      return getPath(closed, par, start_node);
    }
  }
};
const Bredraw = (
  open: Anode[],
  closed: Anode[],
  obstacles: point[],
  path: Anode[],
  showPath: boolean
): void => {
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
  if (showPath) {
    //Coloring board
    if (open) {
      open.map((item, index) => {
        const target = gei(item.x + "." + item.y);
        target.classList.add("open");
      });
    }
    if (closed) {
      closed.map((item, index) => {
        if (item) {
          const target = gei(item.x + "." + item.y);
          target.classList.add("closed");
          const pI = dce("h1");
          pI.innerText = item.f.toString();
          pI.className = "pathInfo";
          pI.addEventListener("mouseover", e => e.stopPropagation());
          target.appendChild(pI);
        }
      });
    }
    if (obstacles) {
      obstacles.map((item, index) => {
        const target = gei(item.x + "." + item.y);
        target.classList.add("obstacle");
      });
    }
    path.map((item, index) => {
      const target = gei(item.x + "." + item.y);
      target.className = "cell";
      target.classList.add("path");
      const pI = dce("h1");
      pI.innerText = item.f.toString();
      pI.className = "pathInfo";
      pI.addEventListener("mouseover", e => e.stopPropagation());
      target.appendChild(pI);
    });
  }
};
//Finding open node with lowest f_cost
const lowest_f = (open: Anode[]): Anode => {
  let lowestAnode: Anode;
  lowestAnode = open[0];
  open.map((item, index) => {
    if (item.f < lowestAnode.f) {
      lowestAnode = item;
    }
  });
  return lowestAnode;
};
const getNeighbours = (nodelist: point[][], current: Anode): point[] => {
  let neighbours: point[] = [];
  //ONLY DIAGONAL NEIGHBOURS
  for (let i = current.x - 1; i < current.x + 2; i++) {
    for (let j = current.y - 1; j < current.y + 2; j++) {
      if (nodelist[i]) {
        if (nodelist[i][j]) {
          let targetNode = nodelist[i][j];
          if (targetNode) {
            if (
              (i === current.x && j === current.y) ||
              (i === current.x - 1 && j === current.y - 1) ||
              (i === current.x - 1 && j === current.y + 1) ||
              (i === current.x + 1 && j === current.y - 1) ||
              (i === current.x + 1 && j === current.y + 1)
            ) {
              continue;
            } else {
              neighbours.push({
                x: targetNode.y,
                y: targetNode.x,
                obstacle: targetNode.obstacle
              });
            }
          }
        }
      }
    }
  }
  return neighbours;
};
//Manhattan heuristic
const heuristic = (a: point, b: point): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

export default findWay;
