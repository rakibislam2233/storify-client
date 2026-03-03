import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue-custom",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Storify - File Management System",
  description: "A subscription-based file and folder management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${epilogue.className}`}
        suppressHydrationWarning={true}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
