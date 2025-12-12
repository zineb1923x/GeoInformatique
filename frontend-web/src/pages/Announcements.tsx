import { Button, Card, Col, DatePicker, Drawer, Input, Row, Select, Slider, Table, Tag, message, Divider } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
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
  donatedQuantity?: number;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  contactEmail?: string;
  contactPhone?: string;
};

type InterestRecord = {
  announcementId: string;
  interestId: string;
};

export default function Announcements() {
  const [data, setData] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [communes, setCommunes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<any>();
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [interestedRecords, setInterestedRecords] = useState<InterestRecord[]>(() => {
    try {
      const stored = localStorage.getItem('sadaka_interest_records');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('sadaka_interest_records', JSON.stringify(interestedRecords));
  }, [interestedRecords]);

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
      .then((res) => setData(res.data as Announcement[]))
      .finally(() => setLoading(false));
  }, [search, category, communes, dateRange, distanceKm]);

  const isInterested = useMemo(
    () => (announcementId: string) => interestedRecords.some((r) => r.announcementId === announcementId),
    [interestedRecords]
  );

  const getInterestId = (announcementId: string) =>
    interestedRecords.find((r) => r.announcementId === announcementId)?.interestId;

  const handleToggleInterest = async (announcement: Announcement) => {
    if (!announcement) return;
    const alreadyInterested = isInterested(announcement.id);
    try {
      if (!alreadyInterested) {
        const res = await api.post(`/donations/${announcement.id}/interest`);
        const interestId = res.data?.interestId || `local-${Date.now()}`;
        setInterestedRecords((prev) => [...prev, { announcementId: announcement.id, interestId }]);
        message.success('Demande d\'intérêt envoyée');
        setSelected(null);
      } else {
        const interestId = getInterestId(announcement.id);
        await api.delete(`/donations/${announcement.id}/interest`, { data: { interestId } });
        setInterestedRecords((prev) => prev.filter((r) => r.announcementId !== announcement.id));
        message.info('Demande d\'intérêt retirée');
        setSelected(null);
      }
    } catch (e: any) {
      message.error(e?.message || 'Action impossible');
    }
  };

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
          <Col xs={24} md={8}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Communes (une ou plusieurs)"
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
          <Col xs={24} md={8}>
            <DatePicker.RangePicker style={{ width: '100%' }} onChange={setDateRange} />
          </Col>
          <Col xs={24} md={8}>
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
              render: (v) => {
                const color = v === 'APPROVED' || v === 'DONATED' ? 'green' : v === 'PENDING' ? 'orange' : 'default';
                return (
                  <Tag color={color}>
                    {v === 'APPROVED' ? 'Approuvé' : v === 'PENDING' ? 'En attente' : v === 'DONATED' ? 'Donné' : v}
                  </Tag>
                );
              }
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

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.title || 'Détails annonce'} width={520}>
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
                {typeof selected.donatedQuantity === 'number' && (
                  <span style={{ marginLeft: 8, color: '#999' }}>
                    ({selected.quantity - (selected.donatedQuantity || 0)} disponibles)
                  </span>
                )}
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
                <Tag color={selected.status === 'APPROVED' || selected.status === 'DONATED' ? 'green' : selected.status === 'PENDING' ? 'orange' : 'default'} style={{ marginLeft: 8 }}>
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
            {(selected.ownerName || selected.ownerEmail || selected.ownerPhone) && (
              <>
                <Divider>Contact du donateur</Divider>
                <div style={{ display: 'grid', gap: 6 }}>
                  {selected.ownerName && (
                    <div><UserOutlined /> <strong style={{ marginLeft: 6 }}>{selected.ownerName}</strong></div>
                  )}
                  {selected.ownerEmail && (
                    <div><MailOutlined /> <span style={{ marginLeft: 6 }}>{selected.ownerEmail}</span></div>
                  )}
                  {(selected.ownerPhone || selected.contactPhone) && (
                    <div><PhoneOutlined /> <span style={{ marginLeft: 6 }}>{selected.ownerPhone || selected.contactPhone}</span></div>
                  )}
                </div>
              </>
            )}
            <Button 
              type={isInterested(selected.id) ? 'default' : 'primary'}
              danger={isInterested(selected.id)}
              size="large" 
              block
              onClick={() => handleToggleInterest(selected)}
              disabled={selected.quantity - (selected.donatedQuantity || 0) <= 0}
            >
              {isInterested(selected.id) ? 'Retirer ma demande' : 'Je suis intéressé(e)'}
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
}


