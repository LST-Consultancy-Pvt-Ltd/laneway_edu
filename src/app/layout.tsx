import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { loaderScript, loaderStyles, PageLoader } from "@/components/layout/PageLoader";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Editorial serif that echoes the heavy serif in the Laneway wordmark
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // Private client demo — keep it out of search engines.
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: "/images/brand/lw-mark.png", apple: "/images/brand/lw-mark.png" },
  openGraph: {
    siteName: site.name,
    locale: "en_AU",
    type: "website",
    images: ["/images/hero-library.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-loader is set by the inline loader script before hydration
    <html lang="en-AU" className={cn(inter.variable, fraunces.variable, "antialiased")} suppressHydrationWarning>
      <head>
        {/* Loader is self-contained: its CSS + script are inlined, independent of the main stylesheet */}
        <style dangerouslySetInnerHTML={{ __html: loaderStyles }} />
        <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
      </head>
      {/* overflow-x-clip: slide-in animations start off-screen; clip (not hidden) keeps sticky working */}
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <PageLoader />
        <MotionProvider>
          <SmoothScroll>
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
