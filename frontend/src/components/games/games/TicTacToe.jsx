import { LineGame } from "./LineGame.jsx";

export function TicTacToe(props) {
  return <LineGame {...props} rows={3} cols={3} winLength={3} reward={45} />;
}
