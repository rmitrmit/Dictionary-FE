import React from "react";
import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, password } = values;

    // Kiểm tra định dạng của username
    const usernameRegex = /^[a-zA-Z0-9]{8,15}$/;
    if (!usernameRegex.test(username)) {
      return alert("Invalid username format");
    }

    // Kiểm tra định dạng của password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    if (!passwordRegex.test(password)) {
      return alert("Invalid password format");
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("userId", res.data.userId);
        alert("Signup successful! You will now be redirected to the login page.");
        navigate("/login"); // Chuyển hướng đến trang đăng nhập
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "400px" }}>
        <Button
          type="primary"
          style={{ backgroundColor: "red", right: "20px" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </Button>

        <h1 style={{ textAlign: "center" }}>SignUp</h1>

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

          <Alert
            message="Conditions for Username:"
            description="Username should contain only letters (lower and upper case) and digits, and have a length from 8 to 15 characters."
            type="info"
            showIcon
            style={{ marginBottom: "8px", fontSize: "10px", padding: "8px", borderRadius: "4px" }}
          />

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

          <Alert
            message="Conditions for Password:"
            description="Password should contain at least one upper case letter, at least one lower case letter, at least one digit, at least one special letter in the set !@#$%^&*, and have a length from 8 to 20 characters."
            type="info"
            showIcon
            style={{ marginBottom: "8px", fontSize: "10px", padding: "8px", borderRadius: "4px" }}
          />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Signup
            </Button>
            Or <a href="/login">Login now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
