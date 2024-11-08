import 'react-tippy/dist/tippy.css';
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
          <Toaster richColors />
        <body className={`${gothamPro.variable} ${anticDidone.variable}`}>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
