import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Login() {
  const navigate = useNavigate(); // Khai báo useNavigate

  const onFinish = (values) => {
    const { username, password } = values;
    axios
      .post("http://localhost:3000/validatePassword", { username, password })
      .then((res) => {
        if (res.data.validation) {
          // Thực hiện chuyển hướng

          // Store the userId in local storage
          localStorage.setItem("userId", res.data.userId);
          navigate("/User"); // Chuyển hướng đến trang Dictionary
        } else {
          alert("Your Information is not correct!");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        // Xử lý lỗi nếu cần

        // Adding a console log to display the error message
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
}
