import { Button, Card, Col, DatePicker, Drawer, Input, Row, Select, Slider, Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';

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
              options={[
                { label: 'Casablanca', value: 'CASABLANCA' },
                { label: 'Rabat', value: 'RABAT' },
                { label: 'Fès', value: 'FES' },
                { label: 'Marrakech', value: 'MARRAKECH' }
              ]}
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
            { title: 'Catégorie', dataIndex: 'category' },
            { title: 'Quantité', dataIndex: 'quantity' },
            { title: 'Commune', dataIndex: 'commune' },
            { title: 'Date', dataIndex: 'createdAt' },
            {
              title: 'Statut',
              dataIndex: 'status',
              render: (v) => <Tag>{v}</Tag>
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

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.title || 'Détails annonce'} width={420}>
        {selected && (
          <div style={{ display: 'grid', gap: 8 }}>
            <div><b>Catégorie:</b> {selected.category}</div>
            <div><b>Quantité:</b> {selected.quantity}</div>
            <div><b>Commune:</b> {selected.commune}</div>
            <div><b>Date:</b> {new Date(selected.createdAt).toLocaleString()}</div>
            <Button type="primary" onClick={async () => {
              try {
                await api.post(`/donations/${selected.id}/interest`);
                message.success('Demande d’intérêt envoyée');
              } catch (e: any) {
                message.error(e?.message || 'Échec');
              }
            }}>Je suis intéressé</Button>
          </div>
        )}
      </Drawer>
    </div>
  );
}


