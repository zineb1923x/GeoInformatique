import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { HomeOutlined, GlobalOutlined, BarChartOutlined, SettingOutlined, LoginOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const items = [
  { key: '/', icon: <HomeOutlined />, label: <Link to="/">Accueil</Link> },
  { key: '/map', icon: <GlobalOutlined />, label: <Link to="/map">Carte</Link> },
  { key: '/dashboard', icon: <BarChartOutlined />, label: <Link to="/dashboard">Dashboard</Link> },
  { key: '/admin', icon: <SettingOutlined />, label: <Link to="/admin">Admin</Link> },
  { key: '/login', icon: <LoginOutlined />, label: <Link to="/login">Connexion</Link> }
];

export default function AppLayout() {
  const location = useLocation();
  const selectedKey = items.find(i => location.pathname === i.key)?.key ?? '/';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontWeight: 600, marginRight: 24 }}>SADAKA</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          style={{ flex: 1 }}
        />
      </Header>
      <Content style={{ height: '100%' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>SADAKA © {new Date().getFullYear()}</Footer>
    </Layout>
  );
}
