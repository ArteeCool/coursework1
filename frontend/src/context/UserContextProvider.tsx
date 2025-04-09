import { useState, useEffect, ReactNode } from "react";
import { User, UserContext } from "./userContext";

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    username: "",
    hashedPassword: "",
    loggedInTime: 0,
    isAdmin: false,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("loggedInUser");
      }
    }
  }, []);

  useEffect(() => {
    if (user.username) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
