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
  const selectedPaste = fetchedPastes.filter(
    (paste) => paste.id === singleSummaryIndex
  )[0];

  return (
    <nav className="navBar">
      <button
        className={
          navSelection === "homepage" && !singleSummaryIndex
            ? "active"
            : "inactive"
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
            : "inactive"
        }
        onClick={() => {
          setNavSelection("summary");
          setSingleSummaryIndex(undefined);
        }}
      >
        pastes summary
      </button>
      {singleSummaryIndex && (
        <button className="active">
          {selectedPaste.title ? selectedPaste.title : "untitled paste"}
        </button>
      )}
    </nav>
  );
}
