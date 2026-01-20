import type {Metadata} from 'next';
import { cn } from "@/lib/utils";
import './globals.css';
import { Toaster } from "@/components/ui/sonner";
import AppProvider from '@/providers/app-provider';


export const metadata: Metadata = {
  title: 'Triciclos',
  description: 'Encuentra triciclos locales cerca de ti.',
    openGraph: {
        siteName: 'Triciclos',
        url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/`
    },
    keywords: [
        'triciclos', 'triciclos habana', 'viaje rapido', 'triciclos baratos', 'viaje barato', 'viaje rapido'
    ],
    icons: {
        icon: [
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
            { url: "/favicon-56x56.png", sizes: "56x56", type: "image/png" },
        ],
        apple: [
            { url: "/favicon-180x180.png", sizes: "180x180", type: "image/png" },
            { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
            { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
        ],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
          <Toaster richColors={true}/>
          <AppProvider>
            {children}
          </AppProvider>
      </body>
    </html>
  );
}
