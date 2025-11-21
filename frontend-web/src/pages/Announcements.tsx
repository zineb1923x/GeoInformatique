import { Button, Card, Col, DatePicker, Drawer, Input, Row, Select, Slider, Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { getCommunesByRegion } from '../data/moroccanCommunes';

type Announcement = {
  id: string;
  title?: string;
  category: string;
  quantity: number;
  commune: string;
  createdAt: string;
  status: string;
};

export default function Announcements() {
  const [data, setData] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [commune, setCommune] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<any>();
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [selected, setSelected] = useState<Announcement | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get('/donations', {
        params: {
          q: search,
          category,
          commune,
          dateFrom: dateRange?.[0]?.toISOString?.(),
          dateTo: dateRange?.[1]?.toISOString?.(),
          distanceKm: distanceKm || undefined
        }
      })
      .then((res) => setData(res.data as Announcement[]))
      .finally(() => setLoading(false));
  }, [search, category, commune, dateRange, distanceKm]);

  return (
    <div style={{ padding: 24, display: 'grid', gap: 16 }}>
      <Card title="Filtrer les annonces">
        <Row gutter={12}>
          <Col xs={24} md={6}>
            <Input placeholder="Recherche (titre, description)" onChange={(e) => setSearch(e.target.value)} />
          </Col>
          <Col xs={24} md={6}>
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
          <Col xs={24} md={6}>
            <Select
              allowClear
              placeholder="Commune"
              style={{ width: '100%' }}
              onChange={setCommune}
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
          <Col xs={24} md={6}>
            <DatePicker.RangePicker style={{ width: '100%' }} onChange={setDateRange} />
          </Col>
          <Col xs={24} md={6}>
            <div>
              <div>Distance (km)</div>
              <Slider min={0} max={50} step={1} value={distanceKm} onChange={setDistanceKm as any} />
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Annonces">
        <Table
          rowKey="id"
          loading={loading}
          dataSource={data}
          columns={[
            { title: 'Titre', dataIndex: 'title' },
            { 
              title: 'Catégorie', 
              dataIndex: 'category',
              render: (v: string) => (
                v === 'FOOD' ? 'Nourriture' : 
                v === 'CLOTHES' ? 'Vêtements' :
                v === 'MEDICINE' ? 'Médicaments' : 'Autres'
              )
            },
            { title: 'Quantité', dataIndex: 'quantity' },
            { title: 'Commune', dataIndex: 'commune' },
            { title: 'Date', dataIndex: 'createdAt' },
            {
              title: 'Statut',
              dataIndex: 'status',
              render: (v) => (
                <Tag color={v === 'APPROVED' ? 'green' : v === 'PENDING' ? 'orange' : v === 'DONATED' ? 'blue' : 'default'}>
                  {v === 'APPROVED' ? 'Approuvé' : v === 'PENDING' ? 'En attente' : v === 'DONATED' ? 'Donné' : v}
                </Tag>
              )
            },
            {
              title: 'Actions',
              render: (_, r: Announcement) => (
                <Button size="small" type="link" onClick={() => setSelected(r)}>Détails</Button>
              )
            }
          ]}
        />
      </Card>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.title || 'Détails annonce'} width={500}>
        {selected && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: '#52c41a' }}>Catégorie:</strong>
                <Tag color="green" style={{ marginLeft: 8 }}>
                  {selected.category === 'FOOD' ? 'Nourriture' : 
                   selected.category === 'CLOTHES' ? 'Vêtements' :
                   selected.category === 'MEDICINE' ? 'Médicaments' : 'Autres'}
                </Tag>
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: '#52c41a' }}>Quantité:</strong> {selected.quantity} {selected.category === 'FOOD' ? 'unités' : selected.category === 'CLOTHES' ? 'articles' : 'pièces'}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: '#52c41a' }}>Commune:</strong> {selected.commune}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: '#52c41a' }}>Date de publication:</strong> {new Date(selected.createdAt).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: '#52c41a' }}>Statut:</strong>
                <Tag color={selected.status === 'APPROVED' ? 'green' : selected.status === 'PENDING' ? 'orange' : selected.status === 'DONATED' ? 'blue' : 'default'} style={{ marginLeft: 8 }}>
                  {selected.status === 'APPROVED' ? 'Approuvé' : 
                   selected.status === 'PENDING' ? 'En attente' : 
                   selected.status === 'DONATED' ? 'Donné' : selected.status}
                </Tag>
              </div>
            </div>
            {(selected as any).description && (
              <div>
                <strong style={{ color: '#52c41a', display: 'block', marginBottom: 8 }}>Description:</strong>
                <p style={{ 
                  background: '#f5f5f5', 
                  padding: 12, 
                  borderRadius: 4,
                  margin: 0,
                  lineHeight: 1.6
                }}>
                  {(selected as any).description}
                </p>
              </div>
            )}
            <Button 
              type="primary" 
              size="large" 
              block
              onClick={async () => {
                try {
                  await api.post(`/donations/${selected.id}/interest`);
                  message.success('Demande d\'intérêt envoyée avec succès !');
                  setSelected(null);
                } catch (e: any) {
                  message.error(e?.message || 'Échec de l\'envoi');
                }
              }}
            >
              Je suis intéressé(e)
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
}


