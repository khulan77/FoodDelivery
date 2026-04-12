"use client";

import { User } from "@/types";
import { handleSignIn } from "@/lib";
import { getCurrentUser } from "@/lib/services/user";
import { useRouter } from "next/navigation";
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

type UserContextType = {
  user?: User;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  login: (_email: string, _password: string) => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(undefined);
    push("/login");
  };

  const login = async (email: string, password: string) => {
    const data = await handleSignIn({ email, password });
    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      setUser(data.user);
      push("/");
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("accessToken");
      const data = await getCurrentUser(token);
      setUser(data?.user);
      setLoading(false);
    };
    loadUser();
  }, []);

  return <UserContext.Provider value={{ user, login, logout, setUser, loading }}>{children}</UserContext.Provider>;
};
