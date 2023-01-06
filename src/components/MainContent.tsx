import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { baseUrl } from "../utils/envBaseURL";
import {
  IPasteInput,
  IFetchedPaste,
  inputEvent,
  IMainContent,
  ISingleComment,
} from "../utils/interfaces";
import Homepage from "./MainContentFiles/Homepage";
import SingleSummary from "./MainContentFiles/SingleSummary";
import SummaryList from "./MainContentFiles/SummaryList";

export default function MainContent({
  navSelection,
}: IMainContent): JSX.Element {
  const [pasteInput, setPasteInput] = useState<IPasteInput>({
    title: "",
    body: "",
  });
  const [fetchedPastes, setFetchedPastes] = useState<IFetchedPaste[]>([]);
  const [singleSummaryIndex, setSingleSummaryIndex] = useState<
    number | undefined
  >();
  const [activeIndex, SetActiveIndex] = useState<number>();
  const [fetchedComments, setFetchedComments] = useState<ISingleComment[]>([]);

  const handleInputChange = (e: inputEvent) => {
    setPasteInput(() => {
      if (e.target.name === "title") {
        return { ...pasteInput, title: e.target.value };
      } else {
        return { ...pasteInput, body: e.target.value };
      }
    });
  };

  const fetchPastes = async () => {
    const response = await axios.get(baseUrl + "/pastes");
    console.log(response);
    setFetchedPastes(response.data);
  };

  const fetchComments = useCallback(async () => {
    const response = await axios.get(
      baseUrl + `/pastes/${singleSummaryIndex}/comments/`
    );
    console.log(response);
    setFetchedComments(response.data);
  }, [singleSummaryIndex]);

  const handleSubmitPaste = async () => {
    if (pasteInput.body.length > 0) {
      await axios.post(baseUrl + "/pastes", pasteInput);
      fetchPastes();
      setPasteInput({
        title: "",
        body: "",
      });
    } else {
      window.alert("Body must not be empty");
    }
  };

  useEffect(() => {
    fetchPastes();
  }, []);

  useEffect(() => {
    if (singleSummaryIndex !== undefined) {
      fetchComments();
    }
  }, [singleSummaryIndex, fetchComments]);
  return (
    <>
      {singleSummaryIndex !== undefined ? (
        fetchedPastes
          .filter((paste) => paste.id === singleSummaryIndex)
          .map((paste) => (
            <SingleSummary
              paste={paste}
              key={paste.id}
              isActive={activeIndex === paste.id}
              setActiveIndex={SetActiveIndex}
              singleSummaryIndex={singleSummaryIndex}
              setSingleSummaryIndex={setSingleSummaryIndex}
              fetchedComments={fetchedComments}
              fetchComments={fetchComments}
            />
          ))
      ) : (
        <>
          {navSelection === "homepage" ? (
            <Homepage
              pasteInput={pasteInput}
              setPasteInput={handleInputChange}
              setFetchedPaste={setFetchedPastes}
              handleSubmitPaste={handleSubmitPaste}
            />
          ) : (
            <SummaryList
              fetchedPastes={fetchedPastes}
              singleSummaryIndex={singleSummaryIndex}
              setSingleSummaryIndex={setSingleSummaryIndex}
              isActive={activeIndex}
              setActiveIndex={SetActiveIndex}
              fetchComments={fetchComments}
            />
          )}
        </>
      )}
    </>
  );
}
