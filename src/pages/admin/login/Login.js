import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss'
import { login } from '../../../services/login'

function AdminLogin() {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    forceUpdate({});
  }, []);
  const onFinish = (values) => {
    if (values && values.username && values.password) {
      login({
        username: values.username,
        password: values.password
      }).then(res => {
        if (res && res.data && res.data.code === 200) {
          message.success('登录成功，即将调整');
          sessionStorage.setItem('login', res.data.token)
          setTimeout(() => {
            navigate('/admin/home', { replace: true })
          }, 1500)
        } else {
          message.error('登录失败');
        }
      }).catch(err => {
        message.error('登录失败');
      })
    } else {
      message.error('登录失败');
    }
  };
  return (
    <div className="adming-login">
      <Form className="login-bottom" form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input size="small" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input
            size="small"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              size="small"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              登录
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}
export default AdminLogin