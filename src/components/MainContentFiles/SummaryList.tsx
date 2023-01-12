import { ISummaryList } from "../../utils/interfaces";
import SingleSummary from "./SingleSummary";
import LoadingSpin from "react-loading-spin";

export default function SummaryList({
  fetchedPastes,
  singleSummaryIndex,
  setSingleSummaryIndex,
  isActive,
  setActiveIndex,
  fetchComments,
}: ISummaryList): JSX.Element {
  console.log(fetchedPastes);

  if (fetchedPastes) {
    return (
      <div className="summaryListContainer">
        <p className="usageInstructions">
          {">"} click on a paste to see its comments {"<"}
        </p>
        {fetchedPastes.map((paste) => {
          return (
            <SingleSummary
              paste={paste}
              key={paste.id}
              isActive={isActive === paste.id}
              setActiveIndex={setActiveIndex}
              singleSummaryIndex={singleSummaryIndex}
              setSingleSummaryIndex={setSingleSummaryIndex}
              fetchComments={fetchComments}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Fetching Data - render.com may take some time to wake up! 💤</h1>
        <LoadingSpin />
      </div>
    );
  }
}
