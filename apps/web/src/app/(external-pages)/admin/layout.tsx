import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';

const hind = Hind_Siliguri({
  subsets: ['bangla'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
});

export const metadata: Metadata = {
  title: 'Admin Dashboard — ShebaGhor',
  description: 'Admin panel for managing applications',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`${hind.variable} min-h-screen bg-white`} style={{ fontFamily: 'var(--font-hind), sans-serif' }}>
      <div className="max-w-2xl mx-auto px-4 pb-8">
        {children}
      </div>
    </main>
  );
}