// app/pen/[id]/page.tsx (Server Component)
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PenPageWrapper from './PenPageWrapper';

type PenPageProps = { params: { id: string } };

export default async function PenPage({ params }: PenPageProps) {
  const id = parseInt(params.id, 10);
  const pen = await prisma.pen.findUnique({ where: { id } });
  if (!pen) return notFound();

  const fullHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head><style>${pen.css}</style></head>
      <body>
        ${pen.html}
        <script>
          // Disable right‑click
          document.addEventListener('contextmenu', e => e.preventDefault());
          // Block DevTools keys
          ${/* insert the forbidden-keys script here */''}
          // List of key combinations to block
const forbidden = [
  // F12
  { key: 'F12' },
  // Ctrl+Shift+I or Cmd+Option+I
  { ctrlKey: true, shiftKey: true, key: 'I' },
  { metaKey: true, altKey: true, key: 'I' },
  // Ctrl+U (view source)
  { ctrlKey: true, key: 'U' },
  // Ctrl+Shift+J or Cmd+Option+J (console)
  { ctrlKey: true, shiftKey: true, key: 'J' },
  { metaKey: true, altKey: true, key: 'J' },
];

document.addEventListener('keydown', e => {
  for (const combo of forbidden) {
    let match = e.key === combo.key;
    if (combo.ctrlKey) match = match && e.ctrlKey;
    if (combo.shiftKey) match = match && e.shiftKey;
    if (combo.altKey) match = match && e.altKey;
    if (combo.metaKey) match = match && e.metaKey;
    if (match) {
      e.preventDefault();
      return false;
    }
  }
});

        </script>
      </body>
    </html>
  `;

  return <PenPageWrapper srcDoc={fullHTML} />;
}
