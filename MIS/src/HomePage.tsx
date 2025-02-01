import CompanyStrip from './components/CompanyStrip';
import HeadStrip from './components/HeadStrip';
import Menu from './components/Menu';
import ProductStrip from './components/ProductStrip';
import Carousel from "./components/Carousel";
import { collection, QueryDocumentSnapshot, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from 'react';


function HomePage() {

  const [dbdata, setDbdata] = useState<any>([]);

  // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTiBtFbIZVxbD_lh-oDdwk-CuXxzrkD-o",
  authDomain: "grid-menu-items-95275.firebaseapp.com",
  projectId: "grid-menu-items-95275",
  storageBucket: "grid-menu-items-95275.firebasestorage.app",
  messagingSenderId: "935989859834",
  appId: "1:935989859834:web:b1410a3f8ba63e4f550043",
  measurementId: "G-KZ6N4BRX8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const gridMenuItems = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(gridMenuItems, 'Grid-Menu-Items'));
        const initArray: Record<string, any>[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          console.log(doc.id, ' => ', doc.data());
          const docObject = doc.data();
          initArray.push(docObject);
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
        <div className='grid_menu'>
          {dbdata.map((gridmenuitem:any, index:number) => {
            <div key={index}>
              <img src={gridmenuitem.imgURL} alt={gridmenuitem.name} />
              <p>
                {gridmenuitem.name}
              </p>
            </div>
          })}
        </div>
      </section>
    </>
  )
}

export default HomePage
