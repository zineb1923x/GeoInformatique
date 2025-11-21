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

// Stockage des annonces créées par chaque utilisateur
const userDonations: Record<string, any[]> = {};

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
    const body = config.data || {};
    const newId = String(Date.now());
    const newDonation = {
      id: newId,
      title: body.title || 'Nouvelle annonce',
      category: body.category || 'OTHER',
      quantity: body.quantity || 1,
      commune: body.commune || 'CASABLANCA',
      description: body.description || '',
      createdAt: new Date().toISOString(),
      status: 'PENDING',
      latitude: body.latitude || 33.5731,
      longitude: body.longitude || -7.5898,
      userId: currentUser?.id || 'unknown'
    };
    
    // Ajouter à la liste globale
    sampleDonations.push(newDonation);
    
    // Ajouter à la liste de l'utilisateur
    if (currentUser?.id) {
      if (!userDonations[currentUser.id]) {
        userDonations[currentUser.id] = [];
      }
      userDonations[currentUser.id].push(newDonation);
    }
    
    return { status: 200, data: { id: newId } };
  }
  if (url.match(/\/donations\/[^/]+\/approve/) && method === 'post') {
    return { status: 200, data: { ok: true } };
  }
  if (url.match(/\/donations\/[^/]+\/reject/) && method === 'post') {
    return { status: 200, data: { ok: true } };
  }
  if (url.match(/\/donations\/[^/]+\/interest$/) && method === 'post') {
    // Simuler l'ajout d'une demande d'intérêt
    return { status: 200, data: { ok: true, interestId: 'i' + Date.now() } };
  }
  
  // Récupérer les demandes d'intérêt pour une annonce
  if (url.match(/\/donations\/[^/]+\/interests$/) && method === 'get') {
    const announcementId = url.match(/\/donations\/([^/]+)\/interests$/)?.[1];
    // Retourner des demandes d'intérêt mock
    return { status: 200, data: [
      {
        id: 'i1',
        userId: 'u4',
        userName: 'Aicha Benali',
        userEmail: 'aicha@example.com',
        userPhone: '0612345681',
        requestedQuantity: 10,
        requestedAt: new Date().toISOString(),
        status: 'PENDING'
      },
      {
        id: 'i2',
        userId: 'u5',
        userName: 'Hassan Alami',
        userEmail: 'hassan@example.com',
        userPhone: '0612345682',
        requestedQuantity: 5,
        requestedAt: new Date(Date.now() - 86400000).toISOString(),
        status: 'PENDING'
      }
    ] };
  }
  
  // Assigner une quantité à un demandeur
  if (url.match(/\/donations\/[^/]+\/assign$/) && method === 'post') {
    const body = config.data || {};
    // Simuler l'assignation
    return { status: 200, data: { ok: true, assignedQuantity: body.quantity } };
  }
  
  // Supprimer une demande d'intérêt
  if (url.match(/\/interests\/[^/]+$/) && method === 'delete') {
    return { status: 200, data: { ok: true } };
  }

  // My donations
  if (url.includes('/me/donations') && method === 'get') {
    // Retourner seulement les annonces créées par l'utilisateur connecté
    if (currentUser?.id && userDonations[currentUser.id]) {
      return { status: 200, data: userDonations[currentUser.id] };
    }
    // Si l'utilisateur n'a pas encore créé d'annonces, retourner un tableau vide
    return { status: 200, data: [] };
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
  if (url.endsWith('/newsletter/subscribers') && method === 'get') {
    return { status: 200, data: [
      { id: '1', email: 'subscriber1@example.com', subscribedAt: new Date().toISOString() },
      { id: '2', email: 'subscriber2@example.com', subscribedAt: new Date(Date.now() - 86400000).toISOString() },
      { id: '3', email: 'subscriber3@example.com', subscribedAt: new Date(Date.now() - 172800000).toISOString() }
    ] };
  }
  if (url.match(/\/newsletter\/subscribers\/[^/]+$/) && method === 'delete') {
    return { status: 200, data: { ok: true } };
  }

  // Users management
  if (url.endsWith('/users') && method === 'get') {
    return { status: 200, data: [
      { id: '1', firstName: 'Ahmed', lastName: 'Alaoui', email: 'admin@sadaka.ma', role: 'ADMIN', phone: '0612345678' },
      { id: '2', firstName: 'Fatima', lastName: 'Benali', email: 'moderator@sadaka.ma', role: 'MODERATOR', phone: '0612345679' },
      { id: '3', firstName: 'Mohamed', lastName: 'Idrissi', email: 'user@sadaka.ma', role: 'USER', phone: '0612345680' },
      { id: '4', firstName: 'Aicha', lastName: 'Tazi', email: 'aicha@example.com', role: 'USER', phone: '0612345681' }
    ] };
  }
  if (url.match(/\/users\/[^/]+$/) && method === 'delete') {
    return { status: 200, data: { ok: true } };
  }

  // Default fallback
  return { status: 200, data: { ok: true } };
}


