'use client';

import { useState } from 'react';

export default function EmbedCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Copy failed');
    }
  }

  return (
    <div>
      <textarea
        readOnly
        value={code}
        className="w-full p-4 bg-gray-800 text-white rounded mt-2"
      />
      <button
        onClick={handleCopy}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {copied ? 'Copied!' : 'Copy Embed Code'}
      </button>
    </div>
  );
}
