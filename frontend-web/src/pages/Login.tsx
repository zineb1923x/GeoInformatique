export default function Login() {
  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <h2>Connexion</h2>
      <form style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
