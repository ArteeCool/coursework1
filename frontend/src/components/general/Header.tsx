import { Link } from "react-router";

const Header = () => {
  return (
    <div className="w-full h-20">
      <div
        className={
          "px-10 w-full flex justify-between items-center h-full mx-auto max-w-7xl"
        }
      >
        <h1 className="text-3xl font-bold">Sport In Ua</h1>
        <div className="flex gap-10 font-semibold">
          <Link to="">Події</Link>
          <Link to="sign-up">Логін / Реєстрація</Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
