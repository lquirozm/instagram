"use client";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { auth } from "@/firebase/config";
import { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";

export const AuthContext = createContext<User | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {loading ? (
        <div className="font-sans w-[100%] min-h-screen flex justify-center items-center">
          <Image
            src={"/IconInstagram.svg"}
            width={100}
            height={100}
            alt="icon-instagram"
          />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
