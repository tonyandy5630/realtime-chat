import { Montserrat } from "next/font/google";
import "./globals.css";
import { StrictMode } from "react";
import { AuthContextProvider } from "@/context";

const inter = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <StrictMode>
        <body className={inter.className}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </body>
      </StrictMode>
    </html>
  );
}
