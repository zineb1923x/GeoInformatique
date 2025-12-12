import { Button, Card, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { UploadOutlined, AimOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { api } from '../utils/api';
import { moroccanCommunes, getCommunesByRegion } from '../data/moroccanCommunes';
import { useAuth } from '../context/AuthContext';

// Organiser les communes par région pour le Select groupé
const communesByRegion = getCommunesByRegion();
const communeOptions = Object.entries(communesByRegion).map(([region, communes]) => ({
  label: region,
  options: communes.map(commune => ({ label: commune.label, value: commune.value }))
}));

export default function CreateAnnouncement() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const defaultDeviceId = useMemo(() => `IME-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, []);

  const onCommuneChange = (val: string) => {
    const c = moroccanCommunes.find((x) => x.value === val);
    if (c) {
      form.setFieldsValue({ latitude: c.centroid[0], longitude: c.centroid[1] });
    }
  };
  
  // Fonction pour obtenir la géolocalisation actuelle de l'utilisateur
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setSubmitting(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Trouver la commune la plus proche
          let closestCommune = moroccanCommunes[0];
          let minDistance = Number.MAX_VALUE;
          
          moroccanCommunes.forEach(commune => {
            const distance = Math.sqrt(
              Math.pow(commune.centroid[0] - latitude, 2) + 
              Math.pow(commune.centroid[1] - longitude, 2)
            );
            
            if (distance < minDistance) {
              minDistance = distance;
              closestCommune = commune;
            }
          });
          
          form.setFieldsValue({ 
            commune: closestCommune.value,
            latitude: latitude,
            longitude: longitude
          });
          
          setSubmitting(false);
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          message.error("Impossible d'obtenir votre position. Veuillez sélectionner manuellement.");
          setSubmitting(false);
        }
      );
    } else {
      message.error("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
  };

  const onFinish = async (values: any) => {
    try {
      setSubmitting(true);
      const payload = {
        title: values.title,
        category: values.category === 'OTHER' ? values.categoryOther : values.category,
        quantity: values.quantity,
        description: values.description,
        commune: values.commune,
        latitude: values.latitude,
        longitude: values.longitude,
         contactEmail: values.contactEmail,
         contactPhone: values.contactPhone,
         deviceId: values.deviceId,
        // placeholder for files; in real API you'd send FormData
        photos: (values.photos?.fileList || []).map((f: any) => ({ name: f.name }))
      };
      await api.post('/donations', payload);
      message.success('Annonce créée');
      form.resetFields();
    } catch (e: any) {
      message.error(e?.message || "Échec de création");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title="Créer une annonce">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Titre" name="title" rules={[{ required: true, message: 'Titre requis' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Catégorie" name="category" rules={[{ required: true, message: 'Catégorie requise' }]}>
            <Select
              options={[
                { label: 'Nourriture', value: 'FOOD' },
                { label: 'Vêtements', value: 'CLOTHES' },
                { label: 'Médicaments', value: 'MEDICINE' },
                { label: 'Autres', value: 'OTHER' }
              ]}
            />
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(p, n) => p.category !== n.category}>
            {({ getFieldValue }) =>
              getFieldValue('category') === 'OTHER' ? (
                <Form.Item label="Autre catégorie" name="categoryOther" rules={[{ required: true, message: 'Préciser la catégorie' }]}>
                  <Input />
                </Form.Item>
              ) : null
            }
          </Form.Item>
          <Form.Item label="Quantité" name="quantity" rules={[{ required: true, message: 'Quantité requise' }]}>
            <InputNumber min={1} style={{ width: 160 }} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Email de contact"
            name="contactEmail"
            initialValue={user?.email}
            rules={[{ required: true, type: 'email', message: 'Email de contact requis' }]}
          >
            <Input placeholder="contact@sadaka.ma" />
          </Form.Item>
          <Form.Item
            label="Téléphone de contact"
            name="contactPhone"
            rules={[
              { required: true, message: 'Téléphone de contact requis' },
              { pattern: /^[0-9+\s()-]{8,15}$/, message: 'Format de téléphone invalide' }
            ]}
          >
            <Input placeholder="+212 6 12 34 56 78" />
          </Form.Item>
          <Form.Item label="Photos" name="photos" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
            <Upload beforeUpload={() => false} multiple>
              <Button icon={<UploadOutlined />}>Ajouter des photos</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Commune" name="commune" rules={[{ required: true, message: 'Commune requise' }]}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Select 
                style={{ flex: 1 }} 
                options={communeOptions} 
                onChange={onCommuneChange} 
                showSearch
                filterOption={(input, option) => 
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
              <Button 
                icon={<AimOutlined />} 
                onClick={getCurrentLocation} 
                loading={submitting}
                title="Utiliser ma position actuelle"
              />
            </div>
          </Form.Item>
          <div style={{ display: 'flex', gap: 12 }}>
            <Form.Item label="Latitude" name="latitude" rules={[{ required: true, message: 'Latitude requise' }]}>
              <Input style={{ width: 200 }} />
            </Form.Item>
            <Form.Item label="Longitude" name="longitude" rules={[{ required: true, message: 'Longitude requise' }]}>
              <Input style={{ width: 200 }} />
            </Form.Item>
          </div>
          <Form.Item
            label="Identifiant du poste (IME)"
            name="deviceId"
            initialValue={defaultDeviceId}
            rules={[{ required: true, message: 'Identifiant du poste requis' }]}
          >
            <Input placeholder="IME-XXXXXX" />
          </Form.Item>
          <p style={{ color: '#888', marginTop: -8, marginBottom: 16 }}>
            Cet identifiant permet de tracer l&apos;appareil ayant déclaré le don (exigence sécurité).
          </p>
          <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>Publier</Button>
        </Form>
      </Card>
    </div>
  );
}


