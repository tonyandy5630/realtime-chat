import React from "react";
import User from "./user.type";

export type UserContext = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};
