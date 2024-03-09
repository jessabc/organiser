"use client"

import Head from 'next/head'
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/app/_redux/provider"
import Header from "./_components/shared/header/Header";
import Sidebar from "./_components/shared/sidebar/Sidebar";
import MainContent from "./_components/shared/main/MainContent";
import PrelineScript from "./components/PrelineScript";
import SidebarToggle from "./_components/shared/sidebarToggle/SidebarToggle";
import ThemeProvider from './provider'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
        <body className={`${inter.className} bg-gray-50 dark:bg-slate-900`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
          <ReduxProvider>
            <Header/>
            <SidebarToggle/>
            <Sidebar/>
            <MainContent>
              {children}
            </MainContent>
            </ReduxProvider>
         <PrelineScript /> 
         </ThemeProvider>
       </body>
      
      
    </html>
  );
}
