import { createBrowserClient } from '@supabase/ssr';

export function createClient(): ReturnType<typeof createBrowserClient> {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export const saveToStorage = (key: string, data: unknown) => {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
};

export const loadFromStorage = <T = unknown>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch { return null; }
};

export const generateAppId = (prefix: string) => {
  return `${prefix}-${Math.floor(Math.random() * 9000) + 1000}`;
};

export const formatTimeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'এইমাত্র';
  if (mins < 60) return `${mins} মিনিট আগে`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} ঘন্টা আগে`;
  const days = Math.floor(hrs / 24);
  return `${days} দিন আগে`;
};

export const STATUS_LABELS: Record<string, string> = {
  draft: 'ড্রাফট',
  checking: 'চেক হচ্ছে',
  ready: 'রেডি',
  submitted: 'সাবমিট হয়েছে',
  rejected: 'রিজেক্ট',
  approved: 'অনুমোদিত',
};

export const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  checking: 'bg-orange-100 text-orange-700',
  ready: 'bg-green-100 text-green-700',
  submitted: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  approved: 'bg-green-200 text-green-800',
};
