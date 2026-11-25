'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Copy button wrapper
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  
  const copy = async (text: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${label || 'কপি'} — এখন পেস্ট করুন!`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('কপি করা যাচ্ছে না');
    }
  };
  
  return { copy, copied };
}

// File upload handler
export function useFileUpload(
  maxSizeKB: number = 5000,
  acceptedTypes: string = 'image/*'
) {
  const [files, setFiles] = useState<{ type: string; dataUrl: string; preview: string }[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const addFile = (type: string, file: File) => {
    const newSize = file.size / 1024;
    const newErrors: string[] = [...errors];
    
    if (newSize < 30) {
      newErrors.push(`${type}: ছবি খুব ছোট (${Math.round(newSize)}KB) — আবার তুলুন`);
    } else if (newSize > maxSizeKB) {
      newErrors.push(`${type}: ছবি বড় (${Math.round(newSize)}KB) — কম্প্রেস করে আবার আপলোড করুন`);
    } else {
      const idx = newErrors.indexOf(`$ {type}: ছবি খুব ছোট`);
      if (idx !== -1) newErrors.splice(idx, 1);
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setFiles(prev => [...prev.filter(f => f.type !== type), { type, dataUrl, preview: dataUrl }]);
    };
    reader.readAsDataURL(file);
    setErrors(newErrors);
  };

  const removeFile = (type: string) => {
    setFiles(prev => prev.filter(f => f.type !== type));
  };

  return { files, errors, addFile, removeFile, setErrors };
}

// Step progress tracker
export function useStepTracker(totalSteps: number, storageKey: string) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const data = JSON.parse(saved);
      setCurrentStep(data.currentStep || 0);
      setCompletedSteps(data.completedSteps || []);
    }
  }, [storageKey]);

  const markComplete = () => {
    const next = currentStep + 1;
    const updated = [...completedSteps];
    updated[currentStep] = true;
    localStorage.setItem(storageKey, JSON.stringify({ currentStep: next, completedSteps: updated }));
    setCurrentStep(next);
  };

  const goToStep = (step: number) => {
    const updated = [...completedSteps];
    for (let i = 0; i < step; i++) updated[i] = true;
    localStorage.setItem(storageKey, JSON.stringify({ currentStep: step, completedSteps: updated }));
    setCurrentStep(step);
  };

  const reset = () => {
    localStorage.removeItem(storageKey);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  return { currentStep, completedSteps, markComplete, goToStep, reset };
}
