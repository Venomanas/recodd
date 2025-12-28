// This tells Next.js NOT to pre-render this page at build time
export const dynamic = "force-dynamic";

import AdminInboxClient from "@/app/components/AdminInboxClient";
import { supabase } from "@/lib/supabaseClient";

export default async function AdminMessagesPage() {
  const { data: messages } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });

  // Safety: Pass "messages || []" to ensure it's never undefined
  return (
    <div className="py-10">
      <AdminInboxClient messages={messages || []} />
    </div>
  );
}
