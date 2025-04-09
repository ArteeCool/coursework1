// src/components/Header.tsx
import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../context/index.ts";

const Header = () => {
  const { username, isAdmin } = useContext(UserContext);

  return (
    <nav className="w-full h-20 bg-white shadow">
      <div className="px-10 w-full flex justify-between items-center h-full mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">Sport In Ua</h1>
        <div className="flex gap-10 font-semibold">
          <Link to="/">Події</Link>
          {username ? (
            <Link to="/profile">Профіль</Link>
          ) : (
            <Link to="/sign-up">Логін / Реєстрація</Link>
          )}
          {username && isAdmin && <Link to="/admin-panel">Адмін панель</Link>}
        </div>
      </div>
    </nav>
  );
};

export default Header;
