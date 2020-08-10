import React, { useState } from 'react';
import { Table,List, Input,Drawer, InputNumber, Popconfirm, Form, Button, Tooltip } from 'antd';
import {connect} from 'react-redux'
import {updateRestaurant} from '../../redux/actions/restaurant-action'
import {updateMenu} from '../../redux/actions/menu-action'
import MenuEdit from '../menu/index'
import { QuestionCircleOutlined,DeleteOutlined,EditOutlined,SaveOutlined,CloseOutlined } from '@ant-design/icons';
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
  const [data, setData] = useState(props.restaurant);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [menuEditingKey, setMenuEditingKey] = useState('');
  const [menus, setMenus] = useState([]);

  const isEditing = record => record.key === editingKey;
  const edit = record => {
    form.setFieldsValue({
      branchCode: '',
      branch: '',
      manager: '',
      contact: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const showDrawer = async(record) => {
    let menus = props.menu.filter((item) =>{
      return item.restaurant_key == record.key
    })
    setMenus(menus)
    setVisible(true)
  };
  const editMenu = (record) => {
    setMenuEditingKey(record)
    setVisibleEdit(true)
  }
  const onClose = () => {
    setVisible(false)
  };
  const onCloseEdit = () => {
    setVisibleEdit(false)
    setVisible(false)
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
        const confirm = await props.onUpdateRestaurant(newData)
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
      const newData = [...data];
      const confirm = await props.onUpdateRestaurant(newData)

      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
  {
    title: 'Branch Code',
    dataIndex: 'branchCode',
    width: '25%',
    editable: true,
  },
  {
    title: 'Branch',
    dataIndex: 'branch',
    width: '15%',
    editable: true,
    render: (_, record) => <a onClick={() => showDrawer(record)}>{record.branch}</a>,
  },
  {
    title: 'Manager Name',
    dataIndex: 'manager',
    width: '40%',
    editable: true,
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
    width: '40%',
    editable: true,
  },
  {
    title: 'Action',
    dataIndex: 'operation',
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span style={{display:'flex', justifyContent : 'space-between'}}>
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
        <span style={{display:'flex', justifyContent : 'space-between'}}>
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
    }];
    const mergedColumns = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'contact' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
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
      <Drawer
      title="Menu"
      width={520}
      placement="left"
      closable={true}
      onClose={onClose}
      visible={visible}
      key="left"
      >
      <List
      bordered
      dataSource={menus}
      renderItem={item => <List.Item  actions={[<Tooltip title="Edit" color="cyan">
      <Button style={{marginRight:'5px'}} type="primary" disabled={editingKey !== ''} onClick={() => editMenu(item)} shape="circle" icon={<EditOutlined />} />
      </Tooltip>]}>{item.name}</List.Item>}
      />
      </Drawer>
      <Drawer
      title="Edit Menu"
      width={'50%'}
      placement="right"
      closable={true}
      onClose={onCloseEdit}
      visible={visibleEdit}
      key="right"
      >
      <MenuEdit edit = {{row:menuEditingKey,menu:menus}}/>
      </Drawer>
      </Form>
      );
  };
  const mapStateToProps = state => ({
    restaurant:state.restaurant,
    menu:state.menu
  })
  const mapActionToProps = {
    onUpdateRestaurant:updateRestaurant,
    onUpdateMenu:updateMenu
  }
  export default connect(mapStateToProps,mapActionToProps)(EditableTable)