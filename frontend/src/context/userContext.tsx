import { createContext, useState, useEffect, ReactNode } from "react";

export interface User {
  username: string;
  hashedPassword: string;
  loggedInTime: number;
  isAdmin: boolean;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType>({
  user: {
    username: "",
    hashedPassword: "",
    loggedInTime: 0,
    isAdmin: false,
  },
  setUser: () => {},
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    username: "",
    hashedPassword: "",
    loggedInTime: Date.now(),
    isAdmin: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user.username) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
