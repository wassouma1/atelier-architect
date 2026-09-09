import { Mail, Phone, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { contact } from "../data/contact.js";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-display text-2xl italic">
            Atelier <span className="not-italic text-blueprint-light">Malak</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-paper/70">
            Architecture suivie à distance — chaque étape du chantier partagée
            avec vous, où que vous soyez.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-paper/50">
            {contact.role} · {contact.nom}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-paper/80 transition-colors hover:text-paper"
              >
                <Mail size={16} className="text-blueprint-light" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${contact.telephone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 text-paper/80 transition-colors hover:text-paper"
              >
                <Phone size={16} className="text-blueprint-light" />
                {contact.telephone}
              </a>
            </li>
            <li>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-paper/80 transition-colors hover:text-paper"
              >
                <MessageCircle size={16} className="text-blueprint-light" />
                WhatsApp
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-4">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-paper/60 transition-colors hover:text-paper"
            >
              <Instagram size={18} />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-paper/60 transition-colors hover:text-paper"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <p className="mx-auto max-w-6xl px-5 py-4 font-mono text-xs text-paper/40 sm:px-8">
          Atelier Malak — Tunis · France
        </p>
      </div>
    </footer>
  );
}
