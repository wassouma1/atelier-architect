import { useState } from "react";
import { useStore } from "../data/store.jsx";

export default function TimelineItem({ projetId, maj, dernier }) {
  const { ajouterCommentaire } = useStore();
  const [nom, setNom] = useState("");
  const [texte, setTexte] = useState("");
  const [envoye, setEnvoye] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const envoyer = (e) => {
    e.preventDefault();
    if (!texte.trim()) return;
    ajouterCommentaire(projetId, maj.id, {
      nom: nom.trim() || "Visiteur",
      texte: texte.trim(),
    });
    setTexte("");
    setNom("");
    setEnvoye(true);
    setTimeout(() => setEnvoye(false), 2500);
  };

  return (
    <div className="relative pb-12 pl-8">
      {!dernier && (
        <span className="absolute left-[5px] top-3 h-full w-px bg-line" aria-hidden="true" />
      )}
      <span
        className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-blueprint bg-paper"
        aria-hidden="true"
      />
      <p className="font-mono text-xs uppercase tracking-wide text-blueprint">
        {maj.date}
      </p>
      <h3 className="mt-1 font-display text-xl text-ink">{maj.titre}</h3>
      {maj.texte && (
        <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{maj.texte}</p>
      )}

      {maj.images?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {maj.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(src)}
              className="h-28 w-28 overflow-hidden rounded-sm border border-line sm:h-36 sm:w-36"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {maj.commentaires?.length > 0 && (
        <ul className="mt-4 max-w-2xl space-y-3">
          {maj.commentaires.map((c) => (
            <li key={c.id} className="rounded-sm border border-line bg-white/50 p-3">
              <p className="font-mono text-xs text-stone">
                {c.nom} · {c.date}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{c.texte}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={envoyer} className="mt-4 max-w-2xl space-y-2">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Votre nom"
            className="w-full rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint sm:w-40"
          />
          <input
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            placeholder="Laisser une remarque sur cette étape…"
            className="w-full flex-1 rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint"
          />
          <button
            type="submit"
            className="shrink-0 rounded-sm bg-blueprint px-4 py-2 text-sm text-paper transition-colors hover:bg-blueprint-light"
          >
            Envoyer
          </button>
        </div>
        {envoye && (
          <p className="text-xs text-blueprint">Remarque envoyée à l'architecte.</p>
        )}
      </form>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-6"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="max-h-full max-w-full rounded-sm object-contain"
          />
        </div>
      )}
    </div>
  );
}
