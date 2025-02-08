import CompanyStrip from './components/CompanyStrip';
import HeadStrip from './components/HeadStrip';
import Menu from './components/Menu';
import ProductStrip from './components/ProductStrip';
import Carousel from "./components/Carousel";
import "./HomePage.scss"


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
