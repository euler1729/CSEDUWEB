import  { useState, useEffect } from 'react';
import { Table, Spin, message, Card } from 'antd';
import useAxiosPrivate from '../hook/useAxiosPrivate';

const ContactMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axios = useAxiosPrivate()
  useEffect(() => {
    axios.get('/message/all') 
      .then(response => {
        if (response.data.code === 200) {
          setMessages(response.data.data);
        } else {
          setError(response.data.message);
          message.error(response.data.message);
        }
      })
      .catch(error => {
        setError(error.message);
        message.error(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md text-center">
          <p>{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-4">
      <p className=' text-center py-4 text-2xl'>User Message form Contact Page</p>
      <Card className="w-full mb-4">
        <Table
          dataSource={messages}
          columns={columns}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default ContactMessage;
