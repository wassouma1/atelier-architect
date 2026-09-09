import { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "atelier-malak:projets";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

const seedProjects = [
  {
    id: "immeuble-sousse",
    titre: "Immeuble Marina",
    lieu: "Sousse",
    client: "Copropriété Marina",
    statut: "En chantier",
    categorie: "Résidentiel",
    couverture:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop",
    description:
      "Immeuble collectif de 5 étages en bord de mer, 12 appartements, façade en pierre locale et loggias filantes orientées sur la baie de Sousse.",
    creeLe: "2026-06-10",
    mises_a_jour: [
      {
        id: uid(),
        date: "2026-09-02",
        titre: "Pose de la façade en pierre",
        texte:
          "Le premier tiers de la façade côté mer est posé. J'ai validé sur place la teinte de la pierre avec l'entreprise avant de continuer sur les étages supérieurs.",
        images: [
          "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?q=80&w=1200&auto=format&fit=crop",
        ],
        commentaires: [],
      },
      {
        id: uid(),
        date: "2026-08-05",
        titre: "Fin du gros œuvre",
        texte:
          "Les 5 étages sont désormais coulés. Prochaine étape : cloisonnement intérieur et pose des menuiseries extérieures.",
        images: [
          "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1200&auto=format&fit=crop",
        ],
        commentaires: [],
      },
    ],
  },
  {
    id: "villa-el-menzah",
    titre: "Villa El Menzah",
    lieu: "El Menzah, Tunis",
    client: "Famille Trabelsi",
    statut: "En chantier",
    categorie: "Résidentiel",
    couverture:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    description:
      "Villa contemporaine de 320 m², structure en béton apparent, patio central et brise-soleil en claustra traditionnel revisité.",
    creeLe: "2026-05-02",
    mises_a_jour: [
      {
        id: uid(),
        date: "2026-08-20",
        titre: "Coulage de la dalle du premier étage",
        texte:
          "La dalle du premier étage a été coulée ce matin. Le séchage prendra environ 10 jours avant de retirer les étais. Les gaines électriques ont été posées avant coulage, conformément aux plans révisés.",
        images: [
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
        ],
        commentaires: [],
      },
      {
        id: uid(),
        date: "2026-07-30",
        titre: "Élévation des murs du rez-de-chaussée",
        texte:
          "Les murs porteurs du rez-de-chaussée sont terminés. J'ai ajusté la position de la baie du séjour de 40 cm vers le jardin pour améliorer la vue sur le patio — voir plan mis à jour ci-joint.",
        images: [
          "https://images.unsplash.com/photo-1591588582259-e5015431e7d7?q=80&w=1200&auto=format&fit=crop",
        ],
        commentaires: [
          {
            id: uid(),
            nom: "M. Trabelsi",
            texte: "Merci pour l'ajustement, la vue sera magnifique.",
            date: "2026-07-31",
          },
        ],
      },
    ],
  },
];

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [projets, setProjets] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : seedProjects;
    } catch {
      return seedProjects;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projets));
    } catch {
      // le stockage local peut être plein (images trop volumineuses) — ignoré silencieusement
    }
  }, [projets]);

  const ajouterProjet = useCallback((data) => {
    const id = uid();
    setProjets((prev) => [
      {
        id,
        titre: data.titre || "Nouveau projet",
        lieu: data.lieu || "",
        client: data.client || "",
        statut: data.statut || "En préparation",
        categorie: data.categorie || "Résidentiel",
        couverture: data.couverture || "",
        description: data.description || "",
        creeLe: today(),
        mises_a_jour: [],
      },
      ...prev,
    ]);
    return id;
  }, []);

  const modifierProjet = useCallback((id, patch) => {
    setProjets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  }, []);

  const supprimerProjet = useCallback((id) => {
    setProjets((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const ajouterMiseAJour = useCallback((projetId, maj) => {
    setProjets((prev) =>
      prev.map((p) =>
        p.id === projetId
          ? {
              ...p,
              mises_a_jour: [
                {
                  id: uid(),
                  date: maj.date || today(),
                  titre: maj.titre || "",
                  texte: maj.texte || "",
                  images: maj.images || [],
                  commentaires: [],
                },
                ...p.mises_a_jour,
              ],
            }
          : p
      )
    );
  }, []);

  const supprimerMiseAJour = useCallback((projetId, majId) => {
    setProjets((prev) =>
      prev.map((p) =>
        p.id === projetId
          ? { ...p, mises_a_jour: p.mises_a_jour.filter((m) => m.id !== majId) }
          : p
      )
    );
  }, []);

  const ajouterCommentaire = useCallback((projetId, majId, commentaire) => {
    setProjets((prev) =>
      prev.map((p) =>
        p.id !== projetId
          ? p
          : {
              ...p,
              mises_a_jour: p.mises_a_jour.map((m) =>
                m.id !== majId
                  ? m
                  : {
                      ...m,
                      commentaires: [
                        ...m.commentaires,
                        { id: uid(), date: today(), ...commentaire },
                      ],
                    }
              ),
            }
      )
    );
  }, []);

  const value = {
    projets,
    ajouterProjet,
    modifierProjet,
    supprimerProjet,
    ajouterMiseAJour,
    supprimerMiseAJour,
    ajouterCommentaire,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore doit être utilisé dans <StoreProvider>");
  return ctx;
}
