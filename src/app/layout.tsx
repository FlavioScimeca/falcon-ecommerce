import Header from '@/components/Header/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import Providers from '@/redux/Providers';
import Cart from '@/components/Cart/Cart';
import Toast from '@/components/Toast/Toast';
import NextAuthProvider from '@/components/NextAuthProvider.tsx/NextAuthProvider';
import NextProgress from '@/components/NextProgress/NextProgress';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://falcon-ecommerce.vercel.app/'),
  title: {
    default: 'Falcon Shop',
    template: '%s | Falcon Shop',
  },
  description:
    'Falcon shop is a modern ecommerce where you can find and buy the most recent and ranked videogames on the globe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <body suppressHydrationWarning={true}>
        <Toast />
        <NextProgress />
        <Providers>
          <NextAuthProvider>
            <Cart />
            <Header />
            <main className=" bg-primary-gradient min-h-screen">
              {children}
            </main>
            <Footer />
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
