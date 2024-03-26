"use client";
import { UserContext } from "@/types/context.type";
import User from "@/types/user.type";
import React from "react";

const defaultValue: UserContext = {
  user: undefined,
  setUser: undefined,
};

const initUser: User = {
  room: undefined,
  username: undefined,
};

type Props = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext<UserContext>(defaultValue);

export const useAuth = () => React.useContext<UserContext>(AuthContext);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User>(initUser);

  const value: UserContext = { user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
