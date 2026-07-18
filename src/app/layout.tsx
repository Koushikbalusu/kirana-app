import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kirana Commerce",
  description:
    "Digital ordering and delivery management for your neighborhood kirana store.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Applies the persisted theme before hydration to avoid a flash of the
// wrong theme. Defaults to light -- only adds the `dark` class if the
// user has explicitly chosen dark before (matches the Zustand `kirana-ui`
// persist store's storage shape in src/stores/uiStore.ts).
const themeInitScript = `
(function () {
  try {
    var raw = localStorage.getItem('kirana-ui');
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && parsed.state && parsed.state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider />
        {children}
      </body>
    </html>
  );
}
