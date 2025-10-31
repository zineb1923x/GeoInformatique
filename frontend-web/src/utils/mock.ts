import type { AxiosRequestConfig } from 'axios';

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

const sampleDonations = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  title: `Don #${i + 1}`,
  category: ['FOOD', 'CLOTHES', 'MEDICINE', 'OTHER'][i % 4],
  quantity: Math.floor(Math.random() * 50) + 1,
  commune: ['CASABLANCA', 'RABAT', 'FES', 'MARRAKECH'][i % 4],
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  status: ['PENDING', 'APPROVED', 'DONATED'][i % 3]
}));

let token: string | null = 'mock-token';
const mockUser = { id: 'u1', firstName: 'Admin', lastName: 'User', email: 'admin@sadaka.ma', role: 'ADMIN' as const };

export async function handleMock(config: AxiosRequestConfig) {
  const url = config.url || '';
  const method = (config.method || 'get').toLowerCase();
  await delay(200);

  // Auth
  if (url.endsWith('/auth/login') && method === 'post') {
    return { status: 200, data: { token: token } };
  }
  if (url.endsWith('/auth/register') && method === 'post') {
    return { status: 200, data: { token: token } };
  }
  if (url.endsWith('/auth/me') && method === 'get') {
    return { status: 200, data: mockUser };
  }

  // Donations list with filters
  if (url.includes('/donations') && method === 'get') {
    return { status: 200, data: sampleDonations };
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
    return { status: 200, data: sampleDonations.slice(0, 5) };
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


