'use client';

import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [html, setHtml] = useState('<h1>Hello World</h1>');
  const [css, setCss] = useState('h1 { color: red; }');
  const [js, setJs] = useState('console.log("Hello JS");');
  const [previewHtml, setPreviewHtml] = useState('');
  const router = useRouter();

  const generateFullHTML = () => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <style>${css}</style>
    </head>
    <body>
      ${html}
      <script>${js}</script>
    </body>
    </html>
  `;

  async function handleSave() {
    const res = await fetch('/api/pens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html, css, js }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push(`/pen/${data.id}`);
    } else {
      alert(data.message || 'Failed to save');
    }
  }

  function handleRun() {
    setPreviewHtml(generateFullHTML());
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create a New Pen</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <p className="font-medium mb-1">HTML</p>
          <Editor height="200px" defaultLanguage="html" value={html} onChange={(v) => setHtml(v || '')} theme="vs-dark" />
        </div>
        <div>
          <p className="font-medium mb-1">CSS</p>
          <Editor height="200px" defaultLanguage="css" value={css} onChange={(v) => setCss(v || '')} theme="vs-dark" />
        </div>
        <div>
          <p className="font-medium mb-1">JS</p>
          <Editor height="200px" defaultLanguage="javascript" value={js} onChange={(v) => setJs(v || '')} theme="vs-dark" />
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={handleRun} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Run</button>
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Pen</button>
      </div>

      {previewHtml && (
        <div className="mt-4 border rounded overflow-hidden h-[500px]">
          <iframe srcDoc={previewHtml} className="w-full h-full" sandbox="allow-scripts allow-same-origin" />
        </div>
      )}
    </main>
  );
}
