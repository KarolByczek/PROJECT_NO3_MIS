import { useEffect, useState } from "react";
import CompanyStrip from "../components/CompanyStrip";
import HeadStrip from "../components/HeadStrip";
import Menu from "../components/Menu";
import ProductStrip from "../components/ProductStrip";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { thirdDb } from "./../../AUXILIARY_OBJECTS/PortraitsDB";

const AccessoriesPage = () => {

  const [dbdata, setDbdata] = useState<any>([]);
  console.log(thirdDb);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(thirdDb, 'PortraitData'));
        const initArray: Record<string, any>[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          console.log(doc.id, ' => ', doc.data());
          const docObject = doc.data();
          initArray.push(...Object.values(docObject));
          console.log(initArray);
        });
        setDbdata(initArray);
        console.log(dbdata);
      } catch (error) {
        console.error("Error fetching Firestore data: ", error);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, [setDbdata]); // Empty dependency array, runs only once after component mounts


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
          {dbdata.map((portrait: any, index: number) => {
            return (
              <div className="portrait" key={index}>
                <img src={portrait.portrait_URL_reference} alt="apicture" />
                <p>
                  {portrait.portrait_name}
                </p>
              </div>)
          })}
        </div>
      </body>
    </>
  )
}

export default AccessoriesPage
