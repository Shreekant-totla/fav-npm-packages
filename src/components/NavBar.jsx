import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="flex items-center justify-evenly bg-slate-200 w-4/5 mx-auto">
      <Link
        to={"/"}
        className={`text-2xl ${
          activeLink === "/" ? "text-blue-500" : "text-gray-500"
        }`}
        onClick={() => handleLinkClick("/")}
      >
        Homepage
      </Link>
      <Link
        to={"/Fav"}
        className={`text-2xl ${
          activeLink === "/Fav" ? "text-blue-500" : "text-gray-500"
        }`}
        onClick={() => handleLinkClick("/Fav")}
      >
        Favourite
      </Link>
    </div>
  );
}

export default NavBar;
