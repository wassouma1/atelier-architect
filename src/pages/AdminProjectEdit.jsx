import { useRef, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useStore } from "../data/store.jsx";
import { lireImages } from "../data/files.js";
import { STATUTS, CATEGORIES } from "../data/constants.js";

export default function AdminProjectEdit() {
  const { id } = useParams();
  const { projets, modifierProjet, ajouterMiseAJour, supprimerMiseAJour } =
    useStore();
  const projet = projets.find((p) => p.id === id);

  const [infos, setInfos] = useState(
    projet
      ? {
          titre: projet.titre,
          lieu: projet.lieu,
          client: projet.client,
          statut: projet.statut,
          categorie: projet.categorie || CATEGORIES[0],
          description: projet.description,
        }
      : null
  );
  const [maj, setMaj] = useState({ titre: "", texte: "", images: [] });
  const coverInputRef = useRef(null);
  const majInputRef = useRef(null);
  const [enregistre, setEnregistre] = useState(false);

  if (!projet || !infos) return <Navigate to="/admin" replace />;

  const enregistrerInfos = (e) => {
    e.preventDefault();
    modifierProjet(id, infos);
    setEnregistre(true);
    setTimeout(() => setEnregistre(false), 2000);
  };

  const changerCouverture = async (e) => {
    const [src] = await lireImages(e.target.files);
    if (src) modifierProjet(id, { couverture: src });
  };

  const changerImagesMaj = async (e) => {
    const images = await lireImages(e.target.files);
    setMaj((m) => ({ ...m, images }));
  };

  const publierMaj = (e) => {
    e.preventDefault();
    if (!maj.titre.trim()) return;
    ajouterMiseAJour(id, maj);
    setMaj({ titre: "", texte: "", images: [] });
    if (majInputRef.current) majInputRef.current.value = "";
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <Link to="/admin" className="font-mono text-xs uppercase tracking-wide text-blueprint">
        ← Tableau de bord
      </Link>

      <h1 className="mt-4 font-display text-2xl text-ink">{projet.titre}</h1>
      <p className="text-sm text-stone">
        Lien public à partager avec le client et les artisans :{" "}
        <Link to={`/projets/${id}`} className="text-blueprint underline">
          /projets/{id}
        </Link>
      </p>

      <section className="mt-8 border border-line bg-white/50 p-5">
        <h2 className="font-display text-lg text-ink">Informations du projet</h2>
        <form onSubmit={enregistrerInfos} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={infos.titre}
            onChange={(e) => setInfos({ ...infos, titre: e.target.value })}
            placeholder="Nom du projet"
            className="rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint"
          />
          <input
            value={infos.lieu}
            onChange={(e) => setInfos({ ...infos, lieu: e.target.value })}
            placeholder="Lieu"
            className="rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint"
          />
          <input
            value={infos.client}
            onChange={(e) => setInfos({ ...infos, client: e.target.value })}
            placeholder="Client"
            className="rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint"
          />
          <select
            value={infos.statut}
            onChange={(e) => setInfos({ ...infos, statut: e.target.value })}
            className="rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint"
          >
            {STATUTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={infos.categorie}
            onChange={(e) => setInfos({ ...infos, categorie: e.target.value })}
            className="rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <textarea
            value={infos.description}
            onChange={(e) => setInfos({ ...infos, description: e.target.value })}
            placeholder="Description du projet"
            rows={3}
            className="rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint sm:col-span-2"
          />
          <div className="sm:col-span-2">
            <label className="block text-xs text-stone">Image de couverture</label>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={changerCouverture}
              className="mt-1 text-sm"
            />
          </div>
          <div className="flex items-center gap-3 sm:col-span-2">
            <button
              type="submit"
              className="rounded-sm bg-ink px-4 py-2 text-sm text-paper hover:bg-blueprint"
            >
              Enregistrer
            </button>
            {enregistre && <span className="text-sm text-blueprint">Enregistré.</span>}
          </div>
        </form>
      </section>

      <section className="mt-8 border border-line bg-white/50 p-5">
        <h2 className="font-display text-lg text-ink">Publier une mise à jour</h2>
        <form onSubmit={publierMaj} className="mt-4 space-y-3">
          <input
            required
            value={maj.titre}
            onChange={(e) => setMaj({ ...maj, titre: e.target.value })}
            placeholder="Titre de l'étape (ex. Coulage de la dalle)"
            className="w-full rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint"
          />
          <textarea
            value={maj.texte}
            onChange={(e) => setMaj({ ...maj, texte: e.target.value })}
            placeholder="Détails, ajustements de plan, remarques pour le client…"
            rows={4}
            className="w-full rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint"
          />
          <div>
            <label className="block text-xs text-stone">Photos du chantier</label>
            <input
              ref={majInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={changerImagesMaj}
              className="mt-1 text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded-sm bg-blueprint px-4 py-2 text-sm text-paper hover:bg-blueprint-light"
          >
            Publier la mise à jour
          </button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg text-ink">Historique</h2>
        <ul className="mt-4 divide-y divide-line border border-line">
          {projet.mises_a_jour.map((m) => (
            <li key={m.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-mono text-xs text-blueprint">{m.date}</p>
                <p className="font-display text-ink">{m.titre}</p>
                {m.commentaires?.length > 0 && (
                  <p className="text-xs text-stone">
                    {m.commentaires.length} remarque
                    {m.commentaires.length === 1 ? "" : "s"} du client
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  if (confirm("Supprimer cette mise à jour ?"))
                    supprimerMiseAJour(id, m.id);
                }}
                className="shrink-0 font-mono text-xs uppercase tracking-wide text-clay hover:text-clay/80"
              >
                Supprimer
              </button>
            </li>
          ))}
          {projet.mises_a_jour.length === 0 && (
            <li className="p-6 text-center text-stone">Aucune mise à jour encore.</li>
          )}
        </ul>
      </section>
    </div>
  );
}
