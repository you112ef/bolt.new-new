"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MessageContext } from "@/data/context/MessageContext";
import { UserDetailContext } from "@/data/context/UserDetailContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
// Removed Convex imports for static build

interface UserDetail {
  _id: string;
  _creationTime: number;
  name: string;
  email: string;
  picture: string;
  uid: string;
}

interface Message {
  role: string;
  content: string;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {

  const [messages, setMessages] = React.useState<Message[]>([]);
  const [userDetail, setUserDetail] = React.useState<UserDetail | null>(null);

  React.useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') as string);
      if (user && user.email) {
        // For static build, just use the user data from localStorage
        setUserDetail(user as any);
        console.log("User authenticated:", user);
      }
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessageContext.Provider value={{ messages, setMessages }}>
            <NextThemesProvider {...props}>
              {children}
            </NextThemesProvider>
          </MessageContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </>
  );
}
