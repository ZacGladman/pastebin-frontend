import { IHomepage } from "../../utils/interfaces";

export default function Homepage({
  pasteInput,
  setPasteInput,
  setFetchedPaste,
  handleSubmitPaste,
}: IHomepage): JSX.Element {
  return (
    <>
      <div className="pasteContainer">
        <form
          onSubmit={(e) => {
            handleSubmitPaste();
            e.preventDefault();
          }}
          className="pasteForm"
        >
          <input
            className="pasteInputTitle"
            type="text"
            placeholder="Title (optional)"
            value={pasteInput.title}
            name="title"
            onChange={(e) => setPasteInput(e)}
          />{" "}
          <br></br>
          <textarea
            className="pasteInputBody"
            name="pasteSummary"
            value={pasteInput.body}
            onChange={(e) => setPasteInput(e)}
            required
          ></textarea>
          <br></br>
          <input type="submit" className="pasteInputSubmitBtn" />
        </form>
      </div>
    </>
  );
}
