import { Card, Col, DatePicker, Row, Select, Statistic, Table, Tag } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../utils/api';

type Donation = {
  id: string;
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
    return { total, approved, pending, donated };
  }, [data]);

  return (
    <div style={{ padding: 24, display: 'grid', gap: 16 }}>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="Total annonces" value={totals.total} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="Validées" value={totals.approved} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="En attente" value={totals.pending} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="Données (complètes)" value={totals.donated} /></Card></Col>
      </Row>

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

      <Card title="Dernières annonces">
        <Table
          rowKey="id"
          loading={loading}
          dataSource={data}
          columns={[
            { title: 'Catégorie', dataIndex: 'category' },
            { title: 'Quantité', dataIndex: 'quantity' },
            { title: 'Commune', dataIndex: 'commune' },
            { title: 'Date', dataIndex: 'createdAt' },
            {
              title: 'Statut',
              dataIndex: 'status',
              render: (v) => (
                <Tag color={v === 'APPROVED' || v === 'DONATED' || v === 'PARTIALLY_DONATED' ? 'green' : v === 'PENDING' ? 'gold' : 'red'}>
                  {v}
                </Tag>
              )
            }
          ]}
        />
      </Card>
    </div>
  );
}
