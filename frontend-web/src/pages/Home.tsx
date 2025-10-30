import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>SADAKA — Frontend Web</h1>
      <p>Plateforme de gestion des dons — volet web.</p>
      <nav style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <Link to="/map">Carte</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Connexion</Link>
      </nav>
    </div>
  );
}
