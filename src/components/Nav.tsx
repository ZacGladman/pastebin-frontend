import { IFetchedPaste, setNavSelection } from "../utils/interfaces";
interface INav {
  setNavSelection: setNavSelection;
  navSelection: string;
  singleSummaryIndex: number | undefined;
  setSingleSummaryIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  fetchedPastes: IFetchedPaste[];
}

export default function Nav({
  setNavSelection,
  navSelection,
  singleSummaryIndex,
  fetchedPastes,
  setSingleSummaryIndex,
}: INav): JSX.Element {
  return (
    <nav className="navBar">
      <button
        className={
          navSelection === "homepage" && !singleSummaryIndex
            ? "active"
            : "homepage"
        }
        onClick={() => {
          setNavSelection("homepage");
          setSingleSummaryIndex(undefined);
        }}
      >
        homepage
      </button>
      <button
        className={
          navSelection === "summary" && !singleSummaryIndex
            ? "active"
            : "summary"
        }
        onClick={() => {
          setNavSelection("summary");
          setSingleSummaryIndex(undefined);
        }}
      >
        pastes summary
      </button>
      {singleSummaryIndex && (
        <button className="active">paste index: {singleSummaryIndex}</button>
      )}
    </nav>
  );
}
