import { Button, Card, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { api } from '../utils/api';

const communes = [
  { label: 'Casablanca', value: 'CASABLANCA', centroid: [33.5731, -7.5898] },
  { label: 'Rabat', value: 'RABAT', centroid: [34.0209, -6.8416] },
  { label: 'Fès', value: 'FES', centroid: [34.0333, -5.0000] },
  { label: 'Marrakech', value: 'MARRAKECH', centroid: [31.6295, -7.9811] }
];

export default function CreateAnnouncement() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onCommuneChange = (val: string) => {
    const c = communes.find((x) => x.value === val);
    if (c) {
      form.setFieldsValue({ latitude: c.centroid[0], longitude: c.centroid[1] });
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
          <Form.Item label="Photos" name="photos" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
            <Upload beforeUpload={() => false} multiple>
              <Button icon={<UploadOutlined />}>Ajouter des photos</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Commune" name="commune" rules={[{ required: true, message: 'Commune requise' }]}>
            <Select options={communes} onChange={onCommuneChange} />
          </Form.Item>
          <div style={{ display: 'flex', gap: 12 }}>
            <Form.Item label="Latitude" name="latitude" rules={[{ required: true, message: 'Latitude requise' }]}>
              <Input style={{ width: 200 }} />
            </Form.Item>
            <Form.Item label="Longitude" name="longitude" rules={[{ required: true, message: 'Longitude requise' }]}>
              <Input style={{ width: 200 }} />
            </Form.Item>
          </div>
          <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>Publier</Button>
        </Form>
      </Card>
    </div>
  );
}


