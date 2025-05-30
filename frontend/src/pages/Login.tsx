// src/pages/Login.tsx
import bcrypt from "bcryptjs";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, UserContext } from "../context/userContext.tsx";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameLabelRef = useRef<HTMLLabelElement>(null);
  const passwordLabelRef = useRef<HTMLLabelElement>(null);
  const statusText = useRef<HTMLParagraphElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    statusText.current!.textContent = "";

    const foundUser = users.find((u) => u.username === username);
    if (!foundUser) {
      statusText.current!.textContent = "Користувача з таким ім'ям не існує";
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.hashedPassword)) {
      statusText.current!.textContent = "Неправильний пароль";
      return;
    }

    const loggedInTime = Date.now();
    const updatedUser: User = {
      ...foundUser,
      loggedInTime,
      isAdmin: foundUser.isAdmin || false,
    };

    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    navigate("/");
  };

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center">
      <div className="max-w-lg w-full h-fit border-2 border-black rounded-2xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full h-full justify-center items-center p-10 gap-10 text-left"
        >
          <h1 className="text-3xl font-semibold">Логін</h1>
          <div className="w-full relative">
            <label
              ref={usernameLabelRef}
              htmlFor="username"
              className="w-full absolute left-0 top-1/2 -translate-y-1/2 translate-x-6 duration-500 ease-in-out"
            >
              Username
            </label>
            <input
              onFocus={() =>
                usernameLabelRef.current &&
                (usernameLabelRef.current.style.transform = "translateY(-45px)")
              }
              onBlur={(e) =>
                !e.target.value &&
                usernameLabelRef.current &&
                (usernameLabelRef.current.style.transform = "translateY(0)")
              }
              id="username"
              className="w-full bg-gray-100 px-6 py-3 rounded-lg outline-none"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-full relative">
            <label
              ref={passwordLabelRef}
              htmlFor="password"
              className="w-full absolute left-0 top-1/2 -translate-y-1/2 translate-x-6 duration-500 ease-in-out"
            >
              Password
            </label>
            <input
              onFocus={() =>
                passwordLabelRef.current &&
                (passwordLabelRef.current.style.transform = "translateY(-45px)")
              }
              onBlur={(e) =>
                !e.target.value &&
                passwordLabelRef.current &&
                (passwordLabelRef.current.style.transform = "translateY(0)")
              }
              id="password"
              className="w-full bg-gray-100 px-6 py-3 rounded-lg outline-none"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-3">
            <p className="text-red-500" ref={statusText}></p>
            <p>
              Не маєте акаунту?
              <Link
                className="text-cyan-600 hover:underline ml-2"
                to={"/sign-up"}
              >
                Реєстрація
              </Link>
            </p>
            <button className="mx-auto hover:scale-105 duration-300 px-6 py-3 rounded-lg bg-black text-white font-semibold">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
