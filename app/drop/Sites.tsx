// The live websites Jeff runs or watches: one tap to each site's stats (huts.fi analytics,
// same dashboard as huts.fi itself) and its Google Search Console.
const SITES = [
  { host: "vuorikoskenmylly.com", name: "Vuorikosken Mylly" },
  { host: "3fulgear.fi", name: "3F UL Gear" },
  { host: "raippaluoto.fi", name: "Raippaluoto" },
  { host: "lapinkyla.fi", name: "Lapinkylä" },
];

const stats = (host: string) => `https://www.huts.fi/admin/analytics?site=${host}`;
const gsc = (host: string) =>
  `https://search.google.com/search-console?resource_id=${encodeURIComponent(`sc-domain:${host}`)}`;

export default function Sites({ title }: { title: string }) {
  const link = "rounded-full px-2.5 py-1 text-[13px] font-medium ring-1 ring-black/10 hover:ring-black/25";
  return (
    <section className="mt-6">
      <h2 className="mb-2 px-1 text-[13px] font-semibold uppercase tracking-wide text-[color:var(--d-ink3)]">{title}</h2>
      <ul className="divide-y divide-black/5 rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        {SITES.map((s) => (
          <li key={s.host} className="flex items-center justify-between gap-3 px-4 py-3">
            <a href={`https://${s.host}`} target="_blank" rel="noreferrer" translate="no" className="min-w-0 truncate text-[15px] font-semibold hover:underline">
              {s.name}
            </a>
            <span className="flex shrink-0 gap-1.5">
              <a href={stats(s.host)} target="_blank" rel="noreferrer" className={link}>Stats</a>
              <a href={gsc(s.host)} target="_blank" rel="noreferrer" className={link}>Search</a>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
