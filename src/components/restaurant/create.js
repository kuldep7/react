import React,{useState} from 'react';
import { Form, Input, InputNumber, Button, Col,Row } from 'antd';
import {connect} from 'react-redux'
import {updateRestaurant} from '../../redux/actions/restaurant-action'
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
    let key = props.restaurant.length + 1
    values.restaurant.key = key
    let object = new Array (values.restaurant)
    let a = [...props.restaurant, ...object]
    const data = await props.onUpdateRestaurant(a)
    setRedirect(true)
  };
  if (redirect) {
    return <Redirect to='/restaurantList'/>;
  }
  return (

    <Form {...layout} style={{marginTop:'10%',minHeight:'100vh'}} name="restaurantForm" layout="horizontal" onFinish={onFinish} validateMessages={validateMessages}>
    <Row>
    <Col span={12}>
    <Form.Item
    name={['restaurant', 'branchCode']}
    label="Branch Code"
    rules={[{required: true,},]}
    >
    <Input />
    </Form.Item>
    </Col>
    <Col span={12}>
    <Form.Item
    name={['restaurant', 'branch']}
    label="Branch"
    rules={[{required: true,},]}
    >
    <Input />
    </Form.Item>
    </Col>
    <Col span={12}>
    <Form.Item
    name={['restaurant', 'manager']}
    label="Manager Name"
    rules={[{required: true,},]}
    >
    <Input />
    </Form.Item>
    </Col>
    <Col span={12}>
    <Form.Item  name={['restaurant', 'contact']} label="Contact Number" rules={[{type: 'number',required:true,min: 111111,max: 9999999999,}]}>
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
  restaurant:state.restaurant,
})
const mapActionToProps = {
  onUpdateRestaurant:updateRestaurant
}
export default connect(mapStateToProps,mapActionToProps)(Create)