import type { AxiosRequestConfig } from 'axios';

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

// Données de test réalistes pour la démonstration
const sampleDonations = [
  {
    id: '1',
    title: 'Don de vêtements d\'hiver pour enfants',
    category: 'CLOTHES',
    quantity: 45,
    commune: 'CASABLANCA',
    description: 'Vêtements chauds pour enfants de 5 à 12 ans. En très bon état, lavés et repassés.',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    status: 'APPROVED',
    latitude: 33.5731,
    longitude: -7.5898
  },
  {
    id: '2',
    title: 'Panier alimentaire complet',
    category: 'FOOD',
    quantity: 1,
    commune: 'RABAT',
    description: 'Panier contenant riz, pâtes, huile, sucre, thé et conserves. Valable pour une famille de 4 personnes.',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    status: 'APPROVED',
    latitude: 34.0209,
    longitude: -6.8416
  },
  {
    id: '3',
    title: 'Médicaments et produits de première nécessité',
    category: 'MEDICINE',
    quantity: 30,
    commune: 'FES',
    description: 'Médicaments non utilisés, produits d\'hygiène et pansements. Tous dans leurs emballages d\'origine.',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    status: 'PENDING',
    latitude: 34.0333,
    longitude: -5.0000
  },
  {
    id: '4',
    title: 'Livres et fournitures scolaires',
    category: 'OTHER',
    quantity: 120,
    commune: 'MARRAKECH',
    description: 'Livres scolaires, cahiers, stylos et cartables. Idéal pour la rentrée scolaire.',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    status: 'APPROVED',
    latitude: 31.6295,
    longitude: -7.9811
  },
  {
    id: '5',
    title: 'Couvertures et draps',
    category: 'CLOTHES',
    quantity: 25,
    commune: 'CASABLANCA',
    description: 'Couvertures chaudes et draps propres, parfaits pour l\'hiver.',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    status: 'DONATED',
    latitude: 33.5731,
    longitude: -7.5898
  },
  {
    id: '6',
    title: 'Denrées alimentaires non périssables',
    category: 'FOOD',
    quantity: 50,
    commune: 'RABAT',
    description: 'Riz, lentilles, haricots secs et autres légumineuses. Emballages scellés.',
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    status: 'APPROVED',
    latitude: 34.0209,
    longitude: -6.8416
  },
  {
    id: '7',
    title: 'Jouets et jeux éducatifs',
    category: 'OTHER',
    quantity: 35,
    commune: 'FES',
    description: 'Jouets en bon état, puzzles et jeux de société pour enfants.',
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    status: 'APPROVED',
    latitude: 34.0333,
    longitude: -5.0000
  },
  {
    id: '8',
    title: 'Chaussures pour toute la famille',
    category: 'CLOTHES',
    quantity: 40,
    commune: 'MARRAKECH',
    description: 'Chaussures de différentes tailles, toutes en bon état et propres.',
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    status: 'PENDING',
    latitude: 31.6295,
    longitude: -7.9811
  },
  {
    id: '9',
    title: 'Produits d\'hygiène et de soin',
    category: 'MEDICINE',
    quantity: 60,
    commune: 'CASABLANCA',
    description: 'Savons, shampoings, dentifrices et produits d\'hygiène féminine.',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    status: 'APPROVED',
    latitude: 33.5731,
    longitude: -7.5898
  },
  {
    id: '10',
    title: 'Matériel de cuisine et vaisselle',
    category: 'OTHER',
    quantity: 1,
    commune: 'RABAT',
    description: 'Casseroles, poêles, assiettes et verres. Matériel complet pour équiper une cuisine.',
    createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
    status: 'APPROVED',
    latitude: 34.0209,
    longitude: -6.8416
  },
  {
    id: '11',
    title: 'Fruits et légumes frais',
    category: 'FOOD',
    quantity: 20,
    commune: 'FES',
    description: 'Fruits et légumes de saison, récoltés du jardin. À consommer rapidement.',
    createdAt: new Date(Date.now() - 0.5 * 86400000).toISOString(),
    status: 'PENDING',
    latitude: 34.0333,
    longitude: -5.0000
  },
  {
    id: '12',
    title: 'Vêtements pour bébés',
    category: 'CLOTHES',
    quantity: 30,
    commune: 'MARRAKECH',
    description: 'Body, pyjamas et vêtements pour bébés de 0 à 24 mois. Tous lavés et désinfectés.',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    status: 'APPROVED',
    latitude: 31.6295,
    longitude: -7.9811
  },
  {
    id: '13',
    title: 'Appareils électroménagers',
    category: 'OTHER',
    quantity: 5,
    commune: 'CASABLANCA',
    description: 'Petits appareils électroménagers fonctionnels : bouilloire, grille-pain, mixeur.',
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    status: 'DONATED',
    latitude: 33.5731,
    longitude: -7.5898
  },
  {
    id: '14',
    title: 'Vitamines et compléments alimentaires',
    category: 'MEDICINE',
    quantity: 25,
    commune: 'RABAT',
    description: 'Compléments alimentaires et vitamines, non périmés, dans leurs emballages d\'origine.',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    status: 'APPROVED',
    latitude: 34.0209,
    longitude: -6.8416
  },
  {
    id: '15',
    title: 'Céréales et produits de petit-déjeuner',
    category: 'FOOD',
    quantity: 40,
    commune: 'FES',
    description: 'Céréales, biscuits et produits pour le petit-déjeuner. Emballages individuels.',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    status: 'APPROVED',
    latitude: 34.0333,
    longitude: -5.0000
  }
];

let token: string | null = 'mock-token';
let currentUser: any = null;

// Utilisateurs de test
const mockUsers = {
  admin: { id: 'u1', firstName: 'Ahmed', lastName: 'Alaoui', email: 'admin@sadaka.ma', role: 'ADMIN' as const },
  moderator: { id: 'u2', firstName: 'Fatima', lastName: 'Benali', email: 'moderator@sadaka.ma', role: 'MODERATOR' as const },
  user: { id: 'u3', firstName: 'Mohamed', lastName: 'Idrissi', email: 'user@sadaka.ma', role: 'USER' as const }
};

export async function handleMock(config: AxiosRequestConfig) {
  const url = config.url || '';
  const method = (config.method || 'get').toLowerCase();
  await delay(200);

  // Auth
  if (url.endsWith('/auth/login') && method === 'post') {
    const body = config.data || {};
    // Simuler différents utilisateurs selon l'email
    if (body.email === 'admin@sadaka.ma') {
      currentUser = mockUsers.admin;
    } else if (body.email === 'moderator@sadaka.ma') {
      currentUser = mockUsers.moderator;
    } else {
      currentUser = mockUsers.user;
    }
    token = 'mock-token-' + currentUser.id;
    return { status: 200, data: { token: token } };
  }
  if (url.endsWith('/auth/register') && method === 'post') {
    const body = config.data || {};
    currentUser = {
      id: 'u' + Date.now(),
      firstName: body.firstName || 'Nouveau',
      lastName: body.lastName || 'Utilisateur',
      email: body.email,
      role: 'USER' as const
    };
    token = 'mock-token-' + currentUser.id;
    return { status: 200, data: { token: token } };
  }
  if (url.endsWith('/auth/me') && method === 'get') {
    return { status: 200, data: currentUser || mockUsers.user };
  }

  // Donations list with filters
  if (url.includes('/donations') && method === 'get') {
    let filtered = [...sampleDonations];
    const params = config.params || {};
    
    // Filter by search query
    if (params.q) {
      const query = params.q.toLowerCase();
      filtered = filtered.filter(d => 
        d.title?.toLowerCase().includes(query) || 
        d.description?.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (params.category) {
      filtered = filtered.filter(d => d.category === params.category);
    }
    
    // Filter by commune
    if (params.commune) {
      filtered = filtered.filter(d => d.commune === params.commune);
    }
    
    // Filter by status
    if (params.status) {
      filtered = filtered.filter(d => d.status === params.status);
    }
    
    return { status: 200, data: filtered };
  }
  if (url.endsWith('/donations') && method === 'post') {
    return { status: 200, data: { id: String(sampleDonations.length + 1) } };
  }
  if (url.match(/\/donations\/[^/]+\/approve/) && method === 'post') {
    return { status: 200, data: { ok: true } };
  }
  if (url.match(/\/donations\/[^/]+\/reject/) && method === 'post') {
    return { status: 200, data: { ok: true } };
  }
  if (url.match(/\/donations\/[^/]+\/interest$/) && method === 'post') {
    return { status: 200, data: { ok: true } };
  }

  // My donations
  if (url.includes('/me/donations') && method === 'get') {
    // Retourner quelques annonces créées par l'utilisateur
    return { status: 200, data: sampleDonations.slice(0, 5).map(d => ({ ...d, status: 'PENDING' })) };
  }

  // Roles
  if (url.endsWith('/roles') && method === 'get') {
    return { status: 200, data: [
      { id: 'r1', name: 'ADMIN', description: 'Administrateur' },
      { id: 'r2', name: 'USER', description: 'Utilisateur' }
    ] };
  }
  if (url.endsWith('/roles') && method === 'post') {
    return { status: 200, data: { ok: true } };
  }
  if (url.match(/\/roles\/[^/]+$/) && (method === 'put' || method === 'delete')) {
    return { status: 200, data: { ok: true } };
  }

  // Newsletter
  if (url.endsWith('/newsletter/subscribe') && method === 'post') {
    return { status: 200, data: { ok: true } };
  }

  // Default fallback
  return { status: 200, data: { ok: true } };
}


