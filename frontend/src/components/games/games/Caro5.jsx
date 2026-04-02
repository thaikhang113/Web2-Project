import { LineGame } from "./LineGame.jsx";

export function Caro5(props) {
  return <LineGame {...props} rows={15} cols={15} winLength={5} reward={120} />;
}
