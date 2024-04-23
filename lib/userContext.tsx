"use client";
import { User } from "firebase/auth";
import { ReactNode, createContext, useContext } from "react";

interface UserContextType {
  user: User | {} | null;
  username: string | null;
}

interface Props {
  children: ReactNode;
}

const UserContext = createContext<UserContextType>({
  user: null,
  username: null,
});

export default function UserProvider({ children }: Props) {
  return (
    <UserContext.Provider value={{ user: {}, username: "Yashi" }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
