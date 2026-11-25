'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle2, FileText, MessageCircle, AlertCircle, Shield } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/use-shebaghor';
import { useFileUpload } from '@/hooks/use-shebaghor';
import { BottomNav } from '@/components/bottom-nav';

export default function NidCorrectionPage() {
  const [step, setStep] = useState(0);
  const [stepErrors, setStepErrors] = useState({});
  const [formData, setFormData] = useState({
    errorType: '',
    nidName: '', sscName: '', nidDob: '', sscDob: '',
    babarNid: '', babarSsc: '', mayyerNid: '', mayyerSsc: '',
    thikanaNid: '', thikanaSsc: '', correctName: '',
  });
  const [documents, setDocuments] = useState({});
  const { loadFromStorage, saveToStorage } = '@/lib/shebaghor';

  const { copy, copied } = useCopyToClipboard();
  const { addFile, removeFile, files, errors, setErrors } = useFileUpload();

  // Initialize from localStorage on first load
  useEffect(() => {
    const saved = loadFromStorage('shebaghor_nid_data');
    if (saved) setFormData(saved);
  }, []);

  useEffect(() => {
    saveToStorage('shebaghor_nid_data', formData);
  }, [formData]);

  const steps = [
    { id: 0, title: 'কি ভুল?', completed: step > 0 },
    { id: 1, title: 'Upload', completed: step > 1 },
    { id: 2, title: 'গাইডেড আবেদন', completed: step > 2 },
  ];

  const nextStep = () => setStep(s + 1);
  const prevStep = () => setStep(s - 1);

  // Part A: Preparation + Mismatch Check
  if (step === 0) {
    return (
      <div className="mobile-fullscreen">
        <h3 className="text-base font-bold mb-4 text-center" style={{ fontFamily: 'var(--font-hind)' }}>
          Step 1/3: কি ভুল?
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6" style={{ fontFamily: 'var(--font-hind)' }}>
          NID Name ও SSC Name মিলান করুন।
        </p>

        <div className="space-y-3">
          <div className="sg-radio-card" onClick={() => setFormData(prev => ({ ...prev, errorType: 'naam' }))}>
            <svg className="w-5 h-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
            <span>নাম ভুল</span>
          </div>
          <div className="sg-radio-card" onClick={() => setFormData(prev => ({ ...prev, errorType: 'babar_naam' }))}>
            <svg className="w-5 h-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
            <span>বাবার নাম ভুল</span>
          </div>
          <div className="sg-radio-card" onClick={() => setFormData(prev => ({ ...prev, errorType: 'mayyer_naam' }))}>
            <svg className="w-5 h-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
            <span>মায়ের নাম ভুল</span>
          </div>
          <div className="sg-radio-card" onClick={() => setFormData(prev => ({ ...prev, errorType: 'jonmo_tarikh' }))}>
            <svg className="w-5 h-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
            <span>জন্ম তারিখ ভুল</span>
          </div>
          <div className="sg-radio-card" onClick={() => setFormData(prev => ({ ...prev, errorType: 'thikana' }))}>
            <svg className="w-5 h-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
            <span>ঠিকানা ভুল</span>
          </div>
        </div>

        <button className="sg-btn-primary mt-6" onClick={() => setStep(1)} disabled={!formData.errorType}>
          Next
        </button>
      </div>
    );
  }

  // Step 2: Upload
  if (step === 1) {
    return (
      <div className="mobile-fullscreen">
        <h3 className="text-base font-bold mb-4 text-center" style={{ fontFamily: 'var(--font-hind)' }}>
          Step 2/3: Upload
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6" style={{ fontFamily: 'var(--font-hind)' }}>
          NID Front, NID Back, SSC Certificate, Birth Registration (optional)
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
              NID Front
            </label>
            <div className="sg-upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) addFile('nid-front', file);
                }}
              />
              <p className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-hind)' }}>
                Max 30KB ছবি ঘোলার জন্য আবার তুলুন
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
              NID Back
            </label>
            <div className="sg-upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) addFile('nid-back', file);
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
              SSC Certificate
            </label>
            <div className="sg-upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) addFile('ssc', file);
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
              Birth Registration (optional)
            </label>
            <div className="sg-upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) addFile('birth', file);
                }}
              />
            </div>
          </div>
        </div>

        {errors.nid_front && <p className="text-red-600 text-sm text-center" style={{ fontFamily: 'var(--font-hind)' }}>{errors.nid_front}</p>}
        {errors.nid_back && <p className="text-red-600 text-sm text-center" style={{ fontFamily: 'var(--font-hind)' }}>{errors.nid_back}</p>}
        {errors.ssc && <p className="text-red-600 text-sm text-center" style={{ fontFamily: 'var(--font-hind)' }}>{errors.ssc}</p>}

        <button className="sg-btn-primary mt-6" onClick={() => setStep(2)} disabled={!Object.keys(documents).length}>
          Next
        </button>
        <button className="sg-btn-outline mt-2" onClick={() => setStep(0)}>
          Prev
        </button>
      </div>
    );
  }

  // Step 3: Mismatch Check + Form Data
  if (step === 2) {
    const { errorType, nidName, sscName, nidDob, sscDob } = formData;
    const nameMatch = nidName.trim().toLowerCase() === sscName.trim().toLowerCase();
    const dobMatch = nidDob.trim() === sscDob.trim();

    // Red/Green boxes
    let statusBox = null;
    if (!nameMatch) {
      statusBox = (
        <div className="sg-stop-box">
          <h4 className="font-bold text-[#D32F2F]" style={{ fontFamily: 'var(--font-hind)' }}>
            STOP - রিজেক্ট হবে!
          </h4>
          <p className="text-[#D32F2F]" style={{ fontFamily: 'var(--font-hind)' }}>
            NID Name: {nidName || '—'} vs SSC Name: {sscName || '—'}<br />
            SSC কে সঠিক ধরে। এখন আবেদন করবেন না।
          </p>
        </div>
      );
    } else if (!dobMatch) {
      statusBox = (
        <div className="sg-stop-box">
          <h4 className="font-bold text-[#D32F2F]" style={{ fontFamily: 'var(--font-hind)' }}>
            STOP - রিজেক্ট হবে!
          </h4>
          <p className="text-[#D32F2F]" style={{ fontFamily: 'var(--font-hind)' }}>
            NID DOB: {nidDob || '—'} vs SSC DOB: {sscDob || '—'}<br />
            SSC কে সঠিক ধরে। এখন আবেদন করবেন না।
          </p>
        </div>
      );
    } else {
      statusBox = (
        <div className="sg-ready-box">
          <h4 className="font-bold text-[#0E7A3D]" style={{ fontFamily: 'var(--font-hind)' }}>
            সব মিলেছে!
          </h4>
          <p className="text-[#0E7A3D]" style={{ fontFamily: 'var(--font-hind)' }}>
            আবেদনের জন্য রেডি!
          </p>
        </div>
      );
    }

    return (
      <div className="mobile-fullscreen">
        <h3 className="text-base font-bold mb-4 text-center" style={{ fontFamily: 'var(--font-hind)' }}>
          Step 3/3: মিলিয়ে দেখি
        </h3>

        {statusBox}

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-hind)' }}>
              NID Name (English)
            </label>
            <input
              value={nidName || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, nidName: e.target.value }))}
              placeholder="e.g. MD KAMAL HOSSAIN"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-hind)' }}>
              SSC Name (English)
            </label>
            <input
              value={sscName || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, sscName: e.target.value }))}
              placeholder="e.g. MD KAMAL HOSSAIN"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-hind)' }}>
              NID DOB
            </label>
            <input
              type="date"
              value={nidDob || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, nidDob: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-hind)' }}>
              SSC DOB
            </label>
            <input
              type="date"
              value={sscDob || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, sscDob: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-hind)' }}>
              Correct Name Wanted
            </label>
            <input
              value={formData.correctName || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, correctName: e.target.value }))}
              placeholder="যেমন: MD KAMAL HOSSAIN"
            />
          </div>

          {files.nid-front && files.nid-back && files.ssc && (
            <div>
              <h4 className="font-medium mb-2" style={{ fontFamily: 'var(--font-hind)' }}>Document Preview</h4>
              <div className="grid grid-cols-2 gap-2">
                {files.nid-front && <img src={files.nid-front.dataUrl} alt="NID Front" className="h-24 w-24 object-cover rounded" />}
                {files.nid-back && <img src={files.nid-back.dataUrl} alt="NID Back" className="h-24 w-24 object-cover rounded" />}
                {files.ssc && <img src={files.ssc.dataUrl} alt="SSC" className="h-24 w-24 object-cover rounded" />}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <button className="sg-btn-primary flex-1" onClick={() => setStep(2)}>
              Save & Continue
            </button>
            <button className="sg-btn-outline flex-1" onClick={() => setStep(1)}>
              Prev
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return null;
}