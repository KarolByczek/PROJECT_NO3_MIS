import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const menuList =
    [
        { name: "GUITARS", path: "/guitars" },
        { name: "SAXOPHONES", path: "/saxophones" },
        { name: "DRUMS", path: "/drums" },
        { name: "KEYBOARDS", path: "/keyboards" },
        { name: "MICROPHONES", path: "/microphones" },
        { name: "TRADITIONAL INSTRUMENTS", path: "/traditional_instruments" },
        { name: "ACCESSORIES", path: "/accessories" },
    ]

const Menu = () => {

    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    const onClickHandler = (path: string) => {
        setActiveLink(path);
    };

    return (
        <div className="main_menu">
          <ul>
            {menuList.map(({ name, path }) => (
              <li key={path}>
                <Link
                  className={`menu_link ${activeLink === path ? "active" : ""}`}
                  to={path}
                  onClick={() => onClickHandler(path)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default Menu
