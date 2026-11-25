import type { Metadata } from 'next';
import '@/styles/globals.css';
import { DynamicLayoutProviders } from './DynamicLayoutProviders';
import { ClientLayout } from './ClientLayout';
import { ShebaGhorProviders } from '@/components/providers';

export const metadata: Metadata = {
  title: {
    default: 'ShebaGhor - আগে চেক করবো, রিজেক্ট হতে দেবো না',
    template: '%s · ShebaGhor',
  },
  description: 'NID Correction ও Land Mutation এর জন্য প্রস্তুতি ও গাইডলাইন। ডকুমেন্ট মিলিয়ে দেখি, তারপর আবেদন করুন।',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" suppressHydrationWarning>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    </head>
    <body className="bg-white">
        <ShebaGhorProviders />
        <DynamicLayoutProviders>
          <ClientLayout>{children}</ClientLayout>
        </DynamicLayoutProviders>
      </body>
    </html>
  );
}
