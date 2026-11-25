'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Shield, MessageCircle, CheckCircle, DocumentText, Clock, History, Users } from 'lucide-react';
import { BottomNav } from '@/components/bottom-nav';

export default function MyApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { supabase } = '@/lib/shebaghor';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        supabase
          .from('applications')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .then(({ data }) => setApps(data));
      }
      setLoading(false);
    });
  }, [supabase]);

  return (
    <div className="min-h-screen pb-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <h2 className="text-xl font-bold mb-4 text-center" style={{ fontFamily: 'var(--font-hind)' }}>
          আমার অ্যাপ্লিকেশন
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center" style={{ fontFamily: 'var(--font-hind)' }}>
            লোড হচ্ছে...
          </p>
        ) : apps.length === 0 ? (
          <p className="text-gray-500 text-center" style={{ fontFamily: 'var(--font-hind)' }}>
            এখন এ্যাপ্লিকেশন নেই। শুরু করুন।
          </p>
        ) : (
          <>
            <div className="space-y-3">
              {apps.map((app) => (
                <div key={app.id} className="sg-card p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium" style={{ fontFamily: 'var(--font-hind)' }}>
                        {app.app_id || 'ID not set'}
                      </h4>
                      <p className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-hind)' }}>
                        {app.service_type === 'nid_correction' ? 'NID Correction' : 'Land Mutation'}
                      </p>
                    </div>
                    <span className="status-badge sg-nav-item active" style={{ fontFamily: 'var(--font-hind)' }}>
                      {app.status || 'draft'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'var(--font-hind)' }}>
                    stepped: {app.current_step || 0}/6
                  </p>

                  <div className="mt-2 flex gap-2">
                    <Link href={`/detail/${app.id}`} className="flex-1 py-2 px-3 text-sm rounded bg-primary text-white">
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-3 text-center" style={{ fontFamily: 'var(--font-hind)' }}>
                Welcome back! Continuing from where you left off.
              </h4>
              <p className="text-center text-sm text-gray-500" style={{ fontFamily: 'var(--font-hind)' }}>
                Last step: {Math.max(...apps.map(a => a.current_step || 0))}
              </p>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}