"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import API from "@/config/api";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const fetchUserDetails = async () => {
    console.log('called')
    setLoading(true)
    try {
      const response = await API.get("/auth/current-user");
      setUser(response.data?.data);
    } catch (error) {
      console.error(error);
      setUser(null)
      localStorage.removeItem('accessToken')
      Cookies.remove('accessToken')
    } finally {
      setLoading(false)
    }
  }
  console.log(user, localStorage.getItem('accessToken'))

  useEffect(() => {
    if(!user && localStorage.getItem('accessToken')) {
      console.log('called')
      fetchUserDetails()
    }
  }, [user, router])

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    fetchUserDetails
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);