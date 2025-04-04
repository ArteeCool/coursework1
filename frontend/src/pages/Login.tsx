import { useRef, useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameLabelRef = useRef<HTMLLabelElement>(null);
  const passwordLabelRef = useRef<HTMLLabelElement>(null);
  const statusText = useRef<HTMLParagraphElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {};

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
              onFocus={() => {
                if (usernameLabelRef.current) {
                  usernameLabelRef.current.style.transform =
                    "translateY(-45px)";
                }
              }}
              onBlur={(e) => {
                if (!e.target.value && usernameLabelRef.current) {
                  usernameLabelRef.current.style.transform = "translateY(0)";
                }
              }}
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
              onFocus={() => {
                if (passwordLabelRef.current) {
                  passwordLabelRef.current.style.transform =
                    "translateY(-45px)";
                }
              }}
              onBlur={(e) => {
                if (!e.target.value && passwordLabelRef.current) {
                  passwordLabelRef.current.style.transform = "translateY(0)";
                }
              }}
              id="password"
              className="w-full bg-gray-100 px-6 py-3 rounded-lg outline-none"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="w-full relative"></div>
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
