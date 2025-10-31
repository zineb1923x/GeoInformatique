import { Card, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

type MyAnn = { id: string; title?: string; category: string; quantity: number; status: string; createdAt: string };

export default function MyAnnouncements() {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState<MyAnn[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    api
      .get('/me/donations')
      .then((res) => setData(res.data as MyAnn[]))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  return (
    <div style={{ padding: 24 }}>
      <Card title="Mes annonces">
        <Table
          rowKey="id"
          loading={loading}
          dataSource={data}
          columns={[
            { title: 'Titre', dataIndex: 'title' },
            { title: 'Catégorie', dataIndex: 'category' },
            { title: 'Quantité', dataIndex: 'quantity' },
            { title: 'Date', dataIndex: 'createdAt' },
            { title: 'Statut', dataIndex: 'status', render: (v) => <Tag>{v}</Tag> }
          ]}
        />
      </Card>
    </div>
  );
}


