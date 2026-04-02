import { LineGame } from "./LineGame.jsx";

export function Caro4(props) {
  return <LineGame {...props} rows={7} cols={7} winLength={4} reward={90} />;
}
