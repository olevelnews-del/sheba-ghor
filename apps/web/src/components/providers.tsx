'use client';

import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';

export function ShebaGhorProviders() {
  // Load autofill script on government sites only
  useEffect(() => {
    // This script is loaded when user navigates to NID site via our link
    const sgScript = document.createElement('script');
    sgScript.src = '/autofill.js';
    sgScript.async = true;
    document.body.appendChild(sgScript);
  }, []);

  return <Toaster position="bottom-center" richColors expand={false} />;
}
