// src/services/api.js – VERSION DEMO (Sans Backend propre)

let mockUsers = [
  {
    id: 1,
    nom: 'Alami',
    prenom: 'Mohammed',
    telephone: '0612345678',
    email: 'demo@sadaka.ma',
    password: 'demo123',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    imei: '123456789012345'
  }
];

let mockAnnonces = [
  {
    id: 1,
    userId: 1,
    category: 'vetements',
    categorie: 'Vêtements',
    quantity: 10,
    quantiteRestante: 10,
    description: 'Vêtements pour enfants en bon état',
    photos: ['https://picsum.photos/400/300?random=1'],
    commune: 'Casablanca',
    latitude: 33.5731,
    longitude: -7.5898,
    datePublication: new Date().toISOString(),
    statut: 'approuvé',
    user: { nom: 'Alami', prenom: 'Mohammed', telephone: '0612345678' }
  }
];

let mockInterests = [];
let currentUser = null;
let nextAnnonceId = 2;
let nextInterestId = 1;
const delay = (ms = 500) => new Promise(r => setTimeout(r, ms));

export const login = async (email, password) => {
  await delay();
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Email ou mot de passe incorrect');
  currentUser = user;
  const { password: _, ...userData } = user;
  return { token: 'mock-token-' + user.id, user: userData };
};

export const register = async userData => {
  await delay();
  if (mockUsers.some(u => u.email === userData.email))
    throw new Error('Cet email est déjà utilisé');
  const newUser = {
    id: mockUsers.length + 1,
    ...userData,
    photo: userData.photo || 'https://randomuser.me/api/portraits/lego/1.jpg'
  };
  mockUsers.push(newUser);
  currentUser = newUser;
  const { password, ...userForApp } = newUser;
  return { token: 'mock-token-' + newUser.id, user: userForApp };
};

// --- annonces ---
export const getAnnouncements = async () => {
  await delay();
  return mockAnnonces;
};
export const getAnnonces = getAnnouncements;

export const getAnnonceById = async id => {
  await delay();
  const a = mockAnnonces.find(x => x.id === +id);
  if (!a) throw new Error('Annonce non trouvée');
  return a;
};

export const getMesAnnonces = async () => {
  await delay();
  if (!currentUser) throw new Error('Non authentifié');
  return mockAnnonces.filter(a => a.userId === currentUser.id);
};

// ✳️ ALIAS ajouté APRÈS la définition :
export const getMyAnnouncements = getMesAnnonces;

export const createAnnouncement = async data => {
  await delay();
  if (!currentUser) throw new Error('Non authentifié');
  const a = {
    id: nextAnnonceId++,
    userId: currentUser.id,
    ...data,
    quantity: +data.quantity,
    datePublication: new Date().toISOString(),
    statut: 'approuvé',
    user: {
      nom: currentUser.nom,
      prenom: currentUser.prenom,
      telephone: currentUser.telephone
    }
  };
  mockAnnonces.unshift(a);
  return a;
};
export const createAnnonce = createAnnouncement;

// --- intérêts ---
export const createInterest = async annonceId => {
  await delay();
  if (!currentUser) throw new Error('Non authentifié');
  const duplicate = mockInterests.find(
    i => i.annonceId === annonceId && i.userId === currentUser.id
  );
  if (duplicate)
    throw new Error('Vous avez déjà manifesté votre intérêt pour cette annonce');
  const interest = {
    id: nextInterestId++,
    annonceId,
    userId: currentUser.id,
    dateCreation: new Date().toISOString(),
    user: {
      nom: currentUser.nom,
      prenom: currentUser.prenom,
      telephone: currentUser.telephone,
      email: currentUser.email
    }
  };
  mockInterests.push(interest);
  return interest;
};

export const getInterestsByAnnonce = async annonceId => {
  await delay();
  return mockInterests.filter(i => i.annonceId === +annonceId);
};

export const getMesInterests = async () => {
  await delay();
  if (!currentUser) throw new Error('Non authentifié');
  return mockInterests.map(i => ({
    ...i,
    annonce: mockAnnonces.find(a => a.id === i.annonceId)
  }));
};

export const assignQuantity = async (annonceId, userId, qte) => {
  await delay();
  const a = mockAnnonces.find(x => x.id === +annonceId);
  if (!a) throw new Error('Annonce non trouvée');
  a.quantiteRestante = Math.max(0, a.quantiteRestante - qte);
  return { message: 'Quantité attribuée', quantiteRestante: a.quantiteRestante };
};

export const uploadImage = async uri => {
  await delay();
  return uri.startsWith('http') ? uri : `https://picsum.photos/400/300?${Date.now()}`;
};

// export default pour compat
export default {
  login,
  register,
  getAnnouncements,
  getAnnonces,
  getAnnonceById,
  getMesAnnonces,
  getMyAnnouncements,
  createAnnouncement,
  createAnnonce,
  createInterest,
  getInterestsByAnnonce,
  getMesInterests,
  assignQuantity,
  deleteAnnouncement,
  deleteInterest,
  uploadImage
};
export const deleteAnnouncement = async (annonceId) => {
  await delay();
  if (!currentUser) throw new Error('Non authentifié');
  const index = mockAnnonces.findIndex(a => a.id === +annonceId && a.userId === currentUser.id);
  if (index === -1) throw new Error('Annonce non trouvée ou non autorisée');
  mockAnnonces.splice(index, 1);
  // Supprimer aussi les intérêts liés
  mockInterests = mockInterests.filter(i => i.annonceId !== +annonceId);
  return { message: 'Annonce supprimée' };
};

export const deleteInterest = async (interestId) => {
  await delay();
  if (!currentUser) throw new Error('Non authentifié');
  const index = mockInterests.findIndex(i => i.id === +interestId && i.userId === currentUser.id);
  if (index === -1) throw new Error('Intérêt non trouvé');
  mockInterests.splice(index, 1);
  return { message: 'Intérêt supprimé' };
};