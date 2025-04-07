import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full h-20">
      <div className="px-10 w-full flex justify-between items-center h-full mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">Sport In Ua</h1>
        <div className="flex gap-10 font-semibold">
          <Link to="">Події</Link>
          {user.username ? (
            <Link to="profile">Профіль</Link>
          ) : (
            <Link to="sign-up">Логін / Реєстрація</Link>
          )}
          {user.username && user.isAdmin ? (
            <Link to="admin-panel">Адмін панель</Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
