import { useMemo, useState } from "react";
import { useStore } from "../data/store.jsx";
import ProjectCard from "../components/ProjectCard.jsx";

function toutesLesMisesAJour(projets) {
  return projets
    .flatMap((p) => p.mises_a_jour.map((m) => ({ ...m, projet: p })))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function Home() {
  const { projets } = useStore();
  const [filtre, setFiltre] = useState("Tous");
  const [derniere] = toutesLesMisesAJour(projets);

  const categories = useMemo(
    () => ["Tous", ...new Set(projets.map((p) => p.categorie).filter(Boolean))],
    [projets]
  );

  const projetsFiltres =
    filtre === "Tous" ? projets : projets.filter((p) => p.categorie === filtre);

  const totalMisesAJour = projets.reduce(
    (n, p) => n + p.mises_a_jour.length,
    0
  );
  const enChantier = projets.filter((p) => p.statut === "En chantier").length;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="blueprint-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p className="animate-rise-1 font-mono text-xs uppercase tracking-wide text-blueprint">
              Architecture · Tunis &amp; à distance
            </p>
            <h1 className="animate-rise-2 mt-4 font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
              Le chantier avance,
              <br />
              même à des milliers de kilomètres.
            </h1>

            <svg
              viewBox="0 0 340 20"
              className="mt-3 h-4 w-64 animate-rise-3"
              aria-hidden="true"
            >
              <path
                d="M2 14 C 60 4, 100 18, 160 10 S 260 2, 338 12"
                fill="none"
                stroke="var(--color-clay)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="signature-line"
              />
            </svg>

            <p className="animate-rise-3 mt-3 max-w-md text-ink-soft">
              Chaque étape de projet, ses photos et ses ajustements de plan,
              partagés en un seul lien — pour le client, les artisans, et
              quiconque suit le chantier.
            </p>
            <a
              href="#projets"
              className="animate-rise-4 mt-8 inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-3 text-sm text-paper transition-colors hover:bg-blueprint"
            >
              Voir les projets
            </a>

            <dl className="animate-rise-4 mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6 sm:max-w-md">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-stone">
                  Projets
                </dt>
                <dd className="font-display text-3xl text-ink">{projets.length}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-stone">
                  En chantier
                </dt>
                <dd className="font-display text-3xl text-blueprint">{enChantier}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-stone">
                  Mises à jour
                </dt>
                <dd className="font-display text-3xl text-clay">{totalMisesAJour}</dd>
              </div>
            </dl>
          </div>

          {derniere && (
            <div className="animate-rise-3 border border-line bg-white/50 p-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-blueprint">
                Dernière mise à jour
              </p>
              {derniere.images?.[0] && (
                <img
                  src={derniere.images[0]}
                  alt=""
                  className="mt-3 aspect-[4/3] w-full object-cover"
                />
              )}
              <p className="mt-3 font-display text-lg text-ink">
                {derniere.titre}
              </p>
              <p className="mt-1 text-sm text-stone">
                {derniere.projet.titre} · {derniere.date}
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="projets" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-ink">Projets</h2>
            <p className="mt-1 text-stone">
              Portfolio public — cliquez sur un projet pour suivre son avancement.
            </p>
          </div>
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFiltre(c)}
                  className={`rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                    filtre === c
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-ink-soft hover:border-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {projetsFiltres.length === 0 ? (
          <p className="mt-10 text-stone">Aucun projet dans cette catégorie.</p>
        ) : (
          <div className="mt-8 columns-1 sm:columns-2 md:columns-3 [column-gap:1.5rem]">
            {projetsFiltres.map((p) => (
              <ProjectCard key={p.id} projet={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
