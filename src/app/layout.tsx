import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="relative min-h-screen flex flex-col">
        <Providers>
          <Header />
          {children}
          <Footer />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
