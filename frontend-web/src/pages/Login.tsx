import { Button, Form, Input, Typography, message } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setSubmitting(true);
      await login(values.email, values.password);
      message.success('Connecté');
      navigate('/');
    } catch (e: any) {
      message.error(e?.message || 'Échec de connexion');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Typography.Title level={2}>Connexion</Typography.Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Email valide requis' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Mot de passe" name="password" rules={[{ required: true, message: 'Mot de passe requis' }]}>
          <Input.Password placeholder="Mot de passe" />
        </Form.Item>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>Se connecter</Button>
          <Link to="/register">Créer un compte</Link>
        </div>
      </Form>
    </div>
  );
}
