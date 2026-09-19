import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://kalla-bala.vercel.app'),
  title: {
    default: 'كَلَّا وَبَلَى — الوقف والابتداء خطوة بخطوة',
    template: '%s | كَلَّا وَبَلَى',
  },
  description: 'دليل عملي وتطبيقي لفهم الوقف والابتداء في 55 موضعًا من القرآن الكريم لكلمتي كَلَّا وبَلَى، وفق تحرير الشيخ توفيق النحاس.',
  keywords: ['القرآن الكريم', 'تجويد', 'وقف وابتداء', 'كلا', 'بلى', 'توفيق النحاس', 'علوم القرآن', 'وقف', 'وصل'],
  authors: [
    { name: 'الشيخ علي بن محمد توفيق النحاس' },
    { name: 'Salah Eddine Ahmed Abousoulaymane', url: 'https://github.com/novaskilltech' },
  ],
  creator: 'Salah Eddine Ahmed Abousoulaymane (novaskilltech)',
  publisher: 'novaskilltech',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'كَلَّا وَبَلَى — الوقف والابتداء خطوة بخطوة',
    description: 'تعلّم متى تقف ومتى تصل في 55 موضعًا قرآنيًا مع شروح وبطاقات واختبارات تفاعلية وفق تحرير الشيخ توفيق النحاس.',
    url: 'https://kalla-bala.vercel.app',
    siteName: 'كَلَّا وَبَلَى',
    locale: 'ar_AR',
    type: 'website',
    images: [
      {
        url: 'https://kalla-bala.vercel.app/og.png',
        width: 1200,
        height: 630,
        alt: 'كَلَّا وَبَلَى — الوقف والابتداء خطوة بخطوة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'كَلَّا وَبَلَى — الوقف والابتداء خطوة بخطوة',
    description: 'دليل عملي وتطبيقي لفهم الوقف والابتداء في 55 موضعًا من القرآن الكريم لكلمتي كَلَّا وبَلَى.',
    site: '@novaskilltech',
    creator: '@novaskilltech',
    images: ['https://kalla-bala.vercel.app/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#fbf9f4] dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 transition-colors selection:bg-emerald-500 selection:text-white">
        <I18nProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
