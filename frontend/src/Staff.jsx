import  { useEffect, useState } from 'react';
import { Card, Spin, } from 'antd';
import useAxiosPrivate from './hook/useAxiosPrivate';

const Staff = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('/staff/all'); 
        if (response.data.code === 200) {
          setTeachers(response.data.data);
        //   message.success(response.data.message);
        } else {
        //   message.error("Failed to retrieve teachers data");
        }
      } catch (error) {
        // message.error("An error occurred while fetching data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [axios]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center my-4 py-2 bg-gray-100">
      {teachers.map((teacher) => (
        <Card
          key={teacher.id}
          className="m-4 w-full h-full max-w-sm rounded-lg shadow-lg"
          cover={<img alt={teacher.user.first_name} src={teacher.photo} className="object-cover h-85 w-40" />}
        >
          <Card.Meta
            title={`${teacher.user.first_name} ${teacher.user.last_name}`}
            description={
              <div>
                <p><strong>Current Status:</strong> {teacher.current_status}</p>
                <p><strong>Designation:</strong> {teacher.designation}</p>
              </div>
            }
          />
          <button className="text-right px-4 py-2 mt-10 rounded-lg bg-[#14264c] text-white">Details</button>
        </Card>
      ))}
    </div>
  );
};

export default Staff;
