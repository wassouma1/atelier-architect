import { Link, useParams } from "react-router-dom";
import { useStore } from "../data/store.jsx";
import TimelineItem from "../components/TimelineItem.jsx";

export default function ProjectDetail() {
  const { id } = useParams();
  const { projets } = useStore();
  const projet = projets.find((p) => p.id === id);

  if (!projet) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8">
        <p className="text-stone">Ce projet n'existe pas ou a été retiré.</p>
        <Link to="/" className="mt-4 inline-block text-blueprint underline">
          Retour aux projets
        </Link>
      </div>
    );
  }

  const galerie = [
    projet.couverture,
    ...projet.mises_a_jour.flatMap((m) => m.images || []),
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <Link to="/" className="font-mono text-xs uppercase tracking-wide text-blueprint">
        ← Tous les projets
      </Link>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-clay">
            {projet.categorie}
          </p>
          <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">
            {projet.titre}
          </h1>
          <p className="mt-1 text-stone">{projet.lieu}</p>
        </div>
        <span className="rounded-sm bg-ink px-3 py-1 font-mono text-xs uppercase tracking-wide text-paper">
          {projet.statut}
        </span>
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div className="md:sticky md:top-24 md:self-start">
          {galerie[0] && (
            <img
              src={galerie[0]}
              alt={projet.titre}
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
          )}
          {galerie.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {galerie.slice(1, 5).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="aspect-square w-full rounded-sm object-cover"
                />
              ))}
            </div>
          )}
          {projet.description && (
            <p className="mt-5 leading-relaxed text-ink-soft">
              {projet.description}
            </p>
          )}
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">Avancement du chantier</h2>
          {projet.mises_a_jour.length === 0 ? (
            <p className="mt-4 text-stone">
              Aucune mise à jour publiée pour le moment.
            </p>
          ) : (
            <div className="mt-6">
              {projet.mises_a_jour.map((maj, i) => (
                <TimelineItem
                  key={maj.id}
                  projetId={projet.id}
                  maj={maj}
                  dernier={i === projet.mises_a_jour.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
