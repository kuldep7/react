import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu,Divider, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'
import {connect} from 'react-redux'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const  Home = (props) =>{
    const [data,setData] = useState([])
    useEffect(() =>{
        let chart=[]
        props.restaurant.forEach((rest) =>{
            let menuCount = props.menu.filter((item) =>{
              return item.restaurant_key == rest.key
          })
            chart.push(new Array(rest.branchCode +" "+rest.branch,menuCount.length))
        });
        setData(chart)
    },[props.menu,props.restaurant]);
    return(
        <>
        <div style={{textAlign : 'center',fontSize : 'xx-large'}}><h1>Restaurants</h1></div>
        <Divider />
        <PieChart data={data} donut={true} />
        </>
        )
}
const mapStateToProps = state => ({
  menu:state.menu,
  restaurant:state.restaurant
})
export default connect(mapStateToProps)(Home)