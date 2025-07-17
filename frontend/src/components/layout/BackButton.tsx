"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const [depth, setDepth] = useState<number | null>(null);

  useEffect(() => {
    const depthValue = pathname.split('/').filter(Boolean).length;
    setDepth(depthValue);
  }, [pathname]);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  if (depth === null || depth <= 1) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 border border-blue-300 rounded-xl hover:bg-blue-100 transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Indietro
      </button>
    </div>
  );
}
