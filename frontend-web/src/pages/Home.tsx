import { Card, Col, Row, Statistic, Typography, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, GlobalOutlined, BarChartOutlined, GiftOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <Title level={1} style={{ color: '#1890ff' }}>
          SADAKA
        </Title>
        <Title level={3}>Plateforme de Gestion des Dons</Title>
        <Paragraph style={{ fontSize: 16, color: '#666' }}>
          Connectez les généreux donateurs avec ceux qui en ont besoin. 
          Faites une différence dans votre communauté.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 48 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Dons Actifs"
              value={15}
              prefix={<GiftOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Communes Couvertes"
              value={12}
              prefix={<GlobalOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Familles Aidées"
              value={128}
              prefix={<HeartOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Catégories"
              value={4}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <Title level={3}>Comment ça fonctionne ?</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>1️⃣</div>
              <Title level={4}>Créez une annonce</Title>
              <Paragraph>
                Déposez une annonce de don avec les détails de ce que vous souhaitez donner.
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>2️⃣</div>
              <Title level={4}>Validation</Title>
              <Paragraph>
                Notre équipe vérifie et valide votre annonce pour garantir la qualité.
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>3️⃣</div>
              <Title level={4}>Mise en relation</Title>
              <Paragraph>
                Les personnes intéressées peuvent vous contacter et récupérer le don.
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Card>

      <Card>
        <Title level={3}>Actions rapides</Title>
        <Space size="large" wrap>
          <Link to="/announcements">
            <Button type="primary" size="large" icon={<GlobalOutlined />}>
              Voir les annonces
            </Button>
          </Link>
          <Link to="/create-announcement">
            <Button size="large" icon={<GiftOutlined />}>
              Créer une annonce
            </Button>
          </Link>
          <Link to="/map">
            <Button size="large" icon={<GlobalOutlined />}>
              Voir sur la carte
            </Button>
          </Link>
          <Link to="/login">
            <Button size="large">
              Se connecter
            </Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
}
