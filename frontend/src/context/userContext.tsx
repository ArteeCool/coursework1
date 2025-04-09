import { createContext } from "react";

export interface User {
  username: string;
  hashedPassword: string;
  loggedInTime: number;
  isAdmin: boolean;
}

export interface UserContextType extends User {
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType>({
  username: "",
  hashedPassword: "",
  loggedInTime: 0,
  isAdmin: false,
  setUser: () => {},
});
