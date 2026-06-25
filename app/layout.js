import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/Toast";
import { SITE } from "@/lib/apiCatalog";

export const metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: { default:`${SITE.name} — REST API Gratis`, template:`%s — ${SITE.name}` },
  description: SITE.tagline,
  icons: { icon:"/images/icon-website.png" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="grid-bg" aria-hidden="true" />
        <div className="orb orb-cyan" aria-hidden="true" />
        <div className="orb orb-orange" aria-hidden="true" />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ToastProvider />
      </body>
    </html>
  );
}
