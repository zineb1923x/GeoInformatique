import { Card, Table, Tag, Button, Empty, Typography, Space, Modal, InputNumber, Descriptions, message, Divider, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { Link } from 'react-router-dom';
import { PlusOutlined, UserOutlined, PhoneOutlined, MailOutlined, CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

type MyAnn = { 
  id: string; 
  title?: string; 
  category: string; 
  quantity: number;
  donatedQuantity?: number;
  status: string; 
  createdAt: string;
  commune?: string;
  description?: string;
  deviceId?: string;
  contactEmail?: string;
  contactPhone?: string;
};

type InterestRequest = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  requestedQuantity?: number;
  requestedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

export default function MyAnnouncements() {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState<MyAnn[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<MyAnn | null>(null);
  const [interests, setInterests] = useState<InterestRequest[]>([]);
  const [interestsLoading, setInterestsLoading] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<InterestRequest | null>(null);
  const [assignQuantity, setAssignQuantity] = useState<number>(1);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    api
      .get('/me/donations')
      .then((res) => setData(res.data as MyAnn[]))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const loadInterests = async (announcementId: string) => {
    setInterestsLoading(true);
    try {
      const res = await api.get(`/donations/${announcementId}/interests`);
      setInterests(res.data as InterestRequest[]);
    } catch (e) {
      // Mock data si l'endpoint n'existe pas
      setInterests([
        {
          id: 'i1',
          userId: 'u4',
          userName: 'Aicha Benali',
          userEmail: 'aicha@example.com',
          userPhone: '0612345681',
          requestedQuantity: 10,
          requestedAt: new Date().toISOString(),
          status: 'PENDING'
        },
        {
          id: 'i2',
          userId: 'u5',
          userName: 'Hassan Alami',
          userEmail: 'hassan@example.com',
          userPhone: '0612345682',
          requestedQuantity: 5,
          requestedAt: new Date(Date.now() - 86400000).toISOString(),
          status: 'PENDING'
        }
      ]);
    } finally {
      setInterestsLoading(false);
    }
  };

  const handleViewInterests = (announcement: MyAnn) => {
    setSelectedAnnouncement(announcement);
    loadInterests(announcement.id);
  };

  const handleAssign = async () => {
    if (!selectedAnnouncement || !selectedInterest) return;
    
    if (assignQuantity > (selectedAnnouncement.quantity - (selectedAnnouncement.donatedQuantity || 0))) {
      message.error('Quantité demandée supérieure à la quantité disponible');
      return;
    }

    try {
      await api.post(`/donations/${selectedAnnouncement.id}/assign`, {
        interestId: selectedInterest.id,
        quantity: assignQuantity
      });
      message.success(`Quantité de ${assignQuantity} assignée avec succès`);
      setAssignModalOpen(false);
      setSelectedInterest(null);
      // Recharger les données
      const res = await api.get('/me/donations');
      setData(res.data as MyAnn[]);
      loadInterests(selectedAnnouncement.id);
    } catch (e: any) {
      message.error(e?.message || 'Erreur lors de l\'assignation');
    }
  };

  const handleDeleteInterest = async (interestId: string) => {
    try {
      await api.delete(`/interests/${interestId}`);
      message.success('Demande d\'intérêt supprimée');
      if (selectedAnnouncement) {
        loadInterests(selectedAnnouncement.id);
      }
    } catch (e: any) {
      message.error(e?.message || 'Erreur lors de la suppression');
    }
  };

  const handleDeleteAnnouncement = async (announcement: MyAnn) => {
    try {
      await api.delete(`/donations/${announcement.id}`);
      message.success('Annonce supprimée');
      const res = await api.get('/me/donations');
      setData(res.data as MyAnn[]);
    } catch (e: any) {
      message.error(e?.message || 'Suppression impossible');
    }
  };

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
                  <Tag color="green">{categoryLabels[cat] || cat}</Tag>
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
                title: 'Quantité disponible', 
                render: (_, record: MyAnn) => {
                  const available = record.quantity - (record.donatedQuantity || 0);
                  return (
                    <div>
                      <Text strong>{available}</Text>
                      {record.donatedQuantity && record.donatedQuantity > 0 && (
                        <Text type="secondary" style={{ marginLeft: 8 }}>
                          ({record.donatedQuantity} donné{record.donatedQuantity > 1 ? 's' : ''})
                        </Text>
                      )}
                    </div>
                  );
                }
              },
              { 
                title: 'Statut', 
                dataIndex: 'status', 
                render: (v: string) => (
                  <Tag color={statusColors[v] || 'default'}>
                    {statusLabels[v] || v}
                  </Tag>
                )
              },
              {
                title: 'Actions',
                render: (_, record: MyAnn) => (
                  <Space>
                    <Button 
                      size="small" 
                      type="primary"
                      onClick={() => handleViewInterests(record)}
                    >
                      Voir demandeurs
                    </Button>
                    <Popconfirm
                      title="Supprimer cette annonce ?"
                      okText="Oui"
                      cancelText="Non"
                      onConfirm={() => handleDeleteAnnouncement(record)}
                    >
                      <Button size="small" danger>
                        Supprimer
                      </Button>
                    </Popconfirm>
                  </Space>
                )
              }
            ]}
          />
        )}
      </Card>

      {/* Modal pour voir les demandeurs */}
      <Modal
        title={`Demandeurs - ${selectedAnnouncement?.title || 'Annonce'}`}
        open={!!selectedAnnouncement}
        onCancel={() => {
          setSelectedAnnouncement(null);
          setInterests([]);
        }}
        footer={null}
        width={800}
      >
        {selectedAnnouncement && (
          <div>
            <Descriptions column={2} bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="Quantité totale">{selectedAnnouncement.quantity}</Descriptions.Item>
              <Descriptions.Item label="Quantité disponible">
                {selectedAnnouncement.quantity - (selectedAnnouncement.donatedQuantity || 0)}
              </Descriptions.Item>
              <Descriptions.Item label="Quantité donnée">{selectedAnnouncement.donatedQuantity || 0}</Descriptions.Item>
              <Descriptions.Item label="Catégorie">
                <Tag color="green">{categoryLabels[selectedAnnouncement.category] || selectedAnnouncement.category}</Tag>
              </Descriptions.Item>
            </Descriptions>

            <Divider>Liste des demandeurs</Divider>

            <Table
              rowKey="id"
              loading={interestsLoading}
              dataSource={interests}
              pagination={{ pageSize: 5 }}
              columns={[
                {
                  title: 'Demandeur',
                  render: (_, interest: InterestRequest) => (
                    <div>
                      <div><UserOutlined /> <Text strong>{interest.userName}</Text></div>
                      <div style={{ marginTop: 4 }}>
                        <MailOutlined /> <Text type="secondary" style={{ fontSize: 12 }}>{interest.userEmail}</Text>
                      </div>
                      {interest.userPhone && (
                        <div style={{ marginTop: 4 }}>
                          <PhoneOutlined /> <Text type="secondary" style={{ fontSize: 12 }}>{interest.userPhone}</Text>
                        </div>
                      )}
                    </div>
                  )
                },
                {
                  title: 'Quantité demandée',
                  render: (_, interest: InterestRequest) => interest.requestedQuantity || 'Tout'
                },
                {
                  title: 'Date de demande',
                  dataIndex: 'requestedAt',
                  render: (date: string) => new Date(date).toLocaleDateString('fr-FR')
                },
                {
                  title: 'Statut',
                  dataIndex: 'status',
                  render: (status: string) => (
                    <Tag color={status === 'APPROVED' ? 'green' : status === 'REJECTED' ? 'red' : 'orange'}>
                      {status === 'APPROVED' ? 'Approuvé' : status === 'REJECTED' ? 'Rejeté' : 'En attente'}
                    </Tag>
                  )
                },
                {
                  title: 'Actions',
                  render: (_, interest: InterestRequest) => {
                    const available = selectedAnnouncement.quantity - (selectedAnnouncement.donatedQuantity || 0);
                    return (
                      <Space>
                        <Button
                          size="small"
                          type="primary"
                          icon={<CheckOutlined />}
                          onClick={() => {
                            setSelectedInterest(interest);
                            setAssignQuantity(interest.requestedQuantity || available);
                            setAssignModalOpen(true);
                          }}
                          disabled={available <= 0 || interest.status === 'APPROVED'}
                        >
                          Assigner
                        </Button>
                        <Button
                          size="small"
                          danger
                          onClick={() => handleDeleteInterest(interest.id)}
                        >
                          Supprimer
                        </Button>
                      </Space>
                    );
                  }
                }
              ]}
            />
          </div>
        )}
      </Modal>

      {/* Modal pour assigner une quantité */}
      <Modal
        title="Assigner une quantité"
        open={assignModalOpen}
        onOk={handleAssign}
        onCancel={() => {
          setAssignModalOpen(false);
          setSelectedInterest(null);
        }}
      >
        {selectedInterest && selectedAnnouncement && (
          <div>
            <p><strong>Demandeur:</strong> {selectedInterest.userName}</p>
            <p><strong>Email:</strong> {selectedInterest.userEmail}</p>
            {selectedInterest.userPhone && <p><strong>Téléphone:</strong> {selectedInterest.userPhone}</p>}
            <Divider />
            <p><strong>Quantité disponible:</strong> {selectedAnnouncement.quantity - (selectedAnnouncement.donatedQuantity || 0)}</p>
            <p><strong>Quantité à assigner:</strong></p>
            <InputNumber
              min={1}
              max={selectedAnnouncement.quantity - (selectedAnnouncement.donatedQuantity || 0)}
              value={assignQuantity}
              onChange={(val) => setAssignQuantity(val || 1)}
              style={{ width: '100%' }}
            />
            <p style={{ marginTop: 8, fontSize: 12, color: '#999' }}>
              Après assignation, la quantité sera décomptée de votre annonce.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}


