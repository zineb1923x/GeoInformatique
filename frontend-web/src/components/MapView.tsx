import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Tag, Typography, Button, Spin } from 'antd';
import { GiftOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

// Fix default icon path when bundling
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Icônes personnalisées par catégorie avec symboles appropriés
const createCategoryIcon = (color: string, emoji: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 40px;
      height: 40px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        transform: rotate(45deg);
        color: white;
        font-size: 20px;
        line-height: 34px;
        text-align: center;
        font-weight: bold;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
     ">${emoji}</div>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  }) as any;
};

const categoryIcons: Record<string, any> = {
  FOOD: createCategoryIcon('#ff4d4f', '🍽️'),      // Nourriture - assiette
  CLOTHES: createCategoryIcon('#52c41a', '👕'),    // Vêtements - t-shirt
  MEDICINE: createCategoryIcon('#52c41a', '💊'),   // Médicaments - pilule
  OTHER: createCategoryIcon('#faad14', '📦')       // Autres - boîte
};

const categoryLabels: Record<string, string> = {
  FOOD: 'Nourriture',
  CLOTHES: 'Vêtements',
  MEDICINE: 'Médicaments',
  OTHER: 'Autres'
};

const statusColors: Record<string, string> = {
  APPROVED: 'green',
  PENDING: 'orange',
  DONATED: 'blue',
  REJECTED: 'red'
};

type Announcement = {
  id: string;
  title?: string;
  category: string;
  quantity: number;
  commune: string;
  createdAt: string;
  status: string;
  latitude?: number;
  longitude?: number;
  description?: string;
};

// Composant pour ajuster la vue de la carte selon les marqueurs
function MapBounds({ announcements }: { announcements: Announcement[] }) {
  const map = useMap();

  // Limites du Maroc complet (y compris le Sahara marocain)
  const moroccoBounds = L.latLngBounds(
    [23.0, -17.0], // Sud-Ouest (Dakhla - limite sud du Maroc)
    [35.8, -1.1]   // Nord-Est (Tanger - frontière Est avec l'Algérie)
  );

  useEffect(() => {
    if (announcements.length > 0) {
      const validAnnouncements = announcements.filter(a => a.latitude && a.longitude);
      if (validAnnouncements.length > 0) {
        const bounds = validAnnouncements.map(a => [a.latitude!, a.longitude!] as [number, number]);
        
        // Filtrer les points qui sont dans les limites du Maroc
        const moroccoPoints = bounds.filter(([lat, lng]) => 
          moroccoBounds.contains(L.latLng(lat, lng))
        );
        
        if (moroccoPoints.length === 0) {
          // Si aucun point dans les limites, vue par défaut
          map.setView([32.5, -6.0], 6);
          return;
        }
        
        if (moroccoPoints.length === 1) {
          // Si un seul point, centrer dessus (mais respecter les limites)
          const [lat, lng] = moroccoPoints[0];
          map.setView([lat, lng], 12);
        } else if (moroccoPoints.length > 1) {
          // Si plusieurs points, ajuster les bounds (mais respecter les limites du Maroc)
          const latlngs = moroccoPoints.map(([lat, lng]) => L.latLng(lat, lng));
          const boundsObj = L.latLngBounds(latlngs);
          
          // Intersecter avec les limites du Maroc pour ne pas dépasser
          const constrainedBounds = moroccoBounds.extend(boundsObj);
          map.fitBounds(constrainedBounds as any, { padding: [50, 50], maxZoom: 12 });
        }
      }
      } else {
      // Vue par défaut sur le Maroc complet (y compris le Sahara marocain)
      map.setView([28.5, -8.0], 6);
    }
    
    // S'assurer que la carte reste dans les limites
    if (!moroccoBounds.contains(map.getCenter())) {
      map.setView([28.5, -8.0], 6);
    }
  }, [announcements, map]);

  return null;
}

interface MapViewProps {
  announcements: Announcement[];
  loading?: boolean;
}

export default function MapView({ announcements, loading = false }: MapViewProps) {
  // Centre du Maroc complet (y compris le Sahara marocain)
  const center: [number, number] = [28.5, -8.0]; // Centre géographique du Maroc complet
  
  // Limites du Maroc complet (y compris le Sahara marocain)
  // Nord: Tanger (~35.8°N), Sud: Dakhla (~23.7°N), Ouest: côte atlantique (~17.0°W), Est: frontière Algérie (~1.1°W)
  const moroccoBounds = L.latLngBounds(
    [23.0, -17.0], // Sud-Ouest (Dakhla - limite sud du Maroc)
    [35.8, -1.1]   // Nord-Est (Tanger - frontière Est avec l'Algérie)
  );

  const validAnnouncements = announcements.filter(a => a.latitude && a.longitude);

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          background: 'white',
          padding: 20,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <Spin size="large" />
        </div>
      )}
      <MapContainer 
        center={center} 
        zoom={6} 
        minZoom={5}
        maxZoom={18}
        maxBounds={moroccoBounds}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Utiliser ESRI World Street Map qui affiche mieux le Maroc complet */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">ESRI</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />
        
        {/* Alternative: OpenStreetMap (peut afficher le Maroc découpé selon les données) */}
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        
        <MapBounds announcements={validAnnouncements} />
        
        {validAnnouncements.map((announcement) => {
          const icon = categoryIcons[announcement.category] || defaultIcon;
          
          return (
            <Marker
              key={announcement.id}
              position={[announcement.latitude!, announcement.longitude!]}
              icon={icon}
            >
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <div style={{ marginBottom: 8 }}>
                    <Text strong style={{ fontSize: 16 }}>
                      {announcement.title || 'Annonce de don'}
                    </Text>
                  </div>
                  
                  <div style={{ marginBottom: 8 }}>
                    <Tag color={statusColors[announcement.status] || 'default'}>
                      {announcement.status === 'APPROVED' ? 'Approuvé' : 
                       announcement.status === 'PENDING' ? 'En attente' : 
                       announcement.status === 'DONATED' ? 'Donné' : 
                       announcement.status}
                    </Tag>
                    <Tag color="green" style={{ marginLeft: 4 }}>
                      {categoryLabels[announcement.category] || announcement.category}
                    </Tag>
                  </div>
                  
                  <div style={{ marginBottom: 4 }}>
                    <Text type="secondary">Quantité: </Text>
                    <Text strong>{announcement.quantity}</Text>
                  </div>
                  
                  <div style={{ marginBottom: 4 }}>
                    <Text type="secondary">Commune: </Text>
                    <Text strong>{announcement.commune}</Text>
                  </div>
                  
                  {announcement.description && (
                    <div style={{ marginBottom: 8, marginTop: 8 }}>
                      <Paragraph 
                        ellipsis={{ rows: 2, expandable: true }}
                        style={{ margin: 0, fontSize: 12 }}
                      >
                        {announcement.description}
                      </Paragraph>
                    </div>
                  )}
                  
                  <div style={{ marginTop: 8, fontSize: 11, color: '#999' }}>
                    {new Date(announcement.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <Button 
                    type="primary" 
                    size="small" 
                    icon={<GiftOutlined />}
                    block
                    style={{ marginTop: 8 }}
                  >
                    Je suis intéressé(e)
                  </Button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
