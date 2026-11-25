'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FileText, MessageCircle, Shield, Border, Layout, CheckCircle2 } from 'lucide-react';
import { BottomNav } from '@/components/bottom-nav';

export default function NamjariPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    howGot: '', deedDag: '', khatianDag: '',
    deedAmount: '', khatianAmount: '', sellerName: '', khatianOwner: '',
  });
  const [documents, setDocuments] = useState({});

  const steps = [
    { id: 0, title: '১', completed: step > 0 },
    { id: 1, title: '২', completed: step > 1 },
    { id: 2, title: '৩', completed: step > 2 },
    { id: 3, title: '৪', completed: step > 3 },
  ];

  if (step === 0) {
    return (
      <div className="mobile-fullscreen">
        <h3 className="text-base font-bold mb-4 text-center" style={{ fontFamily: 'var(--font-hind)' }}>
          Step 1/4: জমি কিভাবে পেলেন?
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6" style={{ fontFamily: 'var(--font-hind)' }}>
          দলিলের সource নির্বাচন করুন
        </p>

        <div className="space-y-3">
          <div className="sg-radio-card" onClick={() => setFormData(prev => ({ ...prev, howGot: 'kinechi' }))}>
            <svg className="w-5 h-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15 7 18 7 15 12 12 15 9 15 6 15 3 12 2" />
            </svg>
            <span>কিনেছি</span>
          </div>
          <div className="sg-radio-card" onClick={() => setFormData(prev => ({ ...prev, howGot: 'worish' }))}>
            <svg className="w-5 h-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15 7 18 7 15 12 12 15 9 15 6 15 3 12 2" />
            </svg>
            <span>ওয়ারিশ</span>
          </div>
          <div className="sg-radio-card" onClick={() => setFormData(prev => ({ ...prev, howGot: 'daan' }))}>
            <svg className="w-5 h-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15 7 18 7 15 12 12 15 9 15 6 15 3 12 2" />
            </svg>
            <span>দান</span>
          </div>
          <div className="sg-radio-card" onClick={() => setFormData(prev => ({ ...prev, howGot: 'kort' }))}>
            <svg className="w-5 h-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15 7 18 7 15 12 12 15 9 15 6 15 3 12 2" />
            </svg>
            <span>কোর্ট</span>
          </div>
        </div>

        <button className="sg-btn-primary mt-6 w-full" onClick={() => setStep(1)} disabled={!formData.howGot}>
          Next
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="mobile-fullscreen">
        <h3 className="text-base font-bold mb-4 text-center" style={{ fontFamily: 'var(--font-hind)' }}>
          Step 2/4: ডকুমেন্ট আপলোড
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6" style={{ fontFamily: 'var(--font-hind)' }}>
          দ DOCUMENT নির্বাচন তথ্য অনুযায়ী
        </p>

        {formData.howGot === 'kinechi' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
                দলিল
              </label>
              <div className="sg-upload-area">
                <input type="file" accept="image/*" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
                খতিয়ান
              </label>
              <div className="sg-upload-area">
                <input type="file" accept="image/*" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
                দাখিলা
              </label>
              <div className="sg-upload-area">
                <input type="file" accept="image/*" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
                NID
              </label>
              <div className="sg-upload-area">
                <input type="file" accept="image/*" />
              </div>
            </div>
          </div>
        )}

        {formData.howGot === 'worish' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
                মৃত্যু সনদ
              </label>
              <div className="sg-upload-area">
                <input type="file" accept="image/*" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
                ওয়ারিশ সনদ
              </label>
              <div className="sg-upload-area">
                <input type="file" accept="image/*" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
                খতিয়ান
              </label>
              <div className="sg-upload-area">
                <input type="file" accept="image/*" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
                দাখিলা
              </label>
              <div className="sg-upload-area">
                <input type="file" accept="image/*" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
                NID
              </label>
              <div className="sg-upload-area">
                <input type="file" accept="image/*" />
              </div>
            </div>
          </div>
        )}

        <button className="sg-btn-primary mt-6 w-full" onClick={() => setStep(2)} disabled={!formData.howGot}>
          Next
        </button>
        <button className="sg-btn-outline mt-2 w-full" onClick={() => setStep(0)}>
          Prev
        </button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="mobile-fullscreen">
        <h3 className="text-base font-bold mb-4 text-center" style={{ fontFamily: 'var(--font-hind)' }}>
          Step 3/4: মিলিয়ে দেখি
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-hind)' }}>
              Deed Dag
            </label>
            <input type="text" placeholder="Deed Dag number" />
            <p className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-hind)' }}>
              If Deed Dag number doesn't match: Reject
            </p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-hind)' }}>
              Khatian Dag
            </label>
            <input type="text" placeholder="Khatian Dag number" />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-hind)' }}>
              Deed Amount
            </label>
            <input type="text" placeholder="Deed Amount" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-hind)' }}>
              Khatian Amount
            </label>
            <input type="text" placeholder="Khatian Amount" />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-hind)' }}>
              Seller Name
            </label>
            <input type="text" placeholder="Seller Name" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-hind)' }}>
              Khatian Owner
            </label>
            <input type="text" placeholder="Khatian Owner" />
          </div>
        </div>

        {/* Mismatch Checks */}
        {formData.deedDag && formData.khatianDag && formData.deedAmount && formData.khatianAmount && formData.sellerName && formData.khatianOwner && (
          <>
            <div className="sg-stop-box" id="dag-mismatch">
              <h4 className="font-bold text-[#D32F2F]" style={{ fontFamily: 'var(--font-hind)' }}>
                🔴 Dag মেলে না
              </h4>
              <p className="text-[#D32F2F]" style={{ fontFamily: 'var(--font-hind)' }}>
                Deed Dag vs Khatian Dag ভাঙা! আবেদন নಿಲ್ಲে।
              </p>
            </div>
            <div className="sg-stop-box" id="seller-mismatch" style="display:none;">
              <h4 className="font-bold text-[#D32F2F]" style={{ fontFamily: 'var(--font-hind)' }}>
                🔴 সেলার নাম মিলে না
              </h4>
              <p className="text-[#D32F2F]" style={{ fontFamily: 'var(--font-hind)' }}>
                Seller Name vs Khatian Owner chaînes ভাঙা!
              </p>
            </div>
            <div className="sg-ready-box" id="ready-box" style="display:none;">
              <h4 className="font-bold text-[#0E7A3D]" style={{ fontFamily: 'var(--font-hind)' }}>
                🟢 মেলে!
              </h4>
              <p className="text-[#0E7A3D]" style={{ fontFamily: 'var(--font-hind)' }}>
                সব মিলেছে! আবেদনের জন্য রেডি!
              </p>
            </div>
          </>
        )}

        <button className="sg-btn-primary mt-4 w-full" onClick={() => setStep(3)}>
          Review
        </button>
        <button className="sg-btn-outline mt-2 w-full" onClick={() => setStep(1)}>
          Prev
        </button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="mobile-fullscreen">
        <h3 className="text-base font-bold mb-4 text-center" style={{ fontFamily: 'var(--font-hind)' }}>
          Step 4/4: গাইডেড steps placeholder
        </h3>
        <p className="text-sm text-gray-600 text-center mb-4" style={{ fontFamily: 'var(--font-hind)' }}>
          Detailed steps placeholder for guided flow
        </p>

        <div className="bg-gray-50 p-4 rounded mb-4">
          <p className="text-gray-600 text-sm" style={{ fontFamily: 'var(--font-hind)' }}>
            bKash/Nagad TrxID + screenshot + land.gov.bd mutation guide
          </p>
        </div>

        <button className="sg-btn-primary mt-6 w-full">
          Complete
        </button>
        <button className="sg-btn-outline mt-2 w-full" onClick={() => setStep(2)}>
          Prev
        </button>
      </div>
    );
  }

  return null;
}