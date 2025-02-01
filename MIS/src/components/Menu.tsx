import { Link } from 'react-router-dom';

const onClickHandler = (e:any) => {
    e.target.style.background = "red";
}

const Menu = () => {
    return (
        <div className='main_menu'>
            <ul>
                <Link className="link" to="/guitars">
                    <div className="menu_link" onClick={onClickHandler}>GUITARS</div>
                </Link>
                <Link className="link" to="/saxophones">
                    <div className="menu_link" onClick={onClickHandler}>SAXOPHONES</div>
                </Link>
                <Link className="link" to="/drums">
                    <div className="menu_link" onClick={onClickHandler}>DRUMS</div>
                </Link>
                <Link className="link" to="/keyboards">
                    <div className="menu_link" onClick={onClickHandler}>KEYBOARDS</div>
                </Link>
                <Link className="link" to="/microphones">
                    <div className="menu_link" onClick={onClickHandler}>MICROPHONES</div>
                </Link>
                <Link className="link" to="/traditional_instruments">
                    <div className="menu_link" onClick={onClickHandler}>TRADITIONAL INSTRUMENTS</div>
                </Link>
                <Link className="link" to="/accessories">
                    <div className="menu_link" onClick={onClickHandler}>ACCESSORIES</div>
                </Link>
            </ul>
        </div>
    )
}

export default Menu
