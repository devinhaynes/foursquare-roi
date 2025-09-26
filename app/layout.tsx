import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import { FormProvider } from "@/lib/state";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foursquare ROI",
  description: "Real Estate ROI calculation tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FormProvider>
          <div className="flex flex-col-reverse md:flex-row gap-4 max-w-[1640px] mx-auto">
            <div className="fixed bottom-0 w-full z-10 md:relative md:w-fit">
              <Sidebar />
            </div>
            {children}
          </div>
        </FormProvider>
      </body>
    </html>
  );
}
