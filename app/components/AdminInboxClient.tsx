"use client";

type Message = {
  id: string;
  sender_email: string;
  message: string;
  profile_id: number;
  profile_type: string;
  is_read: boolean;
  created_at: string;
};

export default function AdminInboxClient({
  messages,
}: {
  messages: Message[];
}) {
  return (
    <div className="space-y-4">
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`rounded-xl border p-4 ${
            msg.is_read
              ? "border-zinc-800 bg-zinc-900"
              : "border-red-500/40 bg-zinc-900/80"
          }`}
        >
          <div className="flex justify-between text-sm text-gray-400">
            <span>{msg.sender_email}</span>
            <span>{new Date(msg.created_at).toLocaleString()}</span>
          </div>

          <p className="mt-3 text-gray-200">{msg.message}</p>

          <p className="mt-2 text-xs text-gray-500">
            {msg.profile_type} #{msg.profile_id}
          </p>

          {!msg.is_read && (
            <button
              className="mt-3 text-xs text-red-400 hover:underline"
              onClick={async () => {
                await fetch("/api/admin/messages/read", {
                  method: "POST",
                  body: JSON.stringify({ id: msg.id }),
                });
                location.reload();
              }}
            >
              Mark as read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
