import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './portal.scss'
import RouterBeforeEach from '../../../routers/RouterBeforeEach'


const { Header, Sider, Content } = Layout;


function getItem(label, key, icon,  children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('首页', '/admin/home', <PieChartOutlined />),
  getItem('上传', '/admin/upload', <DesktopOutlined />),
  getItem('工具管理', '/admin/toolchest', <DesktopOutlined />),

  getItem('文章管理', 'article', <MailOutlined />, [
    getItem('添加文章', '/admin/article'),
    getItem('素材管理', '/admin/article/sucai'),
  ]),

  getItem('工具管理', 'tool', <AppstoreOutlined />, [
    getItem('颜色转换', '/admin/tool/color'),
    getItem('进制转化', '/admin/tool/hex'),
    getItem('书签管理', '/admin/tool/bm', null, [getItem('技术文章', '/admin/tool/bm/tt'), getItem('杂文随笔', '/admin/tool/bm/sb')]),
  ]),
];
 
const Portal = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()
  let [selectPath, setSelectPath] = useState(location.pathname)

  const onMenuSelect = ({ selectedKeys, key }) => {
    const selectKey = selectedKeys && selectedKeys.length ? selectedKeys[0] : key
    setSelectPath(selectKey)
    navigate(selectKey)
  }

  const initPath = () => {
  }

  useEffect(() => {
    initPath()
  }, []);
  return (
    <Layout id="components-layout-demo-custom-trigger" style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          className="menu"
          defaultSelectedKeys={[selectPath]}
          defaultOpenKeys={['']}
          mode="inline"
          theme="dark"
          items={items}
          onSelect={onMenuSelect}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <RouterBeforeEach/>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Portal