import { Button, Form, Input, Typography, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setSubmitting(true);
      await register({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        password: values.password
      });
      message.success('Inscription réussie');
      // Si l'API ne renvoie pas de token à l'inscription, on ne bloque pas
      navigate('/');
    } catch (e: any) {
      message.error(e?.message || "Échec de l'inscription");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 520 }}>
      <Typography.Title level={2}>Inscription</Typography.Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Nom" name="lastName" rules={[{ required: true, message: 'Nom requis' }]}>
          <Input placeholder="Nom" />
        </Form.Item>
        <Form.Item label="Prénom" name="firstName" rules={[{ required: true, message: 'Prénom requis' }]}>
          <Input placeholder="Prénom" />
        </Form.Item>
        <Form.Item label="Téléphone" name="phone" rules={[{ required: true, message: 'Téléphone requis' }]}>
          <Input placeholder="Téléphone" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Email valide requis' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Mot de passe" name="password" rules={[{ required: true, min: 6, message: 'Min 6 caractères' }]}>
          <Input.Password placeholder="Mot de passe" />
        </Form.Item>
        <Form.Item
          label="Confirmer mot de passe"
          name="confirm"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Confirmation requise' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) return Promise.resolve();
                return Promise.reject(new Error('Les mots de passe ne correspondent pas'));
              }
            })
          ]}
        >
          <Input.Password placeholder="Confirmer" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>Créer le compte</Button>
      </Form>
    </div>
  );
}


