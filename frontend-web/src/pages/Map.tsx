import { useState, useEffect } from 'react';
import { Card, Col, Row, Select, Input, DatePicker, Slider, Space, Typography } from 'antd';
import MapView from '../components/MapView';
import { api } from '../utils/api';
import { getCommunesByRegion } from '../data/moroccanCommunes';

const { Title } = Typography;

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

export default function MapPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [communes, setCommunes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<any>();
  const [distanceKm, setDistanceKm] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    api
      .get('/donations', {
        params: {
          q: search,
          category,
          communes: communes.length ? communes : undefined,
          dateFrom: dateRange?.[0]?.toISOString?.(),
          dateTo: dateRange?.[1]?.toISOString?.(),
          distanceKm: distanceKm || undefined
        }
      })
      .then((res) => {
        const data = res.data as Announcement[];
        // Filtrer seulement les annonces avec coordonnées
        setAnnouncements(data.filter(a => a.latitude && a.longitude));
      })
      .finally(() => setLoading(false));
  }, [search, category, communes, dateRange, distanceKm]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: 16, background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0, marginBottom: 16 }}>
          Carte SIG - Géolocalisation des Dons
        </Title>
        <Card size="small">
          <Row gutter={12}>
            <Col xs={24} sm={12} md={6}>
              <Input 
                placeholder="Recherche (titre, description)" 
                onChange={(e) => setSearch(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                allowClear
                placeholder="Catégorie"
                style={{ width: '100%' }}
                onChange={setCategory}
                options={[
                  { label: 'Nourriture', value: 'FOOD' },
                  { label: 'Vêtements', value: 'CLOTHES' },
                  { label: 'Médicaments', value: 'MEDICINE' },
                  { label: 'Autres', value: 'OTHER' }
                ]}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                mode="multiple"
                allowClear
                placeholder="Communes (sélection multiple)"
                style={{ width: '100%' }}
                value={communes}
                onChange={(vals) => setCommunes(vals)}
                options={Object.entries(getCommunesByRegion()).map(([region, communes]) => ({
                  label: region,
                  options: communes.map(commune => ({ label: commune.label, value: commune.value }))
                }))}
                showSearch
                filterOption={(input, option) => 
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <DatePicker.RangePicker 
                style={{ width: '100%' }} 
                onChange={setDateRange}
                format="DD/MM/YYYY"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <span>Distance: {distanceKm} km</span>
                <Slider 
                  min={0} 
                  max={50} 
                  step={5} 
                  value={distanceKm} 
                  onChange={setDistanceKm}
                  tooltip={{ formatter: (value) => `${value} km` }}
                />
              </Space>
            </Col>
          </Row>
        </Card>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <MapView announcements={announcements} loading={loading} />
      </div>
    </div>
  );
}
