import type { Metadata } from "next";
import "./adminstyles.css";
import SideNav from "@/app/admin/components/SideNav";
import localFont from "next/font/local";
import MobileHeader from "@/app/admin/components/MobileHeader";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
// import fontt from "../../assets/fonts"
const gothamPro = localFont({
  src: "../../assets/fonts/GothamPro.ttf",
  display: "swap",
  variable: "--font-gotham",
});
const GothamProBlack = localFont({
  src: "../../assets/fonts/GothamPro-Black.ttf",
  display: "swap",
  variable: "--font-GothamPro-Black",
});
const GothamProBold = localFont({
  src: "../../assets/fonts/GothamPro-Bold.ttf",
  display: "swap",
  variable: "--font-GothamPro-Bold",
});

const GothamProMedium = localFont({
  src: "../../assets/fonts/GothamPro-Medium.ttf",
  display: "swap",
  variable: "--font-GothamPro-Medium",
});

const anticDidone = localFont({
  src: "../../assets/fonts/AnticDidoneRegular.ttf",
  display: "swap",
  variable: "--font-antic",
});

export const metadata: Metadata = {
  title: "The Black Therapy Network",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  const notUserOrAdmin = ['therapist', 'client']

  if (!session) {
    redirect("/login")
  }
  else if (!notUserOrAdmin.includes((session as any)?.user?.role)) {
    return (
      <html lang="en">
        <body
          className={`${gothamPro.variable} ${anticDidone.variable} ${GothamProBlack.variable} ${GothamProBold.variable} ${GothamProMedium.variable}`}
        >
          <div className="flex h-screen flex-col lg:flex-row lg:overflow-hidden">
            <div className="flex-none hidden h-[100vh] lg:block">
              <SideNav />
            </div>
            <div className="w-full lg:hidden">
              <MobileHeader />
            </div>
            <main className="flex-grow p-[15px] md:overflow-y-auto lg:p-[50px]">
              {children}
            </main>
          </div>
        </body>
      </html>
    );
  } else {
    return (
      <div className="p-3 bg-black h-screen text-white">
        You are not authorized to view this page click
        <Link href={'/login'} className="p-3 text-black bg-white">
          Login
        </Link>
      </div>
    );
  }
}
