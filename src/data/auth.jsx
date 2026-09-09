import { createContext, useContext, useState } from "react";

// NOTE : ceci est une protection basique côté client, pratique pour un MVP
// mais pas un vrai système d'authentification. Pour la mise en production,
// remplacez ceci par un vrai backend (ex. avec un mot de passe haché et une session serveur).
const CODE_ADMIN = "0000";
const SESSION_KEY = "atelier-malak:session-admin";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [connecte, setConnecte] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );

  const seConnecter = (code) => {
    if (code === CODE_ADMIN) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setConnecte(true);
      return true;
    }
    return false;
  };

  const seDeconnecter = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setConnecte(false);
  };

  return (
    <AuthContext.Provider value={{ connecte, seConnecter, seDeconnecter }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans <AuthProvider>");
  return ctx;
}
