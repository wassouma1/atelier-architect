import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../data/store.jsx";
import { useAuth } from "../data/auth.jsx";
import { CATEGORIES } from "../data/constants.js";

export default function AdminDashboard() {
  const { projets, ajouterProjet, supprimerProjet } = useStore();
  const { seDeconnecter } = useAuth();
  const [ouvert, setOuvert] = useState(false);
  const [form, setForm] = useState({
    titre: "",
    lieu: "",
    client: "",
    categorie: CATEGORIES[0],
  });

  const creer = (e) => {
    e.preventDefault();
    if (!form.titre.trim()) return;
    ajouterProjet(form);
    setForm({ titre: "", lieu: "", client: "", categorie: CATEGORIES[0] });
    setOuvert(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-display text-2xl text-ink">Tableau de bord</h1>
          <p className="mt-1 text-sm text-stone">
            Gérez vos projets et publiez vos mises à jour de chantier.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setOuvert((v) => !v)}
            className="rounded-sm bg-blueprint px-4 py-2 text-sm text-paper hover:bg-blueprint-light"
          >
            + Nouveau projet
          </button>
          <button
            onClick={seDeconnecter}
            className="rounded-sm border border-line px-4 py-2 text-sm text-ink-soft hover:border-ink"
          >
            Se déconnecter
          </button>
        </div>
      </div>

      {ouvert && (
        <form
          onSubmit={creer}
          className="mt-6 grid gap-3 border border-line bg-white/50 p-4 sm:grid-cols-3"
        >
          <input
            required
            placeholder="Nom du projet"
            value={form.titre}
            onChange={(e) => setForm({ ...form, titre: e.target.value })}
            className="rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint"
          />
          <input
            placeholder="Lieu"
            value={form.lieu}
            onChange={(e) => setForm({ ...form, lieu: e.target.value })}
            className="rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint"
          />
          <input
            placeholder="Client"
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
            className="rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint"
          />
          <select
            value={form.categorie}
            onChange={(e) => setForm({ ...form, categorie: e.target.value })}
            className="rounded-sm border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-blueprint sm:col-span-3"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="sm:col-span-3 rounded-sm bg-ink px-4 py-2 text-sm text-paper hover:bg-blueprint"
          >
            Créer le projet
          </button>
        </form>
      )}

      <ul className="mt-8 divide-y divide-line border border-line">
        {projets.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-display text-lg text-ink">{p.titre}</p>
              <p className="text-sm text-stone">
                {p.lieu} {p.client && `· ${p.client}`} · {p.mises_a_jour.length}{" "}
                mise{p.mises_a_jour.length === 1 ? "" : "s"} à jour
              </p>
            </div>
            <div className="flex shrink-0 gap-3 font-mono text-xs uppercase tracking-wide">
              <Link to={`/projets/${p.id}`} className="text-stone hover:text-ink">
                Voir
              </Link>
              <Link to={`/admin/projets/${p.id}`} className="text-blueprint hover:text-blueprint-light">
                Gérer
              </Link>
              <button
                onClick={() => {
                  if (confirm(`Supprimer « ${p.titre} » ?`)) supprimerProjet(p.id);
                }}
                className="text-clay hover:text-clay/80"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
        {projets.length === 0 && (
          <li className="p-6 text-center text-stone">Aucun projet encore.</li>
        )}
      </ul>
    </div>
  );
}
