import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import Curseur from "@/components/Curseur";
import Providers from "@/components/Providers";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yazid | Développeur web",
  description: "Sites vitrine, e-commerce et applications web sur mesure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}>
  <Providers>
    <Curseur />
    {children}
  </Providers>
</body>
    </html>
  );
}