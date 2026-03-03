"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function ThemeProviderComp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
