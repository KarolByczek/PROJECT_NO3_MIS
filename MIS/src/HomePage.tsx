import CompanyStrip from './components/CompanyStrip';
import HeadStrip from './components/HeadStrip';
import Menu from './components/Menu';
import ProductStrip from './components/ProductStrip';
import Carousel from "./components/Carousel";


const instrumentIcons:any = [
  {name: "Recording Equipment", imgURL: "/instrument_icons/instrument-icon (1).png" },
  {name: "DJ Equipment", imgURL: "/instrument_icons/instrument-icon (2).png" },
  {name: "Stage Lighting", imgURL: "/instrument_icons/instrument-icon (3).png" },
  {name: "Speakers", imgURL: "/instrument_icons/instrument-icon (4).png" },
  {name: "Software", imgURL: "/instrument_icons/instrument-icon (5).png" },
  {name: "Synthesizers", imgURL: "/instrument_icons/instrument-icon (6).png" },
  {name: "Pianos", imgURL: "/instrument_icons/instrument-icon (7).png" },
  {name: "Guitars", imgURL: "/instrument_icons/instrument-icon (8).png" },
  {name: "Drums", imgURL: "/instrument_icons/instrument-icon (9).png" },
]

function HomePage() {

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
          {instrumentIcons.map((gridmenuitem:any, index:number) => {
            return (
            <div key={index} className='grid_menu_item'>
              <img src={gridmenuitem.imgURL} alt="evevi" />
              <p>
                {gridmenuitem.name}
              </p>
            </div>
          )})}
        </div>
      </section>
    </>
  )
}

export default HomePage
