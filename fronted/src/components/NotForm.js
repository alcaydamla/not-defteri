import { useState } from 'react';
import { useNotContext } from '../hooks/useNotContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Form, Input, Button, Alert } from 'antd';

export default function NotForm() {
    const [baslik, setBaslik] = useState('');
    const [aciklama, setAciklama] = useState('');
    const [hata, setHata] = useState(null);
    const [bosAlanlar, setBosalanlar] = useState([]);

    const { dispatch } = useNotContext();
    const { kullanici } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!kullanici) {
            setHata('Giriş yapmalısınız');
            return;
        }

        const not = { baslik, aciklama };
        console.log("Gönderilen Token:", kullanici?.token);

        const response = await fetch('/api/notlar', {
            method: 'POST',
            body: JSON.stringify(not),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${kullanici.token}`,
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setHata(json.hata);
            setBosalanlar(json.bosAlanlar);
        }

        if (response.ok) {
            setHata(null);
            setBaslik('');
            setAciklama('');
            setBosalanlar([]);
            dispatch({ type: 'NOT_OLUSTUR', payload: json });
        }
    };

    return (
        <Form onSubmitCapture={handleSubmit} layout="vertical" className="create">
            <Form.Item
                label="Not Başlık"
                validateStatus={bosAlanlar.includes('baslik') ? 'error' : ''}
                help={bosAlanlar.includes('baslik') ? 'Başlık gereklidir' : ''}
            >
                <Input
                    type="text"
                    onChange={(e) => setBaslik(e.target.value)}
                    value={baslik}
                    placeholder="Başlık girin"
                />
            </Form.Item>

            <Form.Item
                label="Not Açıklama"
                validateStatus={bosAlanlar.includes('aciklama') ? 'error' : ''}
                help={bosAlanlar.includes('aciklama') ? 'Açıklama gereklidir' : ''}
            >
                <Input.TextArea
                    onChange={(e) => setAciklama(e.target.value)}
                    value={aciklama}
                    placeholder="Açıklama girin"
                />
            </Form.Item>

            <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                block
                style={{ backgroundColor: '#E60012', borderColor: '#E60012' }}
            >Ekle
            </Button>
            </Form.Item>

            {hata && <Alert message={hata} type="error" showIcon />}
        </Form>
    );
}
