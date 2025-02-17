import { useNotContext } from "../hooks/useNotContext";
import moment from "moment";
import "moment/locale/tr";
import { useAuthContext } from "../hooks/useAuthContext";
import { Card, Button, Typography, Popconfirm } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function NotDetay({ not }) {
  const { dispatch } = useNotContext();
  const { kullanici } = useAuthContext();

  const handleClick = async () => {
    const response = await fetch("/api/notlar/" + not._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${kullanici.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {

      dispatch({ type: "NOT_SIL", payload: json });
    }
  };

  return (
    <Card
      style={{
        width: "100%",
        marginBottom: "16px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      }}
      actions={[
        <Popconfirm
          title="Bu notu silmek istediğinizden emin misiniz?"
          onConfirm={handleClick}
          okText="Evet"
          cancelText="Hayır"
        >
          <Button
            type="link"
            icon={<DeleteOutlined />}
            style={{ color: '#E60012' }} // Kırmızı renk
          >
            Sil
          </Button>
        </Popconfirm>,
      ]}
    >
      <Title level={4}>{not.baslik}</Title>
      <Paragraph>{not.aciklama}</Paragraph>
      <Paragraph type="secondary">
        {moment(new Date(not.createdAt)).fromNow()}
      </Paragraph>
    </Card>
  );
}
