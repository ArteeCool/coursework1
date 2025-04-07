import { useContext, useState } from "react";
import { User, UserContext } from "../context/userContext";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Паролі не збігаються");
      return;
    }
    setPasswordError("");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = { ...user, hashedPassword };
    setUser(updatedUser);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: User) =>
      u.username === user.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Пароль успішно змінено!");
  };

  const handleLogout = () => {
    setUser({
      username: "",
      hashedPassword: "",
      loggedInTime: Date.now(),
      isAdmin: false,
    });
    localStorage.setItem("isLoggedIn", "false");
    navigate("/");
  };

  return (
    <div className="w-full min-h-[91.25vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {user.username || "John Doe"}
        </h2>

        <div className="mt-6">
          <div className="mb-4">
            <input
              type="password"
              placeholder="Новий пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
            />
            <input
              type="password"
              placeholder="Підтвердьте новий пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
            <button
              onClick={handlePasswordChange}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Змінити пароль
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Вийти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
