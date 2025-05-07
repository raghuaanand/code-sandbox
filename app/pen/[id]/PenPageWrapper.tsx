// app/pen/[id]/PenPageWrapper.tsx (Client Component)
'use client';
import { useEffect } from 'react';

export default function PenPageWrapper({ srcDoc }: { srcDoc: string }) {
  useEffect(() => {
    // Disable right‑click on parent page
    const onContext = (e: MouseEvent) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      // (Use same forbidden‑keys logic as above)
      if (['F12', 'I', 'J', 'U'].includes(e.key) && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', onContext);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('contextmenu', onContext);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Preview</h1>
      <div className="border rounded overflow-hidden h-[600px]">
        <iframe
          srcDoc={srcDoc}
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </main>
  );
}
