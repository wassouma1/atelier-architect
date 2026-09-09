import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../data/auth.jsx";

export default function Navbar() {
  const { connecte } = useAuth();

  const linkClass = ({ isActive }) =>
    `text-sm font-mono uppercase tracking-wide transition-colors ${
      isActive ? "text-blueprint" : "text-ink-soft hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl italic text-ink">Atelier</span>
          <span className="font-display text-xl font-medium text-blueprint">
            Malak
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>
            Projets
          </NavLink>
          <NavLink to={connecte ? "/admin" : "/admin/connexion"} className={linkClass}>
            {connecte ? "Tableau de bord" : "Espace architecte"}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
