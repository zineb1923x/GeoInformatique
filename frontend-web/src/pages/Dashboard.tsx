import { Card, Col, DatePicker, Row, Select, Statistic, Table, Tag, Typography, Progress } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../utils/api';
import { GiftOutlined, CheckCircleOutlined, ClockCircleOutlined, HeartOutlined } from '@ant-design/icons';

const { Title } = Typography;

type Donation = {
  id: string;
  title?: string;
  category: string;
  quantity: number;
  commune: string;
  createdAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PARTIALLY_DONATED' | 'DONATED';
};

export default function Dashboard() {
  const [data, setData] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string | undefined>();
  const [commune, setCommune] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<any>();

  useEffect(() => {
    setLoading(true);
    api
      .get('/donations', {
        params: {
          category,
          commune,
          dateFrom: dateRange?.[0]?.toISOString?.(),
          dateTo: dateRange?.[1]?.toISOString?.()
        }
      })
      .then((res) => setData(res.data as Donation[]))
      .finally(() => setLoading(false));
  }, [category, commune, dateRange]);

  const totals = useMemo(() => {
    const total = data.length;
    const approved = data.filter((d) => d.status === 'APPROVED' || d.status === 'PARTIALLY_DONATED' || d.status === 'DONATED').length;
    const pending = data.filter((d) => d.status === 'PENDING').length;
    const donated = data.filter((d) => d.status === 'DONATED').length;
    const rejected = data.filter((d) => d.status === 'REJECTED').length;
    
    // Statistiques par catégorie
    const byCategory = data.reduce((acc, d) => {
      acc[d.category] = (acc[d.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Total quantité
    const totalQuantity = data.reduce((sum, d) => sum + (d.quantity || 0), 0);
    
    return { total, approved, pending, donated, rejected, byCategory, totalQuantity };
  }, [data]);

  const categoryLabels: Record<string, string> = {
    FOOD: 'Nourriture',
    CLOTHES: 'Vêtements',
    MEDICINE: 'Médicaments',
    OTHER: 'Autres'
  };

  return (
    <div style={{ padding: 24, display: 'grid', gap: 16 }}>
      <Title level={2}>Tableau de Bord - Statistiques des Dons</Title>
      
      {/* Statistiques principales */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="Total Annonces" 
              value={totals.total} 
              prefix={<GiftOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="Annonces Validées" 
              value={totals.approved} 
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="En Attente" 
              value={totals.pending} 
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="Total Donné" 
              value={totals.donated} 
              prefix={<HeartOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Statistiques par catégorie */}
      <Card title="Répartition par Catégorie">
        <Row gutter={[16, 16]}>
          {Object.entries(totals.byCategory).map(([cat, count]) => (
            <Col xs={24} sm={12} md={6} key={cat}>
              <Card size="small">
                <div style={{ marginBottom: 8 }}>
                  <strong>{categoryLabels[cat] || cat}</strong>
                </div>
                <Progress 
                  percent={totals.total > 0 ? Math.round((count / totals.total) * 100) : 0} 
                  format={() => `${count} annonces`}
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Filtres */}
      <Card title="Filtres">
        <Row gutter={12}>
          <Col xs={24} md={8}>
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
          <Col xs={24} md={8}>
            <DatePicker.RangePicker style={{ width: '100%' }} onChange={setDateRange} />
          </Col>
        </Row>
      </Card>

      {/* Tableau des annonces */}
      <Card title="Liste des Annonces">
        <Table
          rowKey="id"
          loading={loading}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          columns={[
            { 
              title: 'Titre', 
              dataIndex: 'title',
              render: (text) => text || 'Sans titre'
            },
            { 
              title: 'Catégorie', 
              dataIndex: 'category',
              render: (v: string) => categoryLabels[v] || v
            },
            { title: 'Quantité', dataIndex: 'quantity' },
            { title: 'Commune', dataIndex: 'commune' },
            { 
              title: 'Date', 
              dataIndex: 'createdAt',
              render: (date: string) => new Date(date).toLocaleDateString('fr-FR')
            },
            {
              title: 'Statut',
              dataIndex: 'status',
              render: (v) => (
                <Tag color={
                  v === 'APPROVED' || v === 'DONATED' || v === 'PARTIALLY_DONATED' ? 'green' : 
                  v === 'PENDING' ? 'gold' : 
                  'red'
                }>
                  {v === 'APPROVED' ? 'Approuvé' : 
                   v === 'PENDING' ? 'En attente' : 
                   v === 'DONATED' ? 'Donné' : 
                   v === 'PARTIALLY_DONATED' ? 'Partiellement donné' :
                   v === 'REJECTED' ? 'Rejeté' : v}
                </Tag>
              )
            }
          ]}
        />
      </Card>
    </div>
  );
}
