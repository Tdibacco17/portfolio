'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

export default function CopyToClipboard({ email, labels, copyIcon, successIcon }: {
  email: string;
  labels: { copy: string; success: string; error: string };
  copyIcon: ReactNode;
  successIcon: ReactNode;
}) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(false);
  const copying = useRef(false);
  const statusId = useId();

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; clearTimeout(timeout.current); };
  }, []);

  async function copy() {
    if (copying.current) return;
    copying.current = true;
    clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(email);
      if (mounted.current) {
        setStatus('success');
        timeout.current = setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      if (mounted.current) setStatus('error');
    } finally {
      copying.current = false;
    }
  }

  return (
    <div className="relative sm:w-44 w-full">
      <button type="button" onClick={copy} aria-describedby={status === 'error' ? statusId : undefined}
        className="cursor-pointer w-full h-10 text-lightSecondary flex items-center justify-center gap-2 py-2 px-4 rounded-custom border-solid border-[1px] bg-darkPrimary border-darkPrimary font-bold hover:bg-darkPrimaryHover">
        {status === 'success' ? labels.success : labels.copy}
        {status === 'success' ? successIcon : copyIcon}
      </button>
      <p id={statusId} role="status" aria-atomic="true"
        className={status === 'error' ? 'absolute top-full right-0 mt-2 w-64 text-sm text-lightPrimary' : 'sr-only'}>
        {status === 'error' ? labels.error : status === 'success' ? labels.success : ''}
      </p>
    </div>
  );
}
