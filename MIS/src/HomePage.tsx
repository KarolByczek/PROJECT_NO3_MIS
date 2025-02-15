import CompanyStrip from './components/CompanyStrip';
import HeadStrip from './components/HeadStrip';
import Menu from './components/Menu';
import ProductStrip from './components/ProductStrip';
import Carousel from "./components/Carousel";
import "./HomePage.scss"
import { useEffect, useState } from 'react';
import { collection, QueryDocumentSnapshot, getDocs } from "firebase/firestore";
import { secondaryDb } from './../AUXILIARY_OBJECTS/GridMenuItems';

const instrumentIcons: any = [
  { name: "Recording Equipment", imgURL: "/instrument_icons/instrument-icon (1).png", href: "https://www.youtube.com/watch?v=FRqLYCig6wI" },
  { name: "DJ Equipment", imgURL: "/instrument_icons/instrument-icon (2).png", href: "https://www.youtube.com/watch?v=FRqLYCig6wI" },
  { name: "Stage Lighting", imgURL: "/instrument_icons/instrument-icon (3).png", href: "https://www.youtube.com/watch?v=FRqLYCig6wI" },
  { name: "Speakers", imgURL: "/instrument_icons/instrument-icon (4).png", href: "https://www.youtube.com/watch?v=FRqLYCig6wI" },
  { name: "Software", imgURL: "/instrument_icons/instrument-icon (5).png", href: "https://www.youtube.com/watch?v=FRqLYCig6wI" },
  { name: "Synthesizers", imgURL: "/instrument_icons/instrument-icon (6).png", href: "https://www.youtube.com/watch?v=FRqLYCig6wI" },
  { name: "Pianos", imgURL: "/instrument_icons/instrument-icon (7).png", href: "https://www.youtube.com/watch?v=FRqLYCig6wI" },
  { name: "Guitars", imgURL: "/instrument_icons/instrument-icon (8).png", href: "https://www.youtube.com/watch?v=FRqLYCig6wI" },
  { name: "Drums", imgURL: "/instrument_icons/instrument-icon (9).png", href: "https://www.youtube.com/watch?v=FRqLYCig6wI" },
]


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

      </section>
    </>
  )
}

export default HomePage
