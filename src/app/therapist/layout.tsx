import type { Metadata } from "next";
import "./therapystyle.css";
import SideNav from "@/app/therapist/components/SideNav";
import localFont from "next/font/local";
import MobileHeader from "@/app/therapist/components/MobileHeader";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import OnboardingForm from "../(website)/components/OnboardingForm";
// import MobileHeader from "@/components/MobileHeader";

const gothamPro = localFont({
  src: '../../assets/fonts/GothamPro.ttf',
  display: 'swap',
  variable: '--font-gotham',
});
const GothamProBlack = localFont({
  src: '../../assets/fonts/GothamPro-Black.ttf',
  display: 'swap',
  variable: '--font-GothamPro-Black',
});
const GothamProBold = localFont({
  src: '../../assets/fonts/GothamPro-Bold.ttf',
  display: 'swap',
  variable: '--font-GothamPro-Bold',
});

const GothamProMedium = localFont({
  src: '../../assets/fonts/GothamPro-Medium.ttf',
  display: 'swap',
  variable: '--font-GothamPro-Medium',
});

const anticDidone = localFont({
  src: '../../assets/fonts/AnticDidoneRegular.ttf',
  display: 'swap',
  variable: '--font-antic',
});

export const metadata: Metadata = {
  title: "The Black Therapy Network",
  description: "",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  else if ((session as any)?.user?.role === 'therapist') {
    if ((session as any)?.user?.onboardingCompleted === 'true' && (session as any)?.user?.status === 'Active') {
      return (
        <html lang="en">
          <body className={`${gothamPro.variable} ${anticDidone.variable} ${GothamProBlack.variable} ${GothamProBold.variable} ${GothamProMedium.variable}`}>
            <div className="flex h-screen flex-col lg:flex-row lg:overflow-hidden">
              <div className="flex-none hidden h-[100vh] lg:block">
                <SideNav />
              </div>
              <div className="w-full lg:hidden">
                <MobileHeader />
              </div>
              <div className="flex-grow p-[15px] md:overflow-y-auto lg:p-[50px]">
                {children}
              </div>
            </div>
          </body>
        </html>
      )
    }
    else {
      redirect('/onboarding')
      return null
    }
  }
  else {
    return (
      <div className="bg-black h-screen text-white">
        You are not authorized to view this page
      </div>
    )
  }
}