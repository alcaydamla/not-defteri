import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Form, Input, Button, Typography, Card } from "antd";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");

  const { signup, yukleniyor, hata } = useSignup();

  const handleSubmit = async () => {
    await signup(email, parola);
  };

  return (
    <Card
      style={{ maxWidth: 400, margin: "auto", marginTop: "50px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <Typography.Title level={3} style={{ textAlign: "center", color: "#555" }}>
        Üye Ol
      </Typography.Title>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email gerekli!" }]}>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item label="Parola" name="password" rules={[{ required: true, message: "Parola gerekli!" }]}>
          <Input.Password value={parola} onChange={(e) => setParola(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={yukleniyor}>
            Üye Ol
          </Button>
        </Form.Item>
      </Form>

      {hata && <Typography.Text type="danger">{hata}</Typography.Text>}
    </Card>
  );
}
