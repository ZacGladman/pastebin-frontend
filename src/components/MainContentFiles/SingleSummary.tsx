import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../utils/envBaseURL";
import {
  InputComment,
  inputEvent,
  ISingleSummary,
} from "../../utils/interfaces";

export default function SingleSummary({
  paste,
  isActive,
  setActiveIndex,
  singleSummaryIndex,
  setSingleSummaryIndex,
  fetchedComments,
  fetchComments,
}: ISingleSummary): JSX.Element {
  const summaryListShortenedBody =
    paste.body.length > 680 ? paste.body.slice(0, 639) : undefined;
  const singleSummaryShortenedBody =
    singleSummaryIndex && paste.body.length > 1710
      ? paste.body.slice(0, 1710)
      : undefined;
  const [inputComment, setInputComment] = useState<InputComment>({
    username: "",
    comment: "",
  });

  const handleCommentChange = (e: inputEvent) => {
    setInputComment(() => {
      return { ...inputComment, [e.target.name]: e.target.value };
    });
  };
  const handleSubmitComment = async () => {
    await axios.post(baseUrl + `/pastes/${paste.id}/comments`, inputComment);
    await fetchComments();
  };

  const handleDeleteComment = async (comment: ISingleComment) => {
    await axios.delete(baseUrl + `/pastes/comments/${comment.comment_id}`);
    await fetchComments();
  };

  return (
    <>
      <div
        className={
          isActive === false && singleSummaryIndex === undefined
            ? "defaultView"
            : isActive === false && singleSummaryIndex !== undefined
            ? "singleSummaryDefaultView"
            : "fullView"
        }
        onClick={() => setSingleSummaryIndex(paste.id)}
      >
        <h3 className="pasteTitle">{paste.title}</h3>
        <div className="pasteBody">
          {isActive ? (
            <p>
              {paste.body}
              <button
                onClick={(e) => {
                  setActiveIndex(undefined);
                  e.stopPropagation();
                }}
              >
                show less
              </button>
            </p>
          ) : (
            <p>
              {singleSummaryShortenedBody
                ? singleSummaryShortenedBody
                : summaryListShortenedBody
                ? summaryListShortenedBody
                : paste.body}
              {(summaryListShortenedBody || singleSummaryShortenedBody) && (
                <button
                  onClick={(e) => {
                    setActiveIndex(paste.id);
                    e.stopPropagation();
                  }}
                >
                  [...]
                </button>
              )}
            </p>
          )}
        </div>
      </div>
      {singleSummaryIndex && (
        <div className="commentSection">
          <h4>comments</h4>
          <form
            onSubmit={(e) => {
              handleSubmitComment();
              e.preventDefault();
              setInputComment({ username: "", comment: "" });
            }}
          >
            <input
              type="text"
              placeholder="username"
              required
              value={inputComment.username}
              name="username"
              onChange={(e) => handleCommentChange(e)}
              className="commentUsernameInput"
            />
            <input
              type="text"
              placeholder="add comment"
              required
              value={inputComment.comment}
              name="comment"
              onChange={(e) => handleCommentChange(e)}
              className="commentBodyInput"
            />
            <input type="submit" />
          </form>
          <ul className="commentsList">
            {fetchedComments &&
              fetchedComments.map((comment) => {
                return (
                    <tr key={comment.comment_id}>
                      <td>{comment.username}:</td>
                      <td>{comment.comment}</td>
                      <td>
                        <button
                          className="deleteCommentButton"
                          onClick={() => handleDeleteComment(comment)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
}
