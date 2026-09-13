import type { Metadata } from "next";
import { Lato, Chewy } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-body-family",
  display: "swap",
});

const chewy = Chewy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-wordmark-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "rippl",
  description:
    "A creative direction workspace where AI explores campaign territory while your decisions stay exactly as you left them.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${chewy.variable} bg-mustard font-body antialiased`}
      >
        <div className="p-1.5 sm:p-2">
          <div className="min-h-screen rounded-xl bg-paper">{children}</div>
        </div>
      </body>
    </html>
  );
}