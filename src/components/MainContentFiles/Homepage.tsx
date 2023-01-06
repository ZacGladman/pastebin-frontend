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
        >
          <input
            type="text"
            placeholder="Title (optional)"
            value={pasteInput.title}
            name="title"
            onChange={(e) => setPasteInput(e)}
          />
          <textarea
            name="pasteSummary"
            value={pasteInput.body}
            onChange={(e) => setPasteInput(e)}
          ></textarea>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}
