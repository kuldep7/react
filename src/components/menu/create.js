import React,{useState} from 'react';
import { Form, Input,Select, InputNumber, Button, Col,Row } from 'antd';
import {connect} from 'react-redux'
import {updateMenu} from '../../redux/actions/menu-action'
import {Redirect} from "react-router-dom";
const layout = {
  labelCol: {
    span: 8,

  },
  labelAlign:'left',
  wrapperCol: {
    span: 16,
  }
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const Create =  (props) => {
  const [redirect,setRedirect] = useState(false)
  const onFinish = async values => {
    let key = props.menu.length + 1
    values.menu.key = key
    let object = new Array (values.menu)
    let a = [...props.menu, ...object]
    const data = await props.onUpdateMenu(a)
    setRedirect(true)
  };
  if (redirect) {
    return <Redirect to='/menuList'/>;
  }
  return (
    <Form {...layout} style={{marginTop:'10%',minHeight:'100vh'}} name="menuForm" layout="horizontal" onFinish={onFinish} validateMessages={validateMessages}>
    <Row>
    <Col span={12}>
    <Form.Item
    name={['menu', 'restaurant_key']}
    label="Restaurant"
    rules={[{required: true,},]}
    >
    <Select>
    {props.restaurant.map(item => (
      <Select.Option key={item.key} value={item.key}>
      {item.branch}
      </Select.Option>
      ))}
    </Select>
    </Form.Item>
    </Col>
    </Row>
    <Row>
    <Col span={12}>
    <Form.Item
    name={['menu', 'name']}
    label="Name"
    rules={[{required: true,},]}
    >
    <Input />
    </Form.Item>
    </Col>
    <Col span={12}>
    <Form.Item  name={['menu', 'price']} label="Price" rules={[{type: 'number',required:true,min: 1,max: 99999,}]}>
    <InputNumber style={{width:'100%'}} />
    </Form.Item>
    </Col>
    </Row>

    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
    <Button type="primary" htmlType="submit">
    Submit
    </Button>
    </Form.Item>
    </Form>
    );
};
const mapStateToProps = state => ({
  menu:state.menu,
  restaurant:state.restaurant
})
const mapActionToProps = {
  onUpdateMenu:updateMenu
}
export default connect(mapStateToProps,mapActionToProps)(Create)