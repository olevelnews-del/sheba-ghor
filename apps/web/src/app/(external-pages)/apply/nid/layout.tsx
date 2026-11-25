import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';

const hind = Hind_Siliguri({
  subsets: ['bangla'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
});

export const metadata: Metadata = {
  title: 'NID সংশোধন — ShebaGhor',
  description: 'NID Correction এর জন্য ডকুমেন্ট মিলিয়ে দেখুন, গাইডেড আবেদন করুন।',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`${hind.variable} min-h-screen bg-white`} style={{ fontFamily: 'var(--font-hind), sans-serif' }}>
      {children}
    </main>
  );
}
