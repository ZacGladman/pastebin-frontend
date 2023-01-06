import { setNavSelection } from "../utils/interfaces";
interface INav {
  setNavSelection: setNavSelection;
  navSelection: string;
}

export default function Nav({
  setNavSelection,
  navSelection,
}: INav): JSX.Element {
  return (
    <nav>
      <button
        className={navSelection === "homepage" ? "active" : "homepage"}
        onClick={() => setNavSelection("homepage")}
      >
        homepage
      </button>
      <button
        className={navSelection === "summary" ? "active" : "summary"}
        onClick={() => setNavSelection("summary")}
      >
        pastes summary
      </button>
    </nav>
  );
}
