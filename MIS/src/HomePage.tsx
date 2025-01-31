import CompanyStrip from './components/CompanyStrip';
import HeadStrip from './components/HeadStrip';
import Menu from './components/Menu';
import ProductStrip from './components/ProductStrip';
import Carousel from "./components/Carousel";



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
        <p>
          THE SHOP
        </p>
      </section>
    </>
  )
}

export default HomePage
