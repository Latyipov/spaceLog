import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";

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
        </Providers>
      </body>
    </html>
  );
}
