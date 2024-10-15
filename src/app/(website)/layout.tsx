'use client';
import "@/app/globals.css";
import { Antic_Didone } from "next/font/google";
import Header from "@/app/(website)/components/Header";
import localFont from 'next/font/local'
import Footer from "@/app/(website)/components/Footer";
import { usePathname } from 'next/navigation';

const gothamPro = localFont({
  src: '../../assets/fonts/GothamPro.ttf',
  display: 'swap',
  variable: '--font-gotham', 
})
const anticDidone = localFont({
  src: '../../assets/fonts/AnticDidoneRegular.ttf',
  display: 'swap',
  variable: '--font-antic',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideFooterRoutes = ['/login', '/forgotpassword', '/resetpassword', '/signup', '/admin'];

  return (
    <html lang="en">
      <body className={`${gothamPro.variable} ${anticDidone.variable}`}>
        <Header />
        {children}
        {!hideFooterRoutes.includes(pathname) && <Footer />}
      </body>
    </html>
  );
}
