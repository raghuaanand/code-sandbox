import EmbedCodeBlock from '@/components/EmbedCodeBlock';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

type EmbedPageProps = {
  params: Promise<{ id: string }>
};

export default async function EmbedPage({ params }: EmbedPageProps) {
  const { id } = await params;
  const pen = await prisma.pen.findUnique({
    where: { id: parseInt(id) },
  });

  if (!pen) return notFound();

  const fullHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <style>${pen.css}</style>
    </head>
    <body>
      ${pen.html}
      <script>
        ${pen.js}
      </script>
    </body>
    </html>
  `;

  const iframeSrcDoc = `data:text/html;charset=utf-8,${encodeURIComponent(fullHTML)}`;

  const embedCode = `<iframe src="${iframeSrcDoc}" width="100%" height="600" frameborder="0" sandbox="allow-scripts allow-same-origin"></iframe>`;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Embed Pen #{pen.id}</h1>

      <div className="border rounded overflow-hidden h-[600px] mb-4">
        <iframe
          srcDoc={fullHTML}
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      <div>
        <p className="font-medium">Embed Code:</p>
        <EmbedCodeBlock code={embedCode} />
      </div>
    </main>
  );
}
