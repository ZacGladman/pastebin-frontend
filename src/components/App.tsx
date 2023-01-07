import { useState } from "react";
import Nav from "./Nav";
import MainContent from "./MainContent";
import "./App.css";
import { IFetchedPaste } from "../utils/interfaces";

function App(): JSX.Element {
  const [navSelection, setNavSelection] = useState("homepage");

  const [fetchedPastes, setFetchedPastes] = useState<IFetchedPaste[]>([]);

  const [singleSummaryIndex, setSingleSummaryIndex] = useState<
    number | undefined
  >();

  return (
    <>
      <Nav
        setNavSelection={setNavSelection}
        navSelection={navSelection}
        singleSummaryIndex={singleSummaryIndex}
        fetchedPastes={fetchedPastes}
        setSingleSummaryIndex={setSingleSummaryIndex}
      />
      <MainContent
        navSelection={navSelection}
        singleSummaryIndex={singleSummaryIndex}
        setSingleSummaryIndex={setSingleSummaryIndex}
        fetchedPastes={fetchedPastes}
        setFetchedPastes={setFetchedPastes}
      />
    </>
  );
}

export default App;
