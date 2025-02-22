import CompanyStrip from './components/CompanyStrip';
import HeadStrip from './components/HeadStrip';
import Menu from './components/Menu';
import ProductStrip from './components/ProductStrip';
import Carousel from "./components/Carousel";
import BestsellersList from './components/BestsellersList';
import "./HomePage.scss"
import { useEffect, useState } from 'react';
import { collection, QueryDocumentSnapshot, getDocs } from "firebase/firestore";
import { secondaryDb } from './../AUXILIARY_OBJECTS/GridMenuItems';


function HomePage() {

  const [dbdata, setDbdata] = useState<any>([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(secondaryDb, 'GridMenuItems'));
          const initArray: Record<string, any>[] = [];
          querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
            console.log(doc.id, ' => ', doc.data());
            const docObject = doc.data();
            initArray.push(...Object.values(docObject));
            console.log(initArray);
          });
          setDbdata(initArray); 
        } catch (error) {
          console.error("Error fetching Firestore data: ", error);
        }
      };
  
      fetchData(); // Call the async function to fetch data
    }, [setDbdata]); // Empty dependency array, runs only once after component mounts
  

  return (
    <>
      <title>HOME PAGE</title>
      <section>
        <HeadStrip />
        <CompanyStrip />
        <ProductStrip />
        <Menu />
        <h1>WELCOME TO THE MUSIC INSTRUMENT SHOP <span>&#128075;</span></h1>
        <Carousel />
        <div className='grid_menu_section'>
          <h1>CATEGORIES</h1>
          <div className='grid_menu'>
            {dbdata.map((gridmenuitem: any, index: number) => {
              return (
                <a key={index} className='grid_menu_item' href={gridmenuitem.href}>
                  <div>
                    <img src={gridmenuitem.imgURL} alt="evevi" />
                    <p>
                      {gridmenuitem.name}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
        <BestsellersList/>
        <div className='something'>
            <h1>
              SECTION SOMETHING
            </h1>
        </div>
      </section>
    </>
  )
}

export default HomePage
