import { Button, Card, Form, Input, Modal, Space, Table, Tabs, Tag, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../utils/api';

type Role = { id: string; name: string; description?: string };
type PendingDonation = { id: string; category: string; quantity: number; commune: string; createdAt: string };

export default function Admin() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [form] = Form.useForm();

  const [pending, setPending] = useState<PendingDonation[]>([]);
  const [pendingLoading, setPendingLoading] = useState(false);

  const loadRoles = () => {
    setRolesLoading(true);
    api
      .get('/roles')
      .then((res) => setRoles(res.data as Role[]))
      .finally(() => setRolesLoading(false));
  };

  const loadPending = () => {
    setPendingLoading(true);
    api
      .get('/donations', { params: { status: 'PENDING' } })
      .then((res) => setPending(res.data as PendingDonation[]))
      .finally(() => setPendingLoading(false));
  };

  useEffect(() => {
    loadRoles();
    loadPending();
  }, []);

  const openCreate = () => {
    setEditingRole(null);
    form.resetFields();
    setRoleModalOpen(true);
  };
  const openEdit = (role: Role) => {
    setEditingRole(role);
    form.setFieldsValue(role);
    setRoleModalOpen(true);
  };

  const saveRole = async () => {
    const values = await form.validateFields();
    try {
      if (editingRole) {
        await api.put(`/roles/${editingRole.id}`, values);
        message.success('Rôle mis à jour');
      } else {
        await api.post('/roles', values);
        message.success('Rôle créé');
      }
      setRoleModalOpen(false);
      loadRoles();
    } catch (e) {
      message.error('Erreur lors de la sauvegarde');
    }
  };

  const deleteRole = async (role: Role) => {
    try {
      await api.delete(`/roles/${role.id}`);
      message.success('Rôle supprimé');
      loadRoles();
    } catch (e) {
      message.error('Suppression impossible');
    }
  };

  const approve = async (id: string) => {
    try {
      await api.post(`/donations/${id}/approve`);
      message.success('Annonce validée');
      loadPending();
    } catch {
      message.error('Erreur de validation');
    }
  };
  const reject = async (id: string) => {
    try {
      await api.post(`/donations/${id}/reject`, { reason: 'Non conforme' });
      message.success('Annonce rejetée');
      loadPending();
    } catch {
      message.error('Erreur du rejet');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Tabs
        items={[
          {
            key: 'roles',
            label: 'Rôles',
            children: (
              <Card
                title="Gestion des rôles"
                extra={<Button type="primary" onClick={openCreate}>Nouveau rôle</Button>}
              >
                <Table
                  rowKey="id"
                  loading={rolesLoading}
                  dataSource={roles}
                  columns={[
                    { title: 'Nom', dataIndex: 'name' },
                    { title: 'Description', dataIndex: 'description' },
                    {
                      title: 'Actions',
                      render: (_, r: Role) => (
                        <Space>
                          <Button size="small" onClick={() => openEdit(r)}>Modifier</Button>
                          <Button size="small" danger onClick={() => deleteRole(r)}>Supprimer</Button>
                        </Space>
                      )
                    }
                  ]}
                />
                <Modal
                  title={editingRole ? 'Modifier le rôle' : 'Créer un rôle'}
                  open={roleModalOpen}
                  onCancel={() => setRoleModalOpen(false)}
                  onOk={saveRole}
                >
                  <Form layout="vertical" form={form}>
                    <Form.Item label="Nom" name="name" rules={[{ required: true, message: 'Nom requis' }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                      <Input.TextArea rows={3} />
                    </Form.Item>
                  </Form>
                </Modal>
              </Card>
            )
          },
          {
            key: 'pending',
            label: 'Annonces en attente',
            children: (
              <Card title="Validation des annonces">
                <Table
                  rowKey="id"
                  loading={pendingLoading}
                  dataSource={pending}
                  columns={[
                    { title: 'Catégorie', dataIndex: 'category' },
                    { title: 'Quantité', dataIndex: 'quantity' },
                    { title: 'Commune', dataIndex: 'commune' },
                    { title: 'Date', dataIndex: 'createdAt' },
                    {
                      title: 'Actions',
                      render: (_, r: PendingDonation) => (
                        <Space>
                          <Button type="primary" size="small" onClick={() => approve(r.id)}>Valider</Button>
                          <Button danger size="small" onClick={() => reject(r.id)}>Rejeter</Button>
                        </Space>
                      )
                    }
                  ]}
                />
              </Card>
            )
          }
        ]}
      />
    </div>
  );
}
