import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
      <p className="font-mono text-sm text-blueprint">404</p>
      <h1 className="mt-2 font-display text-2xl text-ink">Page introuvable</h1>
      <Link to="/" className="mt-4 inline-block text-blueprint underline">
        Retour à l'accueil
      </Link>
    </div>
  );
}
