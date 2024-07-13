import  { useEffect, useState } from 'react';
import { Card, List, Spin, message } from 'antd';
import { MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from './hook/useAxiosPrivate';

const FacultyDeatails = () => {
  const [teacher, setTeacher] = useState(null);
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`/teacher/${id}`); 
        if (response.data.code === 200) {
          setTeacher(response.data.data);
        } else {
          console.log.error("Failed to retrieve teacher data");
        }
      } catch (error) {
        message.error("An error occurred while fetching data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [axios]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>No teacher data available</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center my-4 py-2 bg-gray-100">
      <Card className="w-full max-w-4xl rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center">
          <img alt={teacher.user.first_name} src={teacher.photo} className="w-48 h-48 object-cover rounded-full mb-4" />
          <h2 className="text-2xl font-bold mb-2">{teacher.user.first_name} {teacher.user.last_name}</h2>
          <p className="text-lg font-semibold mb-1">{teacher.designation}</p>
          <p className="text-gray-600 mb-4">{teacher.current_status}</p>
          <div className="flex flex-col items-start w-full px-8 mb-4">
            <p className="text-left mb-1"><MailOutlined className="mr-2" /> {teacher.user.email}</p>
            <p className="text-left mb-1"><PhoneOutlined className="mr-2" /> {teacher.user.contact}</p>
            <p className="text-left mb-1"><HomeOutlined className="mr-2" /> {teacher.user.address}, {teacher.user.city}, {teacher.user.state}</p>
          </div>
        </div>
        <div className="px-8">
          <h3 className="text-xl font-bold mb-2">About</h3>
          <p className="text-justify mb-4">{teacher.about}</p>
          <h3 className="text-xl font-bold mb-2">Research Publications</h3>
          <List
            dataSource={teacher.research}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={item.paper_name}
                  description={`Publication Type: ${item.publication_type} | Authors: ${item.authors.join(', ')} | Year: ${item.publication_year}`}
                />
              </List.Item>
            )}
          />
        </div>
      </Card>
    </div>
  );
};

export default FacultyDeatails;
