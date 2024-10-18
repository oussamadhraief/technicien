import { NavLink, useHistory } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { RiShutDownLine } from "react-icons/ri";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function Navigation() {
  const [activePath, setActivePath] = useState(window.location.pathname);
  const history = useHistory();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  const handleClick = (path: string) => {
    setActivePath(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 flex justify-around items-center bg-gray-50 border-t border-gray-200 z-50">
      <NavLink
        to="/home"
        onClick={() => handleClick("/home")}
        className={`text-sm flex items-center flex-col gap-0.5 ${
          activePath === "/home" ? "text-blue-600 font-semibold" : "text-gray-700"
        }`}
      >
        <IoHomeOutline size={20} />
        Home
      </NavLink>
      <NavLink
        to="/create-intervention"
        onClick={() => handleClick("/create-intervention")}
        className={`text-sm flex items-center flex-col gap-0.5 ${
          activePath === "/create-intervention" ? "text-blue-600 font-semibold" : "text-gray-700"
        }`}
      >
        <GoPlus size={20} />
        Nouvelle intervention
      </NavLink>
      <NavLink
        to="/interventions"
        onClick={() => handleClick("/interventions")}
        className={`text-sm flex items-center flex-col gap-0.5 ${
          activePath === "/interventions" ? "text-blue-600 font-semibold" : "text-gray-700"
        }`}
      >
        <IoMenuOutline size={20} />
        Mes interventions
      </NavLink>
      <button
        className="text-gray-700 text-sm font-semibold flex items-center flex-col gap-0.5"
        onClick={handleLogout}
      >
        <RiShutDownLine size={20} />
      </button>
    </div>
  );
}
