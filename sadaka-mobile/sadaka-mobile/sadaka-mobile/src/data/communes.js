export const COMMUNES_MAROC = [
  // Casablanca-Settat
  { label: 'Casablanca', value: 'casablanca', region: 'Casablanca-Settat' },
  { label: 'Mohammedia', value: 'mohammedia', region: 'Casablanca-Settat' },
  { label: 'El Jadida', value: 'el-jadida', region: 'Casablanca-Settat' },
  { label: 'Settat', value: 'settat', region: 'Casablanca-Settat' },
  { label: 'Berrechid', value: 'berrechid', region: 'Casablanca-Settat' },

  // Rabat-Salé-Kénitra
  { label: 'Rabat', value: 'rabat', region: 'Rabat-Salé-Kénitra' },
  { label: 'Salé', value: 'sale', region: 'Rabat-Salé-Kénitra' },
  { label: 'Témara', value: 'temara', region: 'Rabat-Salé-Kénitra' },
  { label: 'Kénitra', value: 'kenitra', region: 'Rabat-Salé-Kénitra' },

  // Fès-Meknès
  { label: 'Fès', value: 'fes', region: 'Fès-Meknès' },
  { label: 'Meknès', value: 'meknes', region: 'Fès-Meknès' },

  // Marrakech-Safi
  { label: 'Marrakech', value: 'marrakech', region: 'Marrakech-Safi' },
  { label: 'Safi', value: 'safi', region: 'Marrakech-Safi' },

  // Tanger-Tétouan-Al Hoceïma
  { label: 'Tanger', value: 'tanger', region: 'Tanger-Tétouan-Al Hoceïma' },
  { label: 'Tétouan', value: 'tetouan', region: 'Tanger-Tétouan-Al Hoceïma' },

  // Oriental
  { label: 'Oujda', value: 'oujda', region: 'Oriental' },
  { label: 'Nador', value: 'nador', region: 'Oriental' },

  // Souss-Massa
  { label: 'Agadir', value: 'agadir', region: 'Souss-Massa' },
  { label: 'Inezgane', value: 'inezgane', region: 'Souss-Massa' },
];

export const getCommuneCoordinates = (communeValue) => {
  const coordinates = {
    'casablanca': { latitude: 33.5731, longitude: -7.5898 },
    'rabat': { latitude: 34.0209, longitude: -6.8416 },
    'fes': { latitude: 34.0181, longitude: -5.0078 },
    'marrakech': { latitude: 31.6295, longitude: -7.9811 },
    'tanger': { latitude: 35.7595, longitude: -5.8340 },
    'agadir': { latitude: 30.4278, longitude: -9.5981 },
    'meknes': { latitude: 33.8935, longitude: -5.5473 },
    'oujda': { latitude: 34.6814, longitude: -1.9086 },
    'kenitra': { latitude: 34.2610, longitude: -6.5802 },
    'tetouan': { latitude: 35.5889, longitude: -5.3626 },
    'mohammedia': { latitude: 33.6866, longitude: -7.3833 },
    'el-jadida': { latitude: 33.2316, longitude: -8.5007 },
    'settat': { latitude: 33.0013, longitude: -7.6217 },
    'berrechid': { latitude: 33.2650, longitude: -7.5833 },
    'sale': { latitude: 34.0531, longitude: -6.7985 },
    'temara': { latitude: 33.9278, longitude: -6.9063 },
    'safi': { latitude: 32.2994, longitude: -9.2372 },
    'nador': { latitude: 35.1681, longitude: -2.9333 },
    'inezgane': { latitude: 30.3550, longitude: -9.5367 },
  };
  return coordinates[communeValue] || { latitude: 33.5731, longitude: -7.5898 };
};
