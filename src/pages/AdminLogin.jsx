import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../data/auth.jsx";

export default function AdminLogin() {
  const { connecte, seConnecter } = useAuth();
  const [code, setCode] = useState("");
  const [erreur, setErreur] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (connecte) {
    return <Navigate to={location.state?.from || "/admin"} replace />;
  }

  const soumettre = (e) => {
    e.preventDefault();
    if (seConnecter(code.trim())) {
      navigate(location.state?.from || "/admin", { replace: true });
    } else {
      setErreur(true);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-5 py-24 sm:px-8">
      <h1 className="font-display text-2xl text-ink">Espace architecte</h1>
      <p className="mt-2 text-sm text-stone">
        Accès réservé à l'architecte pour publier des mises à jour.
      </p>
      <form onSubmit={soumettre} className="mt-8 space-y-3">
        <input
          type="password"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setErreur(false);
          }}
          placeholder="Code d'accès"
          autoFocus
          className="w-full rounded-sm border border-line bg-white/60 px-3 py-2 outline-none focus-visible:border-blueprint"
        />
        {erreur && (
          <p className="text-sm text-clay">Code incorrect. Réessayez.</p>
        )}
        <button
          type="submit"
          className="w-full rounded-sm bg-ink px-4 py-2.5 text-sm text-paper transition-colors hover:bg-blueprint"
        >
          Entrer
        </button>
      </form>
    </div>
  );
}
