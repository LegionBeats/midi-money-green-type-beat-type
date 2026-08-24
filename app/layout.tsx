import type { Metadata } from 'next';
import { Archivo, Instrument_Serif } from 'next/font/google';
import './globals.css';

/*
 * Self-hosted through next/font — no runtime request to Google. Archivo is a
 * variable face covering 400-900; weight 900 is load-bearing across the page.
 */
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

/* The only serif in the design, used on exactly one line. */
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MIDIMONEY — We turn producers into entrepreneurs',
  description:
    'Upload once. Video, beat store listing, checkout link in the description. 0% commission on every sale.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrumentSerif.variable}`}>
      <body>
        {/* Reveals are JS-driven; without it the page would render blank. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-statcopy]{opacity:1!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
