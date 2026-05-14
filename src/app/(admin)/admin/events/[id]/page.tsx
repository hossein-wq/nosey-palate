import type { Metadata } from "next";

export const metadata: Metadata = { title: "Event Detail - Admin" };

export default async function AdminEventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <h1 className="font-display text-4xl text-ivory">Event {id}</h1>
      <div className="mt-10 glass rounded-md p-8">
        <p className="text-ivory/60">Event editing will be implemented in Phase 5.</p>
      </div>
    </div>
  );
}
