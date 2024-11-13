import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

function AuthPage({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const signUp = useMutation(api.auth.signUp);
  const logIn = useMutation(api.auth.logIn);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await logIn({ email, password });
      } else {
        await signUp({ email, password });
      }
      onAuthSuccess();
    } catch (error) {
      if (error instanceof Error) {
        alert("Erreur d'authentification : " + error.message);
      } else {
        alert("Erreur d'authentification inconnue");
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Connexion" : "Inscription"}</h2>
      <input
        type="email"
        placeholder="Adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>{isLogin ? "Se connecter" : "S'inscrire"}</button>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Créer un compte" : "J'ai déjà un compte"}
      </button>
    </div>
  );
}

export default AuthPage;