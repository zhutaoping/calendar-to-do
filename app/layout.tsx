import "./globals.css";
import { Poppins } from "next/font/google";
import Providers from "./lib/Providers";
import { User } from "./users/User";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} min-h-screen place-content-center bg-bgContainer md:grid md:bg-slate-600`}
      >
        <Providers>
          <User />
          {children}
        </Providers>
      </body>
    </html>
  );
}
