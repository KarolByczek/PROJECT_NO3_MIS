import { useEffect, useState } from "react";
import CompanyStrip from "../components/CompanyStrip";
import HeadStrip from "../components/HeadStrip";
import Menu from "../components/Menu";
import ProductStrip from "../components/ProductStrip";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
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
        const querySnapshot = await getDocs(collection(thirdDb, 'PortraitData'));
        const initArray = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          const docObject = doc.data();
          initArray.push(...Object.values(docObject));
          console.log(dbdata);
        });
        setDbdata(initArray);
        console.log(initArray);
      } catch (error) {
        console.error("Error fetching Firestore data: ", error);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, [setDbdata]); // Empty dependency array, runs only once after component mounts

  
    const onClickHandler = (current_one) => {
      
        setCommentModal(true);
        setCurrentPortrait(current_one);
        console.log(currentPortrait)
      
    };


    return (
      <>
        <head>
          <title>ACCESSORIES PAGE</title>
        </head>
        <body>
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
                  <img className="image" src={portrait.portrait_URL_reference} alt="apicture" />
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
                      {([...Object.values(portrait.portrait_comments)]).map((acomment, index) => {
                        return (
                          <div className="comment" key={index}>
                            <p>
                              {acomment.content}
                            </p>
                            <p>
                              {acomment.signature}
                            </p>
                          </div>
                        )
                      })}
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
              thirdDb={thirdDb}
            />
          ) : null}
        </body>
      </>
    )
  }

export default AccessoriesPage;
