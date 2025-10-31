import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>SADAKA — Frontend Web</h1>
      <p>Plateforme web publique et d’administration pour la gestion des dons.</p>
      <nav style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
        <Link to="/announcements">Annonces</Link>
        <Link to="/map">Carte</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/newsletter">Newsletter</Link>
        <Link to="/login">Connexion</Link>
      </nav>
    </div>
  );
}
