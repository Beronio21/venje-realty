import { DM_Sans } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venje Realty - Find Your Dream Property in the Philippines",
  description:
    "Venje Realty connects buyers, sellers, and renters with premium properties across the Philippines.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
};
import ThemeProviderComp from "./provider/ThemeProviderComp";
import Aoscompo from "@/utils/aos";
const dmsans = DM_Sans({ subsets: ["latin"] });
import NextTopLoader from 'nextjs-toploader';
import { AppContextProvider } from "../context-api/PropertyContext";
import ScrollToTop from "./components/scroll-to-top";
import SessionProviderComp from "./provider/SessionProviderComp";

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session:any
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmsans.className}`}>
      <AppContextProvider>
      <SessionProviderComp session={session}>
        <ThemeProviderComp>
          <Aoscompo>
            <NextTopLoader />
            {children}
          </Aoscompo>
          <ScrollToTop />
        </ThemeProviderComp>
        </SessionProviderComp>
        </AppContextProvider>
      </body>
    </html>
  );
}
