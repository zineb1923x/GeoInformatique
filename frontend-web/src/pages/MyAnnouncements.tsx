import { Card, Table, Tag, Button, Empty, Typography, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

type MyAnn = { 
  id: string; 
  title?: string; 
  category: string; 
  quantity: number; 
  status: string; 
  createdAt: string;
  commune?: string;
  description?: string;
};

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

  const categoryLabels: Record<string, string> = {
    FOOD: 'Nourriture',
    CLOTHES: 'Vêtements',
    MEDICINE: 'Médicaments',
    OTHER: 'Autres'
  };

  const statusLabels: Record<string, string> = {
    PENDING: 'En attente',
    APPROVED: 'Approuvé',
    REJECTED: 'Rejeté',
    DONATED: 'Donné',
    PARTIALLY_DONATED: 'Partiellement donné'
  };

  const statusColors: Record<string, string> = {
    PENDING: 'orange',
    APPROVED: 'green',
    REJECTED: 'red',
    DONATED: 'blue',
    PARTIALLY_DONATED: 'cyan'
  };

  return (
    <div style={{ padding: 24 }}>
      <Card 
        title={
          <Space>
            <Title level={4} style={{ margin: 0 }}>Mes annonces</Title>
            <Link to="/create-announcement">
              <Button type="primary" icon={<PlusOutlined />}>
                Créer une annonce
              </Button>
            </Link>
          </Space>
        }
      >
        {data.length === 0 && !loading ? (
          <Empty
            description={
              <div>
                <Text type="secondary" style={{ fontSize: 16, display: 'block', marginBottom: 16 }}>
                  Vous n'avez pas encore créé d'annonces
                </Text>
                <Link to="/create-announcement">
                  <Button type="primary" icon={<PlusOutlined />} size="large">
                    Créer ma première annonce
                  </Button>
                </Link>
              </div>
            }
          />
        ) : (
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
                render: (cat: string) => (
                  <Tag color="blue">{categoryLabels[cat] || cat}</Tag>
                )
              },
              { title: 'Quantité', dataIndex: 'quantity' },
              { 
                title: 'Commune', 
                dataIndex: 'commune',
                render: (commune) => commune || '-'
              },
              { 
                title: 'Date', 
                dataIndex: 'createdAt',
                render: (date: string) => new Date(date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              },
              { 
                title: 'Statut', 
                dataIndex: 'status', 
                render: (v: string) => (
                  <Tag color={statusColors[v] || 'default'}>
                    {statusLabels[v] || v}
                  </Tag>
                )
              }
            ]}
          />
        )}
      </Card>
    </div>
  );
}


