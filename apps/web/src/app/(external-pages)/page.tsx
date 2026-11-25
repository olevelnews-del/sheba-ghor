'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FileText, CheckCircle2, Shield, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/bottom-nav';

export default function HomePage() {
  return (
    <div className="min-h-screen pb-20 bg-white">
      {/* Header */}
      <header className="sg-header">
        <h1 className="text-2xl font-bold tracking-tight">ShebaGhor</h1>
        <p className="text-sm opacity-90 mt-1" style={{ fontFamily: 'var(--font-hind)' }}>
          আগে চেক করবো, রিজেক্ট হতে দেবো না।
        </p>
      </header>

      {/* Hero */}
      <section className="sg-hero">
        <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3" style={{ fontFamily: 'var(--font-hind)' }}>
          NID ভুল? জমির নামজারি আটকে আছে?
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-hind)' }}>
          আগে আমরা চেক করে দেবো। রিজেক্ট হলে আগেই বলে দেবো।
        </p>
      </section>

      {/* Service Cards */}
      <section className="px-4 pb-4 space-y-3">
        {/* NID Card */}
        <Link href="/apply/nid" className="block">
          <div className="sg-card flex items-center justify-between p-4 border-l-4 border-l-[#0E7A3D]">
            <div>
              <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-hind)' }}>NID সংশোধন</h3>
              <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'var(--font-hind)' }}>
                ভুল নাম, ঠিকানা, জন্ম তারিখ সংশোধন
              </p>
              <p className="text-[#0E7A3D] font-bold text-sm mt-2" style={{ fontFamily: 'var(--font-hind)' }}>
                ফি: ৩০০ টাকা + সরকারি ফি
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#0E7A3D] text-white flex items-center justify-center flex-shrink-0 ml-3">
              <ArrowRight size={18} />
            </div>
          </div>
        </Link>

        {/* Namjari Card */}
        <Link href="/apply/namjari" className="block">
          <div className="sg-card flex items-center justify-between p-4 border-l-4 border-l-[#FFC107]">
            <div>
              <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-hind)' }}>জমির নামজারি</h3>
              <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'var(--font-hind)' }}>
                e-Namjari প্রস্তুতি ও মিলানো
              </p>
              <p className="text-[#B45309] font-bold text-sm mt-2" style={{ fontFamily: 'var(--font-hind)' }}>
                ফি: ১৫০০ টাকা + সরকারি ফি
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FFC107] text-gray-900 flex items-center justify-center flex-shrink-0 ml-3">
              <ArrowRight size={18} />
            </div>
          </div>
        </Link>
      </section>

      {/* How it works */}
      <section className="px-4 py-5 bg-gray-50">
        <h3 className="text-sm font-bold text-gray-900 mb-4 text-center" style={{ fontFamily: 'var(--font-hind)' }}>
          কীভাবে কাজ করে?
        </h3>
        <div className="flex justify-between gap-2">
          {[
            { step: '১', title: 'ডকুমেন্ট আপলোড', desc: 'ছবি তুলুন দিন' },
            { step: '২', title: 'মিলিয়ে দেখি', desc: 'ভুল থাকলে আগেই বলি' },
            { step: '৩', title: 'গাইডেড আবেদন', desc: 'সহজে সাবমিট করুন' },
          ].map((item) => (
            <div key={item.step} className="flex-1 text-center">
              <div className="w-9 h-9 rounded-full bg-[#0E7A3D] text-white flex items-center justify-center font-bold mx-auto mb-2 text-sm">
                {item.step}
              </div>
              <p className="font-semibold text-xs text-gray-900" style={{ fontFamily: 'var(--font-hind)' }}>{item.title}</p>
              <p className="text-[10px] text-gray-500 mt-0.5" style={{ fontFamily: 'var(--font-hind)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="px-4 py-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-[#0E7A3D] font-semibold text-sm" style={{ fontFamily: 'var(--font-hind)' }}>
            🔒 আপনার ডকুমেন্ট নিরাপদ। আমরা বিক্রি করি না।
          </p>
          <p className="text-gray-500 text-xs mt-1" style={{ fontFamily: 'var(--font-hind)' }}>
            সব তথ্য Encrypted এবং सुरক্ষित থাকবে।
          </p>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="px-4 pb-6">
        <a
          href="https://wa.me/8801616200174?text=Assalamu%20Alaikum%2C%20ami%20ShebaGhor%20theke%20help%20chantechi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full min-h-[48px] rounded-xl font-bold text-white"
          style={{ background: '#25D366', padding: '12px 24px', fontSize: '16px' }}
        >
          <MessageCircle size={20} />
          <span style={{ fontFamily: 'var(--font-hind)' }}>WhatsApp-e Help Chay</span>
        </a>
      </section>

      <BottomNav />
    </div>
  );
}
