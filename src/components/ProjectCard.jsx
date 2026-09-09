import { Link } from "react-router-dom";

export default function ProjectCard({ projet }) {
  const derniereMaj = projet.mises_a_jour[0];

  return (
    <Link
      to={`/projets/${projet.id}`}
      className="group mb-6 block break-inside-avoid overflow-hidden rounded-sm border border-line bg-white/40 transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone/20">
        {projet.couverture && (
          <img
            src={projet.couverture}
            alt={projet.titre}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
        <span className="absolute left-3 top-3 rounded-sm bg-ink/80 px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-paper">
          {projet.statut}
        </span>
      </div>
      <div className="p-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-clay">
          {projet.categorie}
        </p>
        <h3 className="mt-1 font-display text-lg leading-snug text-ink">
          {projet.titre}
        </h3>
        <p className="mt-0.5 text-sm text-stone">{projet.lieu}</p>
        {derniereMaj && (
          <p className="mt-3 border-t border-line pt-2 font-mono text-xs text-blueprint">
            Dernière mise à jour · {derniereMaj.date}
          </p>
        )}
      </div>
    </Link>
  );
}
