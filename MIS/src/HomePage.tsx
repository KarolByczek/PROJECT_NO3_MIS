import CompanyStrip from './components/CompanyStrip';
import HeadStrip from './components/HeadStrip';
import Menu from './components/Menu';
import ProductStrip from './components/ProductStrip';
import Carousel from "./components/Carousel";
import "./HomePage.scss"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useEffect } from 'react';
import { collection, QueryDocumentSnapshot, getDocs } from "firebase/firestore";

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

  const firebaseConfig = {
    apiKey: "AIzaSyC2lYNp66IAWL-Yjzpr9WIRUuiNqMbsuJo",
    authDomain: "mis-carousel-elements.firebaseapp.com",
    projectId: "mis-carousel-elements",
    storageBucket: "mis-carousel-elements.firebasestorage.app",
    messagingSenderId: "719513831136",
    appId: "1:719513831136:web:d26d7afb6de73d56c37285",
    measurementId: "G-27YFNYFVH6"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const carouselURLsDb = getFirestore(app);

function HomePage() {

  useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(carouselURLsDb, 'GridMenuItems'));
          const initArray: Record<string, any>[] = [];
          querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
            console.log(doc.id, ' => ', doc.data());
            const docObject = doc.data();
            initArray.push(...Object.values(docObject));
            console.log(initArray);
          });
        } catch (error) {
          console.error("Error fetching Firestore data: ", error);
        }
      };
  
      fetchData(); // Call the async function to fetch data
    }, [getDocs]); // Empty dependency array, runs only once after component mounts
  

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
            {instrumentIcons.map((gridmenuitem: any, index: number) => {
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
