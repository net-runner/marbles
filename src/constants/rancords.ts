import { point } from "./interfaces";

//Random pair of numbers
const rc = (): point => {
  const rx = Math.floor(Math.random() * 9);
  const ry = Math.floor(Math.random() * 9);
  return { x: rx, y: ry };
};
export default rc;
