import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect('/api/auth/signin');

  const pens = await prisma.pen.findMany({
    where: {
      user: {
        email: session.user.email!,
      },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Pens</h1>
      {pens.length === 0 ? (
        <p>No pens yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pens.map((pen) => (
            <div key={pen.id} className="p-4 border rounded bg-gray-100">
              <h2 className="text-lg font-semibold">Pen #{pen.id}</h2>
              <p className="text-sm text-gray-600">
                {pen.isPublic ? '🌍 Public' : '🔒 Private'}
              </p>
              <div className="mt-2 flex gap-2">
                <Link href={`/pen/${pen.id}`} className="text-blue-600 hover:underline">
                  View
                </Link>
                <Link href={`/pen/${pen.id}/embed`} className="text-green-600 hover:underline">
                  Embed
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
