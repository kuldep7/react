import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';

import {BrowserRouter as Router,  Switch,  Route,  Link} from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UploadOutlined,
  ShopOutlined
} from '@ant-design/icons';

import {connect} from 'react-redux'
import Home from './Home';
import RestaurantList from './components/restaurant/index'
import RestaurantCreate from './components/restaurant/create'
import MenuList from './components/menu/index'
import MenuCreate from './components/menu/create'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router>
      <Layout style={{minHeight:'100vh'}}>
      <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme="light">
      <div className="logo">
      <span><Link to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/7/74/Dominos_pizza_logo.svg" style={{height:"-webkit-fill-available"}}/></Link></span>
      <span style={{fontWeight:'bold',textTransform : 'uppercase'}}>Dominos</span>
      </div>
      <Menu theme="light" mode="inline"  defaultSelectedKeys={['home']}>
      <Menu.Item key="home" icon={<HomeOutlined />}><Link to="/"> Home</Link></Menu.Item>
      <SubMenu key="restaurant" icon={<ShopOutlined />} title="Restaurants">
      <Menu.Item key="1"><Link to="/restaurantCreate">Create</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/restaurantList"> List</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="menu" icon={<UnorderedListOutlined />} title="Menu">
      <Menu.Item key="3"><Link to="/menuCreate"> Create</Link></Menu.Item>
      <Menu.Item key="4"><Link to="/menuList"> List</Link></Menu.Item>
      </SubMenu>
      </Menu>
      </Sider>
      <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: this.toggle,
      })}
      </Header>

      <Content
      className="site-layout-background"
      style={{
        margin: '5px 16px',
        padding: 24,
        minHeight: 280,
      }}
      >
      <Switch>
      <Route path="/restaurantList">
      <Breadcrumb style={{ margin: '16px 20px' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Restaurants</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <RestaurantList/>
      </Route>
      <Route path="/restaurantCreate">
      <Breadcrumb style={{ margin: '16px 20px' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Restaurants</Breadcrumb.Item>
      <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <RestaurantCreate/>
      </Route>
      <Route path="/menuList">
      <Breadcrumb style={{ margin: '16px 20px' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Menu</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <MenuList/>
      </Route>
      <Route path="/menuCreate">
      <Breadcrumb style={{ margin: '16px 20px' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Menu</Breadcrumb.Item>
      <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <MenuCreate/>
      </Route>
      <Route path="/">
      <Home />
      </Route>
      </Switch>
      </Content>
      </Layout>
      </Layout>
      </Router>
      );
  }
}
const mapStateToProps = state => ({
  restaurant:state.restaurant,
  menu:state.menu
})
const mapActionToProps = {}

export default connect(mapStateToProps,mapActionToProps)(App);