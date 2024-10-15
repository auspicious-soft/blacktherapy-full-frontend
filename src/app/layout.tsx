import { Toaster } from "sonner";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import localFont from 'next/font/local'

const gothamPro = localFont({
  src: '../assets/fonts/GothamPro.ttf',
  display: 'swap',
  variable: '--font-gotham',
})
const anticDidone = localFont({
  src: '../assets/fonts/AnticDidoneRegular.ttf',
  display: 'swap',
  variable: '--font-antic',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${gothamPro.variable} ${anticDidone.variable}`}>
          <Toaster richColors />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
