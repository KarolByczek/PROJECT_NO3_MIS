import { useEffect, useState } from "react";
import CompanyStrip from "../components/CompanyStrip";
import HeadStrip from "../components/HeadStrip";
import Menu from "../components/Menu";
import ProductStrip from "../components/ProductStrip";
import { Helmet } from "react-helmet-async";
import { getDoc, doc } from "firebase/firestore";
import { thirdDb } from "./../../AUXILIARY_OBJECTS/PortraitsDB";
import AddCommentModal from "../components/AddCommentModal";
import { useCurrentPortrait } from "../components/CurrentPortraitContext";
import "./AccessoriesPage.scss"

const AccessoriesPage = () => {

  const [dbdata, setDbdata] = useState([]);
  const [commentmodal, setCommentModal] = useState(false);
  const { currentPortrait, setCurrentPortrait } = useCurrentPortrait({})


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
    const commentKey = `comment_${Date.now()}`;

    setDbdata((prevData) =>
      prevData.map((portrait) => {
        if (portrait.portraitKey === portraitKey) {
          return {
            ...portrait,
            portrait_comments: {
              ...portrait.portrait_comments,
              [commentKey]: newComment
            }
          };
        }
        return portrait;
      })
    );
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
        {dbdata.map((portrait, index) => {
          return (
            <div className="portrait" key={index}>
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
                    .map((acomment) => (
                      <div className="comment" key={acomment.id}>
                        <strong><p className="content">{acomment.content}</p></strong>
                        <i><p className="signature">-{acomment.signature}</p></i>
                        <small><p className="date">{new Date(Number(acomment.id)).toLocaleString()}</p></small>
                      </div>
                    ))}
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
