'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckCircle2, FileText, MessageCircle } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path || pathname?.startsWith(path);
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-mobile mx-auto bg-white border-t border-gray-200 flex z-50 safe-area-bottom">
      <Link 
        href="/" 
        className={`flex-1 py-3 flex flex-col items-center justify-center gap-0.5 ${isActive('/') ? 'text-primary' : 'text-gray-400'}`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span className="text-xs font-semibold">হোম</span>
      </Link>
      <Link 
        href="/apply/nid" 
        className={`flex-1 py-3 flex flex-col items-center justify-center gap-0.5 ${isActive('/apply/nid') ? 'text-primary' : 'text-gray-400'}`}
      >
        <FileText size={22} />
        <span className="text-xs font-semibold">NID সংশোধন</span>
      </Link>
      <Link 
        href="/apply/namjari" 
        className={`flex-1 py-3 flex flex-col items-center justify-center gap-0.5 ${isActive('/apply/namjari') ? 'text-primary' : 'text-gray-400'}`}
      >
        <CheckCircle2 size={22} />
        <span className="text-xs font-semibold">নামজারি</span>
      </Link>
      <a 
        href="https://wa.me/8801616200174?text=Assalamu%20Alaikum%2C%20ami%20ShebaGhor%20theke%20help%20chantechi" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1 py-3 flex flex-col items-center justify-center gap-0.5 text-gray-400"
      >
        <MessageCircle size={22} />
        <span className="text-xs font-semibold">সহায্য</span>
      </a>
    </nav>
  );
}
