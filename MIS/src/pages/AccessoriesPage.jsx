import { useEffect, useState } from "react";
import CompanyStrip from "../components/CompanyStrip";
import HeadStrip from "../components/HeadStrip";
import Menu from "../components/Menu";
import ProductStrip from "../components/ProductStrip";
import { Helmet } from "react-helmet-async";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { thirdDb } from "./../../AUXILIARY_OBJECTS/PortraitsDB";
import AddCommentModal from "../components/AddCommentModal";
import { useCurrentPortrait } from "../components/CurrentPortraitContext";
import "./AccessoriesPage.scss"

const AccessoriesPage = () => {

  const [dbdata, setDbdata] = useState([]);
  const [commentmodal, setCommentModal] = useState(false);
  const { currentPortrait, setCurrentPortrait } = useCurrentPortrait({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(thirdDb, "PortraitData", "NsXOGRWHw71ZuLGxy2BQ");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const docData = docSnap.data(); // ✅ This is your big portrait object

          const initArray = [];
          Object.entries(docData).forEach(([key, value]) => {
            initArray.push({ ...value, portraitKey: key });
          });

          setDbdata(initArray);
        } else {
          console.error("Document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching Firestore data: ", error);
      }
    };

    fetchData();
  }, []);


  const onClickHandler = (current_one) => {
    setCommentModal(true);
    setCurrentPortrait(current_one);
    console.log(currentPortrait)
  };

const addCommentToPortrait = (portraitKey, newComment) => {
  const commentKey = `comment_${newComment.id}`;

  setDbdata((prevData) =>
    prevData.map((portrait) => {
      if (portrait.portraitKey === portraitKey) {
        return {
          ...portrait,
          portrait_comments: {
            ...portrait.portrait_comments,
            [commentKey]: newComment,
          },
        };
      }
      return portrait;
    })
  );
};

  const handleUpdateComment = async (e, commentId, portraitKey) => {
    e.preventDefault();

    const docRef = doc(thirdDb, "PortraitData", "NsXOGRWHw71ZuLGxy2BQ");
    const updatedPath = `${portraitKey}.portrait_comments.comment_${commentId}.content`;

    try {
      await updateDoc(docRef, {
        [updatedPath]: editingContent,
      });

      setDbdata(prevData =>
        prevData.map(portrait => {
          if (portrait.portraitKey === portraitKey) {
            const updatedComments = { ...portrait.portrait_comments };
            const commentKey = Object.keys(updatedComments).find(
              key => updatedComments[key].id === commentId
            );

            if (commentKey) {
              updatedComments[commentKey] = {
                ...updatedComments[commentKey],
                content: editingContent,
              };
            }

            return {
              ...portrait,
              portrait_comments: updatedComments,
            };
          }
          return portrait;
        })
      );

      setEditingCommentId(null);
      setEditingContent("");

    } catch (error) {
      console.error("Failed to update comment: ", error);
    }
  };

  const startEditingComment = (commentId, comment) => {
    console.log("Editing comment:", commentId);
    setEditingCommentId(commentId);
    setEditingContent(comment.content);
  };

  const userSignature = localStorage.getItem("signature"); // or however you're tracking it

  const userIsAuthor = (signature) => {
    return signature === userSignature;
  };


  return (
    <>
      <Helmet>
        <title>ACCESSORIES PAGE</title>
      </Helmet>
      <HeadStrip />
      <CompanyStrip />
      <ProductStrip />
      <Menu />
      <h1>
        ACCESSORIES PAGE
      </h1>
      <div className="portraits_section">
        {dbdata.map((portrait) => {
          return (
            <div className="portrait" key={portrait.portraitKey}>
              <img className="image" src={portrait.portrait_URL} alt="apicture" />
              <div className="about">
                <p>
                  <strong>{portrait.portrait_name}</strong>
                </p>
                <p>
                  {portrait.portrait_description}
                </p>
              </div>
              <div className="comments_box">
                {[...Object.values(portrait.portrait_comments)].length > 0 ? <h3>COMMENTS:</h3> : null}
                <div className="comments">
                  {Object.values(portrait.portrait_comments)
                    .sort((a, b) => Number(b.id) - Number(a.id)) // ⬅️ Ascending (newest to oldest)
                    .map((acomment) => {
                      return acomment.id === editingCommentId ? (
                        <form key={acomment.id} onSubmit={(e) => handleUpdateComment(e, acomment.id, portrait.portraitKey)}>
                          <textarea
                            autoFocus
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            required
                          />
                          <button type="submit">Save</button>
                          <button type="button" onClick={() => setEditingCommentId(null)}>
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <div className="comment" key={acomment.id}>
                          <strong><p className="content">{acomment.content}</p></strong>
                          <i><p className="signature">-{acomment.signature}</p></i>
                          <small><p className="date">{new Date(Number(acomment.id)).toLocaleString()}</p></small>
                          {userIsAuthor(acomment.signature) && (
                            <button onClick={() => startEditingComment(acomment.id, acomment)}>
                              Edit
                            </button>
                          )}
                        </div>
                      )
                    })
                  }
                </div>
                <button className="add_button" onClick={() => onClickHandler(portrait)}>
                  ADD A COMMENT
                </button>
              </div>
            </div>)
        })}
      </div>
      {commentmodal === true ? (
        <AddCommentModal
          setter01={setCommentModal}
          setter02={addCommentToPortrait}
        />
      ) : null}

    </>
  )
}

export default AccessoriesPage;
