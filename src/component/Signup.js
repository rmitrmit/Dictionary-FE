import React from "react";
import { Form, Input, Button} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from 'axios';

export default function Signup() {
  const onFinish = async (values) => {
    const { username, password } = values;
    try {
      const res = await axios.post('http://localhost:3000/Signup', { username, password });
      if (res.data.success) {
        localStorage.setItem('userId', res.data.userId);
        alert("Signup successful! You can now log in.");
        // Redirect to login page or perform any other actions after successful signup
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error appropriately
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: '400' }}>
        <h1 style={{ textAlign: 'center' }}>
          SignUp
        </h1>
        <Form
          name="normal_signup"
          className="signup-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Signup
          </Button>
           Or <a href="/Login">Login now!</a>
        </Form.Item>
        </Form>
      </div>
    </div>
  );
}
