import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className='main_menu'>
            <ul>
                <Link className="link" to="/guitars">
                    <div className="menu_link">GUITARS</div>
                </Link>
                <Link className="link" to="/saxophones">
                    <div className="menu_link">SAXOPHONES</div>
                </Link>
                <Link className="link" to="/drums">
                    <div className="menu_link">DRUMS</div>
                </Link>
                <Link className="link" to="/keyboards">
                    <div className="menu_link">KEYBOARDS</div>
                </Link>
                <Link className="link" to="/microphones">
                    <div className="menu_link">MICROPHONES</div>
                </Link>
                <Link className="link" to="/traditional_instruments">
                    <div className="menu_link">TRADITIONAL INSTRUMENTS</div>
                </Link>
                <Link className="link" to="/accessories">
                    <div className="menu_link">ACCESSORIES</div>
                </Link>
            </ul>
        </div>
    )
}

export default Menu
