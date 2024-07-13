import { useState, useEffect } from 'react';
import { Table, Input, Select, Card, Spin, Button, message, Modal } from 'antd';
import useGetAllPublications from '../hook/Publications/useGetAllPublications';
import { Form } from 'antd';
import useGetAllTeachers from '../hook/user/useGetAllTeacher';

const { Option } = Select;

const publicationTypes = [
  { value: 'journal', label: 'Journal' },
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'book', label: 'Book' }
];

const PublicationsTable = () => {
  const [authors,] = useGetAllTeachers();
  const [publications, setPublications, loading] = useGetAllPublications();
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);

  useEffect(() => {
    setFilteredPublications(publications);
  }, [publications]);

  const handleSearch = (value) => {
    setSearchText(value);
    filterPublications(value, selectedType);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    filterPublications(searchText, value);
  };

  const filterPublications = (search, type) => {
    let filtered = publications;

    if (search) {
      filtered = filtered.filter(pub => pub.paper_name.toLowerCase().includes(search.toLowerCase()));
    }

    if (type) {
      filtered = filtered.filter(pub => pub.publication_type === type);
    }

    setFilteredPublications(filtered);
  };

  const handleUpdate = (record) => {
    setSelectedPublication(record);
    setModalVisible(true);
  };

  const handleDelete = (record) => {
    // Handle delete logic here
    message.success(`Delete clicked for ${record.paper_name}`);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleFinish = (values) => {
    // Handle form submission here
    console.log('Form values:', values);
    setModalVisible(false);
    message.success('Publication updated successfully!');
  };

  const columns = [
    {
      title: 'Publication Type',
      dataIndex: 'publication_type',
      key: 'publication_type',
    },
    {
      title: 'Paper Name',
      dataIndex: 'paper_name',
      key: 'paper_name',
    },
    {
      title: 'Authors',
      dataIndex: 'authors',
      key: 'authors',
      render: authors => authors.join(', '),
    },
    {
      title: 'Other Authors',
      dataIndex: 'other_authors',
      key: 'other_authors',
    },
    {
      title: 'Publication Year',
      dataIndex: 'publication_year',
      key: 'publication_year',
      sorter: (a, b) => a.publication_year - b.publication_year,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button
            type="link"
            onClick={() => handleUpdate(record)}
          >
            Update
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="items-center bg-gray-100 p-4">
      <Card className="w-full h-[80vh]  mb-4">
        <div className="flex justify-between mb-4">
          <Input.Search
            placeholder="Search by paper name"
            onSearch={handleSearch}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            className="w-1/3"
          />
          <Select
            placeholder="Select publication type"
            value={selectedType}
            onChange={handleTypeChange}
            className="w-1/3"
          >
            <Option value="">All</Option>
            {publicationTypes.map(type => (
              <Option key={type.value} value={type.value}>{type.label}</Option>
            ))}
          </Select>
        </div>
        <Table
          dataSource={filteredPublications}
          columns={columns}
          rowKey="id"
        />
      </Card>

      <Modal
        title="Update Publication"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Card className="w-full max-w-md rounded-lg shadow-lg">
          <Form
            name="publicationForm"
            initialValues={selectedPublication}
            onFinish={handleFinish}
            layout="vertical"
          >
            <Form.Item
              label="Publication Type"
              name="publication_type"
              rules={[{ required: true, message: 'Please select a publication type!' }]}
            >
              <Select placeholder="Select a publication type">
                {publicationTypes.map(type => (
                  <Option key={type.value} value={type.value}>{type.label}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Publication Name"
              name="paper_name"
              rules={[{ required: true, message: 'Please input the Publication name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Authors"
              name="authors"
              rules={[{ required: true, message: 'Please select authors!' }]}
            >
              <Select
                mode="multiple"
                placeholder="Select authors"
              >
                {authors.map(author => (
                  <Option key={author.id} value={`${author.first_name} ${author.last_name}`}>
                    {`${author.first_name} ${author.last_name}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Other Authors"
              name="other_authors"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Publication Year"
              name="publication_year"
              rules={[{ required: true, message: 'Please input the publication year!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item className="text-center pt-8">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default PublicationsTable;
