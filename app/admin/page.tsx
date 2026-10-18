import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "RSVP Admin | Tobi & Seyi",
  robots: { index: false, follow: false },
};

type Rsvp = {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
};

export default async function AdminPage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("wedding_rsvps")
    .select("id, full_name, email, created_at")
    .order("created_at", { ascending: false });

  const rsvps = (data ?? []) as Rsvp[];

  return (
    <main className="admin-page">
      <header className="admin-header">
        <a href="/" className="wordmark" aria-label="Tobi and Seyi home">
          T <span>&</span> S
        </a>
        <span className="admin-kicker">Private RSVP list</span>
      </header>

      <section className="admin-content" aria-labelledby="admin-title">
        <div className="admin-heading">
          <p className="eyebrow sage">Wedding attendance</p>
          <h1 id="admin-title">
            Those joining
            <br />
            <em>our celebration.</em>
          </h1>
          <p className="admin-count">
            {rsvps.length} {rsvps.length === 1 ? "guest has" : "guests have"}{" "}
            RSVP&apos;d
          </p>
        </div>

        {error ? (
          <div className="admin-state admin-error" role="alert">
            The RSVP list could not be loaded. Please try again.
          </div>
        ) : rsvps.length === 0 ? (
          <div className="admin-state">No RSVPs yet.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <caption className="sr-only">Wedding RSVP guest list</caption>
              <thead>
                <tr>
                  <th scope="col">Guest</th>
                  <th scope="col">Email</th>
                  <th scope="col">Received</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((rsvp) => (
                  <tr key={rsvp.id}>
                    <td>{rsvp.full_name}</td>
                    <td>
                      <a href={`mailto:${rsvp.email}`}>{rsvp.email}</a>
                    </td>
                    <td>
                      {new Intl.DateTimeFormat("en", {
                        dateStyle: "medium",
                      }).format(new Date(rsvp.created_at))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
