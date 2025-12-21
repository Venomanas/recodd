//FETCH CONTACT REQUESTS (SERVER COMPONENT)
'use server'
import { supabase } from "@/lib/supabaseClient";
import AdminInboxClient from "@/app/components/AdminInboxClient";

export default async function AdminMessagesPage() {
  const { data, error } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-6 text-red-500">Failed to load messages</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Inbox</h1>

      {data.length === 0 && <p className="text-gray-500"> No messages yet.</p>
      }

      {data.map(msg => (
        <div
          key={msg.id}
          className={`rounded-xl border p-4 transition ${
            msg.is_read
              ? "border-zinc-800 bg-zinc-900"
              : "border-red-500/40 bg-zinc-900/80"
          }`}
        >
          <p className="text-sm text-gray-400">From: {msg.sender_email}</p>
          <p className="mt-3 text-gray-200">{msg.message}</p>
          <p className="mt-2 text-xs text-gray-500">
            {msg.profile_type} #{msg.profile_id}
          </p>

          <AdminInboxClient messages={data} />
        </div>
      ))}
    </div>
  );
}
