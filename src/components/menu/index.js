import React, { useState,useEffect } from 'react';
import { Table, Input,Select, InputNumber, Popconfirm, Form, Button, Tooltip } from 'antd';
import {connect} from 'react-redux'
import {updateMenu} from '../../redux/actions/menu-action'
import { QuestionCircleOutlined,DeleteOutlined,EditOutlined,SaveOutlined,CloseOutlined } from '@ant-design/icons';
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  pro,
  ...restProps
}) => {
  const inputNode = inputType === 'select' ? <Select>{pro.restaurant.map(item => (
    <Select.Option key={item.key} value={item.key}>
    {item.branch}
    </Select.Option>
    ))}</Select> :inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
    {editing ? (
      <Form.Item
      name={dataIndex}
      style={{
        margin: 0,
      }}
      rules={[
        {
          required: true,
          message: `Please Input ${title}!`,
        },
        ]}
        >
        {inputNode}
        </Form.Item>
        ) : (
        children
        )}
        </td>
        );
};

const EditableTable = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(props.menu);
  const [editingKey, setEditingKey] = useState('');
  useEffect(() =>{
    if(props.edit){
      edit(props.edit.row)
      isEditing(props.edit.row)
      setData(props.edit.menu)
    }
  },[props.edit?props.edit.row:props.edit]);
  const isEditing = record => record.key === editingKey;
  const edit = record => {
    form.setFieldsValue({
      name: '',
      price: '',
      restaurant_key: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const remove = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];

      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        let a = newData.splice(index, 1);
        const confirm = await props.onUpdateMenu(newData)
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }
  const save = async key => {
    try {
      const row = await form.validateFields();
      let newData = [];
      if(props.edit){
        newData = [...props.menu]
      }else{
       newData = [...data];
     }

     const index = newData.findIndex(item => key === item.key);
     if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      const confirm = await props.onUpdateMenu(newData)
      if(props.edit){
        const iter = confirm.payload.menu.filter((item) =>{
         return  item.restaurant_key === props.edit.row.restaurant_key
       })
        setData(iter)
      }else{
        setData(newData);
      }
      setEditingKey('');
    }
  } catch (errInfo) {
    console.log('Validate Failed:', errInfo);
  }
};

const columns = [
{
  title: 'Name',
  dataIndex: 'name',
  width: '25%',
  editable: true,
},
{
  title: 'Branch',
  dataIndex: 'restaurant_key',
  width: '25%',
  editable: true,
},
{
  title: 'Price',
  dataIndex: 'price',
  width: '40%',
  editable: true,
},
{
  title: 'Action',
  dataIndex: 'operation',
  render: (_, record) => {
    const editable = isEditing(record);
    return editable ? (
      <span style={{display:'flex', justifyContent : 'center'}}>
      <a
      onClick={() => save(record.key)}
      style={{
        marginRight: 8,
      }}
      >
      <Tooltip title="Save" color="cyan">
      <Button type="primary" onClick={() => save(record.key)} style={{marginRight: 8}} shape="circle" icon={<SaveOutlined/>} />
      </Tooltip>
      </a>
      <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
      <Tooltip color="red">
      <Button danger shape="circle" icon={<CloseOutlined/>} />
      </Tooltip>
      </Popconfirm>
      </span>
      ) : (
      <span style={{display:'flex', justifyContent : 'center'}}>
      <Tooltip title="Edit" color="cyan">
      <Button style={{marginRight:'5px'}} type="primary" disabled={editingKey !== ''} onClick={() => edit(record)} shape="circle" icon={<EditOutlined />} />
      </Tooltip>
      <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined/>} style={{ color: 'red' }} onConfirm={() => remove(record.key)}>
      <Tooltip title="Delete" color="red">
      <Button danger shape="circle" disabled={editingKey !== ''} icon={<DeleteOutlined />} />
      </Tooltip>
      </Popconfirm>
      </span>
      );
    },
  },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'restaurant_key' ?'select':col.dataIndex === 'price' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        pro:props,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
    <Table
    components={{
      body: {
        cell: EditableCell,
      },
    }}
    bordered
    dataSource={data}
    columns={mergedColumns}
    rowClassName="editable-row"
    pagination={{
      onChange: cancel,
    }}
    />
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
export default connect(mapStateToProps,mapActionToProps)(EditableTable)