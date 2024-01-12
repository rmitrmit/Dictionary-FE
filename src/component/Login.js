import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password } = values;
    axios
      .post("http://localhost:3000/validatePassword", { username, password })
      .then((res) => {
        if (res.data.validation) {
          // Thực hiện chuyển hướng và lưu userId vào localStorage
          localStorage.setItem("userId", res.data.userId);
          // lưu username vào localStorage
          localStorage.setItem("username", username);
          navigate("/User"); // Chuyển hướng đến trang User
        } else {
          alert("Your Information is not correct!");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        // Xử lý lỗi nếu cần
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "400" }}>
        <Button
          type="primary"
          style={{ backgroundColor: "red", right: "20px" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </Button>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/forgot-password">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="/Signup">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
