"use client";
import { User } from "firebase/auth";
import { ReactNode, createContext, useContext } from "react";
import { useUserData } from "./hooks";

interface UserContextType {
  user: User | null | undefined;
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
  const { user, username } = useUserData();

  return (
    <UserContext.Provider value={{ user, username }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
