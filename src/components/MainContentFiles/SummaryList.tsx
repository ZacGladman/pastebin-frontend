import { ISummaryList } from "../../utils/interfaces";
import SingleSummary from "./SingleSummary";

export default function SummaryList({
  fetchedPastes,
  singleSummaryIndex,
  setSingleSummaryIndex,
  isActive,
  setActiveIndex,
  fetchComments,
}: ISummaryList): JSX.Element {
  console.log(fetchedPastes);

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
}
